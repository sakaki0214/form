// font (code grid -> https://app.codegrid.net/entry/2016-choosing-fonts-3)
(function () {
  var ua = window.navigator.userAgent;
  var os, version, matched;

  if (matched = ua.match(/Windows NT (\d+\.\d+)/)) {
    os = 'Windows';
    switch (matched[1]) {
      case '5.1':
      case '5.2':
        version = 'XP';
        break;
      case '6.0':
        version = 'Vista';
        break;
      case '6.1':
        version = '7';
        break;
      case '6.2':
        version = '8';
        break;
      case '6.3':
        version = '8.1';
        break;
      case '10.0':
        version = '10';
        break;
    }
  }
  else if (matched = ua.match(/Mac OS X (\d+[_.]\d+)/)) {
    os = 'Mac OS';
    version = matched[1].replace(/_/g, '.');
  }
  else if (matched = ua.match(/iPhone OS (\d_\d)/) || ua.match(/iPad; CPU OS (\d_\d)/)) {
    os = 'iOS';
    version = matched[1].replace(/_/g, '.');
  }
  else if (matched = ua.match(/Android (\d\.\d)/)) {
    os = 'Android';
    version = matched[1];
  }

  document.body.setAttribute('data-os', os + ' ' + version);
})();






$(function() {

  //smooth scroll
  $('a[href^="#"]').click(function() {
    var speed = 400; // ミリ秒
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });





  //
  //form-validation
  //
  var $textbox = $('.js-form-text');
  var errorTx1 = '入力がされていません';
  var errorTx2 = '入力内容が正しくありません';
  var $mail = $('.js-form-mail');
  var $copyMail = $('.js-form-copy-mail');
  var mailVal = $mail.val();


  //-submit


  //-テキスト入力欄がカラかどうか
  $textbox.blur(function(){
    if($(this).val().match(/.+/)){
        console.log("errorリムーブします");
        $(this).next('.error__tx').remove();
      } else {
        // console.log($(this));
        // $(this).next('.error__tx').remove();
        // $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
        if($(this).next('p').hasClass('error1')){
          console.log("errorリムーブしませんそのまま");
        } else {
          console.log("error1追加");
          $(this).next('.error__tx').remove();
          $(this).after('<p class="error__tx error1">' + errorTx1 + '</p>');
        }
      }
  });

  // 英数記号・スペース・ハイフン 全角半角変換
  $(".js-ch-change").blur(function(){
    charactersChange($(this));
    $(".js-ch-change").each(function(){
      $(this).val($(this).val().replace(/　/g,' '));
      $(this).val($(this).val().replace(/ー/g,'-'));
    });
  });

  charactersChange = function(ele){
    var val = ele.val();
    var han = val.replace(/[Ａ-Ｚａ-ｚ０-９－！"＃＄％＆'（）：；＝＜＞，．？＿［］｛｝＠＾～￥]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});

    if(val.match(/[Ａ-Ｚａ-ｚ０-９－！"＃＄％＆'（）：；＝＜＞，．？＿［］｛｝＠＾～￥]/g)){
        $(ele).val(han);
    }
  }

  // 名前（漢字）
  $('.js-name').blur(function(){
    // if($(this).val().match(/^[０-９0-9!-/:-@¥[-`{-~]+$/)) { //数字と記号が入力された場合
    if($(this).val().match(/[０-９0-9!"#$%&'()\*\+\.,\/:;<=>?@\[\\\]^_`{|}~]/g)) { //数字と記号が入力された場合
      $(this).after('<p class="error__tx error2">' + errorTx2 + '</p>');
    } else {
      return false;
    }
  });

  // 自動でカナ入力
  $.fn.autoKana('#js-name-kana', '#js-furigana', {katakana:true});

  // ふりがな（カナ）
  $('.js-name').keyup(function(){
    //名前（漢字）を全部消すと連動してカナもきえる
    //その時の判定
    if($('.js-kana').val() == ''){
      console.log('カナがから');
      $('.js-kana').next('.error__tx').remove();
    }

  })
  $('.js-kana').blur(function(){
    //半角カタカナを全角に（関数）
    var str = $(this).val();
    $(this).val(convertStr(str));

    //ひらがなをカタカナに
    hiraganaToKatagana($(this));

    // error msg
    // if($(this).val().match(/[\u3041-\u3096\u30A1-\u30F6]/g)) { //ひらがな、カタカナ、ハイフン、スペースの場合
    //   console.log("ひらがな、カタカナ、ハイフン、スペース");
    //   return false;
    // } else if($(this).val() == '') { //カラの場合
    //   console.log("kara");
    //   return false;
    // } else if($(this).val().match(/[０-９0-9!"#$%&'()\*\+\.,\/:;<=>?@\[\\\]^_`{|}~]/g)) { //数字と記号
    //   console.log('数字と記号 error2追加');
    //   $(this).after('<p class="error__tx error2">' + errorTx2 + '</p>');
    // } else { //それ以外はエラー
    //   console.log('それ以外error2追加')
    //   $(this).after('<p class="error__tx error2">' + errorTx2 + '</p>');
    // }

    if($(this).val().match(/[Ａ-Ｚａ-ｚA-Za-z０-９0-9!"#$%&'()\*\+\.,\/:;<=>?@\[\\\]^_`{|}~]/g)) { //英数と記号
      console.log('英数と記号 error2追加');
      $(this).after('<p class="error__tx error2">' + errorTx2 + '</p>');
    }
    else if($(this).val().match(/[\u3041-\u3096\u30A1-\u30F6]/g)) { //ひらがな、カタカナ、ハイフン、スペースの場合
      console.log("ひらがな、カタカナ");
    } else if($(this).val() == '') { //カラの場合
      console.log("kara");
      return false;
    }  else { //それ以外はエラー
      console.log('それ以外error2追加')
      $(this).after('<p class="error__tx error2">' + errorTx2 + '</p>');
    }


  });

  //半角カタカナを全角に（関数）
  // 変換前
  var beforeStr = new Array("ｶﾞ", "ｷﾞ", "ｸﾞ", "ｹﾞ", "ｺﾞ", "ｻﾞ", "ｼﾞ", "ｽﾞ", "ｾﾞ", "ｿﾞ", "ﾀﾞ", "ﾁﾞ", "ﾂﾞ", "ﾃﾞ", "ﾄﾞ", "ﾊﾞ", "ﾊﾟ", "ﾋﾞ", "ﾋﾟ", "ﾌﾞ", "ﾌﾟ", "ﾍﾞ", "ﾍﾟ", "ﾎﾞ", "ﾎﾟ", "ｳﾞ", "ｧ", "ｱ", "ｨ", "ｲ", "ｩ", "ｳ", "ｪ", "ｴ", "ｫ", "ｵ", "ｶ", "ｷ", "ｸ", "ｹ", "ｺ", "ｻ", "ｼ", "ｽ", "ｾ", "ｿ", "ﾀ", "ﾁ", "ｯ", "ﾂ", "ﾃ", "ﾄ", "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ", "ﾊ", "ﾋ", "ﾌ", "ﾍ", "ﾎ", "ﾏ", "ﾐ", "ﾑ", "ﾒ", "ﾓ", "ｬ", "ﾔ", "ｭ", "ﾕ", "ｮ", "ﾖ", "ﾗ", "ﾘ", "ﾙ", "ﾚ", "ﾛ", "ﾜ", "ｦ", "ﾝ", "｡", "｢", "｣", "､", "･", "ｰ", "ﾞ", "ﾟ");
  // 変換後
  var afterStr = new Array("ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "ヂ", "ヅ", "デ", "ド", "バ", "パ", "ビ", "ピ", "ブ", "プ", "ベ", "ペ", "ボ", "ポ", "ヴ", "ァ", "ア", "ィ", "イ", "ゥ", "ウ", "ェ", "エ", "ォ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ッ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "マ", "ミ", "ム", "メ", "モ", "ャ", "ヤ", "ュ", "ユ", "ョ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ン", "。", "「", "」", "、", "・", "ー", "゛", "゜");

  function convertStr(str) {
    var fullStr = str;
    for(var i = 0; i < beforeStr.length; i++) {
      fullStr = fullStr.replace(new RegExp(beforeStr[i], 'g'), afterStr[i]);
    }
    return fullStr;
  }

  //ひらがなをカタカナに（関数）
  hiraganaToKatagana = function(ele){
    var val = ele.val();
    var han = val.replace(/[\u3041-\u3096]/g,function(s){
      return String.fromCharCode(s.charCodeAt(0) + 0x60);
    });

    if(val.match(/[\u3041-\u3096]/g)){
        $(ele).val(han);
    }
  }



  //-mail
  $mail.blur(function(){
    if($(this).val().match(/.+@.+\..+/)){
      $(this).next('.error__tx').remove();
    } else {
      if($(this).next('p').hasClass('error__tx')){
        return false;
      } else {
        $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    }
  });

  //- 郵便番号
  var $pNumber1 = $('.js-automove3');
  var $pNumber2 = $('.js-automove-after');

  $pNumber1.keyup(function(){
    if($(this).val().length == 3) {
      $pNumber2.focus();
    }
  });


});