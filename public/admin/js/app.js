/*****
* CONFIGURATION
*/
//Main navigation
$.navigation = $('nav > ul.nav');

$.panelIconOpened = 'icon-arrow-up';
$.panelIconClosed = 'icon-arrow-down';

//Default colours
$.brandPrimary = '#20a8d8';
$.brandSuccess = '#4dbd74';
$.brandInfo = '#63c2de';
$.brandWarning = '#f8cb00';
$.brandDanger = '#f86c6b';

$.grayDark = '#2a2c36';
$.gray = '#55595c';
$.grayLight = '#818a91';
$.grayLighter = '#d1d4d7';
$.grayLightest = '#f8f9fa';

'use strict';

/****
* MAIN NAVIGATION
*/

$(document).ready(function ($) {
  $(".my_click_remove").click(function () {
    if (confirm("Do you remove this? ")) {
      $.get($(this).attr("href"), function () { });
      $(this).parent().parent().remove();
    }
    return false;
  });
  // Add class .active to current link
  $.navigation.find('a').each(function () {

    var cUrl = String(window.location).split('?')[0];

    if (cUrl.substr(cUrl.length - 1) == '#') {
      cUrl = cUrl.slice(0, -1);
    }

    if ($($(this))[0].href == cUrl) {
      $(this).addClass('active');

      $(this).parents('ul').add(this).each(function () {
        $(this).parent().addClass('open');
      });
    }
  });

  // Dropdown Menu
  $.navigation.on('click', 'a', function (e) {

    if ($.ajaxLoad) {
      e.preventDefault();
    }

    if ($(this).hasClass('nav-dropdown-toggle')) {
      $(this).parent().toggleClass('open');
      resizeBroadcast();
    }

  });

  function resizeBroadcast() {

    var timesRun = 0;
    var interval = setInterval(function () {
      timesRun += 1;
      if (timesRun === 5) {
        clearInterval(interval);
      }
      window.dispatchEvent(new Event('resize'));
    }, 62.5);
  }

  /* ---------- Main Menu Open/Close, Min/Full ---------- */
  $('.navbar-toggler').click(function () {

    if ($(this).hasClass('sidebar-toggler')) {
      $('body').toggleClass('sidebar-hidden');
      resizeBroadcast();
    }

    if ($(this).hasClass('sidebar-minimizer')) {
      $('body').toggleClass('sidebar-minimized');
      resizeBroadcast();
    }

    if ($(this).hasClass('aside-menu-toggler')) {
      $('body').toggleClass('aside-menu-hidden');
      resizeBroadcast();
    }

    if ($(this).hasClass('mobile-sidebar-toggler')) {
      $('body').toggleClass('sidebar-mobile-show');
      resizeBroadcast();
    }

  });

  $('.sidebar-close').click(function () {
    $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
  });

  /* ---------- Disable moving to top ---------- */
  $('a[href="#"][data-top!=true]').click(function (e) {
    e.preventDefault();
  });

});

/****
* CARDS ACTIONS
*/

$(document).on('click', '.card-actions a', function (e) {
  e.preventDefault();

  if ($(this).hasClass('btn-close')) {
    $(this).parent().parent().parent().fadeOut();
  } else if ($(this).hasClass('btn-minimize')) {
    var $target = $(this).parent().parent().next('.card-block');
    if (!$(this).hasClass('collapsed')) {
      $('i', $(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
    } else {
      $('i', $(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
    }

  } else if ($(this).hasClass('btn-setting')) {
    $('#myModal').modal('show');
  }

});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function init(url) {

  /* ---------- Tooltip ---------- */
  $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({ "placement": "bottom", delay: { show: 400, hide: 200 } });

  /* ---------- Popover ---------- */
  $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

}


const addEmails = async () => {
  let email = $('#EmailField').val();
  let formData = new FormData();
  formData.append("email", email);
  
  var url = "/api/create-email";
  await $.ajax({
    type: 'POST',
    url: url,
    data: formData,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    beforeSend: function () { },
    success: function (res) {
      res = JSON.parse(res)
      if(res.error){
        getToast(res.message, 'error');
      }else{
        getToast(res.message);
        setTimeout(()=>{
          location.reload()
        },500)
      }
    }
  });
}
const removeEmails = async (id) => {
  var url = `/api/delete-email/${id}`;
  if (!confirm("Bạn có muốn xóa? ")) {
    return false;
  }
  await $.ajax({
    type: 'POST',
    url: url,
    processData: false,
    contentType: false,
    beforeSend: function () { },
    success: function (res) {
      // res = JSON.parse(res)
      if(res.error){
        getToast(res.message, 'error');
      }else{
        getToast(res.message);
        setTimeout(()=>{
          location.reload()
        },500)
      }
    }
  });
}
const changeEmails = async (event) => {
 
  let formData = new FormData();
  formData.append("showView", event.checked ? 1 : 0);
  let id = $(event).attr('data-target');
  var url = `/api/showview-email/${id}`;
 console.log(event.checked);
  await $.ajax({
    type: 'POST',
    url: url,
    processData: false,
    data: formData,
    mimeType: "multipart/form-data",
    contentType: false,
    beforeSend: function () { },
    success: function (res) {
      res = JSON.parse(res)
      if(res.error){
        getToast(res.message, 'error');
      }else{
        getToast(res.message);
        // setTimeout(()=>{
        //   location.reload()
        // },500)
      }
    }
  });
}
const getToast = (text, type = 'success') => {
  Toastify({
    text,
    className: "info",
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    style: {
      background: type == 'success' ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
    }
  }).showToast();
}