$(function(){

  //smooth scroll
  $('a[href^="#"]').click(function() {
    var speed = 400; // ミリ秒
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });

  // count
    var allCount01 = 0;
    var allCount02 = 0;
    var allCount03 = 0;
    var allCount04 = 0;
    var allCount05 = 0;
    var allCount06 = 0;
    var allCount07 = 0;
    var allCount08 = 0;
    var allCount09 = 0;
    var allCount10 = 0;
    var allCount11 = 0;
    var allCount12 = 0;
    var allCount13 = 0;
    var allCount14 = 0;
    var allCount15 = 0;

  // allCount01：名前（漢字）-----------------------------------
  $('.js-name').blur(function(){
    if($(this).val().match(/.+/)){
        $(this).next('.error__tx').remove();
        allCount01 = 1;
      } else {
        allCount01 = 0;
        if($(this).next('p').hasClass('error1')){
        } else {
          error1($(this));
        }
      }
  });

  // allCount02：名前（カナ）-----------------------------------
  $('.js-kana').blur(function(){
    //半角カタカナを全角に
    var str = $(this).val();
    $(this).val(convertStr(str));
    //ひらがなをカタカナに
    hiraganaToKatagana($(this));

    if($(this).val().match(/.+/)){
        $(this).next('.error__tx').remove();
        allCount02 = 1;
      } else {
        allCount02 = 0;
        if($(this).next('p').hasClass('error1')){
        } else {
          error1($(this));
        }
      }
  });

  // allCount03：年
  $('.js-birth1').blur(function(){
    charactersChange($(this));
    if($(this).val() == '') {
        error1($(this));
        allCount03 = 0;
      } else if($(this).val().match(/\d{4}/g)) {
        $(this).next('.error__tx').remove();
        allCount03 = 1;
      } else {
        error2($(this));
        allCount03 = 0;
      }
  });

  // allCount04：月
  $('.js-birth2').blur(function(){
    charactersChange($(this));
    if($(this).val() == '') {
        error1($(this));
        allCount04 = 0;
      } else if($(this).val().match(/\d{1,2}/g)) {
        $(this).next('.error__tx').remove();
        allCount04 = 1;
      } else {
        error2($(this));
        allCount04 = 0;
      }
  });

  // allCount05：日
  $('.js-birth3').blur(function(){
    charactersChange($(this));
    if($(this).val() == '') {
        error1($(this));
        allCount05 = 0;
      } else if($(this).val().match(/\d{1,2}/g)) {
        $(this).next('.error__tx').remove();
        allCount05 = 1;
      } else {
        error2($(this));
        allCount05 = 0;
      }
  });


  // allCount06：性別
  $('.sex input').each(function(){
    if($('.sex input:checked').length == 1) {
      $('.sex').removeClass('ng error__tx');
      allCount06 = 1;
    } else {
      allCount06 = 0;
    }
    if($(this).is(':checked')) {
      $(this).parent('label').addClass('checked');
    }
  });

  $('.sex label').click(function(){
    $('.sex').removeClass('ng error__tx');
    allCount06 = 1;

    $(this).parent().parent('.sex').each(function(){
      $('.sex label').removeClass('checked');
    });
    $(this).addClass('checked');
  });

  // allCount07： 住所1
  $('.js-address1').blur(function(){
    if($(this).val().match(/.+/)){
        $(this).next('.error__tx').remove();
        allCount07 = 1;
      } else {
        allCount07 = 0;
        if($(this).next('p').hasClass('error1')){
        } else {
          error1($(this));
        }
      }
  });

  // allCount08： 住所2
  $('.js-address2').blur(function(){
    if($(this).val().match(/.+/)){
        $(this).next('.error__tx').remove();
        allCount08 = 1;
      } else {
        allCount08 = 0;
        if($(this).next('p').hasClass('error1')){
        } else {
          error1($(this));
        }
      }
  });

  // allCount09： 住所3
  $('.js-address3').blur(function(){
    //半角カタカナを全角に
    var str = $(this).val();
    $(this).val(convertStr(str));

    if($(this).val().match(/.+/)){
        $(this).next('.error__tx').remove();
        allCount09 = 1;
      } else {
        allCount09 = 0;
        if($(this).next('p').hasClass('error1')){
        } else {
          error1($(this));
        }
      }
  });

  // allCount10: 職業
  $('.job input').each(function(){
    if($('.job input:checked').length == 1) {
      $('.job').removeClass('ng error__tx');
      allCount10 = 1;
    } else {
      allCount10 = 0;
    }
    if($(this).is(':checked')) {
      $(this).parent('label').addClass('checked');
    }
  });

  $('.job label').click(function(){
    $('.job').removeClass('ng error__tx');
    allCount10 = 1;
    $(this).parent().parent('.job').each(function(){
      $('.job label').removeClass('checked');
    });
    $(this).addClass('checked');
  });

  // allCount11: 進学希望地域
  $('.area input').each(function(){
    if ($(this).attr('checked')) {
      $(this).parent('label').addClass('checked');
      allCount11 = 1;
    }
  });
  $('.area label').click(function(){
    if ($(this).hasClass('checked')) {
      　$(this).removeClass('checked');
    } else {
      $(this).addClass('checked');
    }
  });
  $('.area input').click(function(){
    if($(this).attr('checked')) {
      $(this).parent('label').removeClass('checked');
    } else {
      $(this).parent('label').addClass('checked');
    }
  });

  var checkedCount = $('.area input:checked').length;
  if(checkedCount == 0) {
    allCount11 = 0;
  } else {
    $('.area').removeClass('ng error__tx');
    allCount11 = 1;
  }

  $('.area input').change(function(){
    checkedCount = $('.area input:checked').length;
    if(checkedCount == 0) {
      allCount11 = 0;
    } else {
      $('.area').removeClass('ng error__tx');
      allCount11 = 1;
    }
  });

  // allCount12: 電話番号1
  $('.js-tel1').blur(function(){
    charactersChange($(this));
    if($(this).val() == '') {
        error1($(this));
        allCount12 = 0;
      } else if($(this).val().match(/\d{2,5}/g)) {
        $(this).next('.error__tx').remove();
        allCount12 = 1;
      } else {
        error2($(this));
        allCount12 = 0;
      }
  });
  // allCount13: 電話番号2
  $('.js-tel2').blur(function(){
    charactersChange($(this));
    if($(this).val() == '') {
        error1($(this));
        allCount13 = 0;
      } else if($(this).val().match(/\d{1,4}/g)) {
        $(this).next('.error__tx').remove();
        allCount13 = 1;
      } else {
        error2($(this));
        allCount13 = 0;
      }
  });
  // allCount14: 電話番号3
  $('.js-tel3').blur(function(){
    charactersChange($(this));
    if($(this).val() == '') {
        error1($(this));
        allCount14 = 0;
      } else if($(this).val().match(/\d{4}/g)) {
        $(this).next('.error__tx').remove();
        allCount14 = 1;
      } else {
        error2($(this));
        allCount14 = 0;
      }
  });

  // allCount15: メールアドレス
  var $mail = $('.js-form-mail');
  $mail.blur(function(){
    if($(this).val() == '') {
      allCount15 = 0;
      error1($(this));
    } else if($(this).val().match(/^[A-Za-z0-9]+[\w\.-]+@[\w\.-]+\.\w{2,}$/)){
      allCount15 = 1;
      $(this).next('.error__tx').remove();
    } else {
      allCount15 = 0;
      error2($(this));
    }
  });


  // 英数記号・スペース・ハイフン 全角半角変換
  $(".js-ch-change").blur(function(){
    charactersChange($(this));
    $(".js-ch-change").each(function(){
      $(this).val($(this).val().replace(/　/g,' '));
      $(this).val($(this).val().replace(/[ーー━‐―－–−-]/g,'-'));
    });
  });

  charactersChange = function(ele){
    var val = ele.val();
    var han = val.replace(/[Ａ-Ｚａ-ｚ０-９－！"＃＄％＆'（）：；＝＜＞，．？＿［］｛｝＠＾～￥]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});

    if(val.match(/[Ａ-Ｚａ-ｚ０-９－！"＃＄％＆'（）：；＝＜＞，．？＿［］｛｝＠＾～￥]/g)){
        $(ele).val(han);
    }
  }

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

  var errorTx1 = '入力がされていません';
  var errorTx2 = '入力内容が正しくありません';

  //- error1
  function error1(ele) {
    ele.next('.error__tx').remove();
    ele.after('<p class="error__tx error1">' + errorTx1 + '</p>');
  }

  //- error2
  function error2(ele) {
    ele.next('.error__tx').remove();
    ele.after('<p class="error__tx error2">' + errorTx2 + '</p>');
  }


  //- submit
  var submitBtn = $('.fm-parts__btn_submit');

  submitBtn.click(function(e){

    //-- ブラウザバック等で、入力値が維持されている場合
    //--- allCount01
    if($('.js-name').val().match(/.+/)){
        $('.js-name').next('.error__tx').remove();
        allCount01 = 1;
      } else {
        allCount01 = 0;
        if($('.js-name').next('p').hasClass('error1')){
        } else {
          error1($('.js-name'));
        }
      }
    //--- allCount02
    if($('.js-kana').val().match(/.+/)){
        $('.js-kana').next('.error__tx').remove();
        allCount02 = 1;
      } else {
        allCount02 = 0;
        if($('.js-kana').next('p').hasClass('error1')){
        } else {
          error1($('.js-kana'));
        }
      }

    //--- allCount03
    if($('.js-birth1').val() == '') {
        error1($('.js-birth1'));
        allCount03 = 0;
      } else if($('.js-birth1').val().match(/\d{4}/g)) {
        $('.js-birth1').next('.error__tx').remove();
        allCount03 = 1;
      } else {
        error2($('.js-birth1'));
        allCount03 = 0;
      }
    //--- allCount04
    if($('.js-birth2').val() == '') {
        error1($('.js-birth2'));
        allCount04 = 0;
      } else if($('.js-birth2').val().match(/\d{1,2}/g)) {
        $('.js-birth2').next('.error__tx').remove();
        allCount04 = 1;
      } else {
        error2($('.js-birth2'));
        allCount04 = 0;
      }
    //--- allCount05
    if($('.js-birth3').val() == '') {
        error1($('.js-birth3'));
        allCount05 = 0;
      } else if($('.js-birth3').val().match(/\d{1,2}/g)) {
        $('.js-birth3').next('.error__tx').remove();
        allCount05 = 1;
      } else {
        error2($('.js-birth3'));
        allCount05 = 0;
      }
    //--- allCount07
    if($('.js-address1').val().match(/.+/)){
        $('.js-address1').next('.error__tx').remove();
        allCount07 = 1;
      } else {
        allCount07 = 0;
        if($('.js-address1').next('p').hasClass('error1')){
        } else {
          error1($('.js-address1'));
        }
      }
    //--- allCount08
    if($('.js-address2').val().match(/.+/)){
        $('.js-address2').next('.error__tx').remove();
        allCount08 = 1;
      } else {
        allCount08 = 0;
        if($('.js-address2').next('p').hasClass('error1')){
        } else {
          error1($('.js-address2'));
        }
      }
    //--- allCount09
    if($('.js-address3').val().match(/.+/)){
        $('.js-address3').next('.error__tx').remove();
        allCount09 = 1;
      } else {
        allCount09 = 0;
        if($('.js-address3').next('p').hasClass('error1')){
        } else {
          error1($('.js-address3'));
        }
      }
    //--- allCount12
    if($('.js-tel1').val() == '') {
        error1($('.js-tel1'));
        allCount12 = 0;
      } else if($('.js-tel1').val().match(/\d{2,5}/g)) {
        $('.js-tel1').next('.error__tx').remove();
        allCount12 = 1;
      } else {
        error2($('.js-tel1'));
        allCount12 = 0;
      }
    //--- allCount13
    if($('.js-tel2').val() == '') {
        error1($('.js-tel2'));
        allCount13 = 0;
      } else if($('.js-tel2').val().match(/\d{1,4}/g)) {
        $('.js-tel2').next('.error__tx').remove();
        allCount13 = 1;
      } else {
        error2($('.js-tel2'));
        allCount13 = 0;
      }
    //--- allCount14
    if($('.js-tel3').val() == '') {
        error1($('.js-tel3'));
        allCount14 = 0;
      } else if($('.js-tel3').val().match(/\d{4}/g)) {
        $('.js-tel3').next('.error__tx').remove();
        allCount14 = 1;
      } else {
        error2($('.js-tel3'));
        allCount14 = 0;
      }
    //--- allCount15
    if($('.js-form-mail').val() == '') {
      // mailFlag = 0;
      allCount15 = 0;
      error1($('.js-form-mail'));
    } else if($('.js-form-mail').val().match(/^[A-Za-z0-9]+[\w\.-]+@[\w\.-]+\.\w{2,}$/)){
      // mailFlag = 1;
      allCount15 = 1;
      $('.js-form-mail').next('.error__tx').remove();
    } else {
      // mailFlag = 0;
      allCount15 = 0;
      error2($('.js-form-mail'));
    }


    // 空欄チェック
    if(allCount01 == 0) {
      error1($('.js-name'));
    }
    if(allCount02 == 0) {
      error1($('.js-kana'));
    }
    if(allCount03 == 0) {
      if($('.js-birth1').next('p').hasClass('error2')){
      } else {
        error1($('.js-birth1'));
      }
    }
    if(allCount04 == 0) {
      if($('.js-birth2').next('p').hasClass('error2')){
      } else {
        error1($('.js-birth2'));
      }
    }
    if(allCount05 == 0) {
      if($('.js-birth3').next('p').hasClass('error2')){
      } else {
        error1($('.js-birth3'));
      }
    }
    if(allCount07 == 0) {
      error1($('.js-address1'));
    }
    if(allCount08 == 0) {
      error1($('.js-address2'));
    }
    if(allCount09 == 0) {
      error1($('.js-address3'));
    }
    if(allCount12 == 0) {
      if($('.js-tel1').next('p').hasClass('error2')){
      } else {
        error1($('.js-tel1'));
      }
    }
    if(allCount13 == 0) {
      if($('.js-tel2').next('p').hasClass('error2')){
      } else {
        error1($('.js-tel2'));
      }
    }
    if(allCount14 == 0) {
      if($('.js-tel3').next('p').hasClass('error2')){
      } else {
        error1($('.js-tel3'));
      }
    }
    if(allCount15 == 0) {
      if($('.js-form-mail').next('p').hasClass('error2')){
      } else {
        error1($('.js-form-mail'));
      }
    }

    //性別 allCount06 / 職業 allCount10 / 進学希望地 allCount11
    //のチェック状況を調べる
    if(allCount06 == 0) { //NGの場合
      $('.sex').addClass('ng error__tx');
    }
    if(allCount10 == 0) { //NGの場合
      $('.job').addClass('ng error__tx');
    }
    if(allCount11 == 0) { //NGの場合
      $('.area').addClass('ng error__tx');
    }

    allCount00 = allCount01 + allCount02 + allCount03 + allCount04 + allCount05 + allCount06 + allCount07 + allCount08 + allCount09 + allCount10 + allCount11 + allCount12 + allCount13 + allCount14 + allCount15;


    var submitCheck = 0;
    if(allCount00 == 15) {// 全部入力値がOKの場合
      submitCheck = 1;
    } else {// 入力値がNGの場合
      submitCheck = 0;
    }


    if (submitCheck == 0) {
      // errorがあったら
      //scroll
      var speed = 400; // ミリ秒
      var position = $('.error__tx').offset().top;
      position = position + -50;
      $('body,html').animate({scrollTop:position}, speed, 'swing');

  	} else if(submitCheck == 1) {
    	document.webMemberForm.submit();
    }
  });

});
