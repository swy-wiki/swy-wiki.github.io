function calcVal2(state, extra) {
  var Lv = $Level;
  val = eval(state) + extra + 0.0001;
  val /= 10;
  return val.toFixed(1).replace('.0', '') + "%";
}

function calcVal1(state, extra) {
  var Lv = $Level;
  val = eval(state) + extra + 0.00001;
  return val.toFixed(0);
}

function calc(sh) {
  $Name = sh["name"];
  exRanks = sh["star" + $Rank];
  $Hp = (calcVal1(sh["hp"], exRanks["hp"]));
  $Atk = (calcVal1(sh["atk"], exRanks["atk"]));
  $Def = (calcVal1(sh["def"], exRanks["def"]));
  $Critic = (calcVal2(sh["critic"], exRanks["critic"]));
  $CriticDmg = (calcVal2(sh["critic_dmg"], exRanks["critic_dmg"]));
  $Dodge = (calcVal2(sh["dodge"], exRanks["dodge"]));
  $EffectHit = (calcVal2(sh["effect_hit"], exRanks["effect_hit"]));
  $EffectResist = (calcVal2(sh["effect_resist"], exRanks["effect_resist"]));
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
var $EffectHit;
var $EffectResist;

// Custom
$('#btnCalc').click(function() {
  // Get name
  $Qty = $("#Qty")[0].value;
  if (!$data[$Qty]) {
    bsWindow.alert('膳具名称错误或未收录', '错误', function() {
      console.log('Alert window closed.');
    });
    return;
  }
  // Get Level
  $Level = Number($("#Level")[0].value);
  if (!$Level || $Level > 50 || $Level < 1) {
    bsWindow.alert('膳具等级错误，请填写1-50的整数', '错误', function() {
      console.log('Alert window closed.');
    });
    return;
  }
  $Rank = parseInt($Level / 10) + 1;
  if ($Level % 10 == 0 && !$("#Starred").prop("checked")) {
    $Rank -= 1;
  }
  if ($Level == 50) $Rank = 5;
  sh = $data[$Qty];
  calc(sh);

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
      generatePara("膳具名称", $Name) +
      generatePara("生命", $Hp) +
      generatePara("攻击", $Atk) +
      generatePara("防御", $Def) +
      generatePara("闪避", $Dodge) +
      generatePara("暴击", $Critic) +
      generatePara("爆伤", $CriticDmg) +
      generatePara("效果命中", $EffectHit) +
      generatePara("效果抵抗", $EffectResist) +
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
