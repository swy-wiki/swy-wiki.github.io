function calcVal2(bonus, base, exRank) {
  val = bonus / 1000 * base + exRank / 10 + 0.0001;
  return val.toFixed(1).replace('.0', '') + "%";
}

function getCoe(rare, isHp) {
  k = 50;
  if (rare > 2) {
    k = rare * 5 + 37.5;
  }
  if (!isHp) k /= 10;
  return k;
}

function calcVal1(sh, bonus, isHp, exRank) {
  val = (bonus / 1000) * ($Level + 20) * getCoe(sh["rare"], isHp) + exRank + 0.00001;
  return parseInt(val);
  //return val;
}

function calc(sh) {
  $Name = sh["name"];
  exRanks = sh["rank" + $Rank];
  $Hp = calcVal1(sh, sh["hp_bonus"], true, exRanks["hp"]);
  $Atk = (calcVal1(sh, sh["atk_bonus"], false, exRanks["atk"]));
  $Def = (calcVal1(sh, sh["def_bonus"], false, exRanks["def"]));
  $Critic = (calcVal2(sh["critic_bonus"], 10, exRanks["critic"]));
  $CriticDmg = (calcVal2(sh["critic_dmg_bonus"], 50, exRanks["critic_dmg"]));
  $Dodge = (calcVal2(sh["dodge_bonus"], 5, exRanks["dodge"]));
}

var $Qty;
var $Level;
var $Rank;
var $Hp;
var $Atk;
var $Def;
var $Critic;
var $CriticDmg;
var $Dodge;

// Custom
$('#btnCalc').click(function() {
  // Get name
  $Qty = $("#Qty")[0].value;
  if (!$data[$Qty]) {
    bsWindow.alert('食魂姓名错误或未收录', '错误', function() {
      console.log('Alert window closed.');
    });
    return;
  }
  // Get Level
  $Level = Number($("#Level")[0].value);
  if (!$Level || $Level > 100 || $Level < 1) {
    bsWindow.alert('食魂等级错误，请填写1-100的整数', '错误', function() {
      console.log('Alert window closed.');
    });
    return;
  }
  $Rank = parseInt($Level / 20) + 1;
  if ($Level % 20 == 0 && !$("#Starred").prop("checked")) {
    $Rank -= 1;
  }
  if ($Level == 100) $Rank = 5;
  sh = $data[$Qty];
  calc(sh);

  function generateParagraphs(num) {
    var res = '';
    for (var i = 0; i < num; i++) {
      res += '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';
    }
    return res;
  }

  function generatePara(label, value) {
    var html = `
    <div class="form-group">
      <div class="row">
        <div class="col-sm-6">
          <label class="control-label">${label}:&nbsp;${value}</label>
        </div>
      </div>
    </div>
`;
    return html;
  }

  bsWindow.show({
    title: '计算结果',
    message: "<div>" +
      generatePara("食魂姓名", $Name) +
      generatePara("生命", $Hp) +
      generatePara("攻击", $Atk) +
      generatePara("防御", $Def) +
      generatePara("闪避", $Dodge) +
      generatePara("暴击", $Critic) +
      generatePara("爆伤", $CriticDmg) +
      "</div>" +
      "<a href=\"https://diopoo.com/swy/\">点击访问食物语Wiki站</a>",
    animate: false,
    large: false,
    small: false,
    closeable: true,
    buttons: [{
      label: '关闭',
      className: 'btn-primary',
      action: function(obj) {
        obj.close();
      }
    }],
    onAppear: function() {
      console.log('Window opened.');
    },
    onDisappear: function() {
      console.log('Window closed.');
    }
  });

});
