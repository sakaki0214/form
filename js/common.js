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


$(function($) {

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
  var errorTx1 = '※入力内容が正しくありません。';
  var $mail = $('.js-form-mail');
  var $copyMail = $('.js-form-copy-mail');
  var mailVal = $mail.val();
  var errorTx2 = '※入力内容が一致しません。';
  var $pw = $('.js-form-pw');
  var $copyPw = $('.js-form-copy-pw');
  var pwVal = $pw.val();


  //-submit
  $('form[data-validate]').on('input', function(){
    //console.log(this.checkValidity());
    $(this).find(':submit').attr('disabled', !this.checkValidity());
  });

  //-テキスト入力欄
  $textbox.on('input blur', function(){
    if($(this).val().match(/.+/)){
        $(this).next('.error__tx').remove();
      } else {
        if($(this).next('p').hasClass('error__tx')){
          return false;
        } else {
          $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
        }
      }
  });

  //-mail（入力欄1つ：@も含めて入力）
  $mail.on('input blur', function(){
    if($(this).val().match(/.+@.+\..+/)){
      $(this).next('.error__tx').remove();
    } else {
      if($(this).next('p').hasClass('error__tx')){
        return false;
      } else {
        $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    }
    if($copyMail.val() == '') {
      return false;
    } else if($copyMail.val() !== $(this).val()) {
      if($copyMail.next('p').hasClass('error__tx')){
        return false;
      } else {
        $copyMail.after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    } else if($copyMail.val() == $(this).val()) {
      $copyMail.next('.error__tx').remove();
    }
  });

  $copyMail.on('input blur', function(){
    if($mail.val() !== $(this).val()){
      if($(this).next('p').hasClass('error__tx')){
        return false;
      } else {
        $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    } else {
      $(this).next('.error__tx').remove();
    }
  });


  //-mail（入力欄2つ：@の前後を入力）



  //-pw
  $pw.on('input blur', function(){
    if($(this).val().match(/^[a-zA-Z¥s]+$/)){
      $(this).next('.error__tx').remove();
    } else {
      if($(this).next('p').hasClass('error__tx')){
        return false;
      } else {
        $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    }
    if($copyPw.val() == ''){
      return false;
    } else if($copyPw.val() !== $(this).val()) {
      if($copyPw.next('p').hasClass('error__tx')){
        return false;
      } else {
        $copyPw.after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    } else if($copyPw.val() == $(this).val()) {
      $copyPw.next('.error__tx').remove();
    }
  });
  $copyPw.on('input blur', function(){
    if($pw.val() !== $(this).val()){
      if($(this).next('p').hasClass('error__tx')){
        return false;
      } else {
        $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    } else {
      $(this).next('.error__tx').remove();
    }
  });


  //-others(check & text)
  //radio
  var $radioOn = $('.js-radio-on');
  var $radioOff = $('.form-parts__list input[type="radio"]:not(.js-radio-on)');
  var $radioTx = $('.js-radio-tx');
  var saveTxNum;
  $radioOn.on('click', function(){
    console.log('on-click');
    $radioTx.prop('disabled', false);
    $radioTx.val(saveTxNum);
  });
  $radioOff.on('click', function(){
    console.log('off-click');
    $radioTx.prop('disabled', true);
    saveTxNum = $radioTx.val();
    $radioTx.val('');
  });

  //checkbox
  var $othersCheckbox = $('.js-others');
  var $othersTx = $('.js-others-tx');
  var saveTxOthers;
  $othersCheckbox.on('click', function(){
    if($(this).prop('checked')){
      $othersTx.prop('disabled', false);
      $othersTx.val(saveTxOthers);
    } else {
      $othersTx.prop('disabled', true);
      saveTxOthers = $othersTx.val();
      $othersTx.val('');
    }
  });

  //
  //form-decoration
  //
  $('.fmselect').customSelect();

});
