$(document).ready(function () {
  $('#fullpage').fullpage({
    anchors: ['section01', 'section02', 'section03', 'footer'],
    scrollOverflow: true,
    navigation: true,
    navigationPosition: 'left',
    navigationTooltips: ['First Section', 'Second Section', 'Third Section'],
    scrollingSpeed: 1000,
    paddingTop: 0,
    responsiveWidth: 768, // 768px 이하에서는 fullPage 비활성화
    afterLoad: function(anchorLink, index) {
      if (index === 1) {
        $('header').removeClass('scrolled');
      } else {
        $('header').addClass('scrolled');
      }
      AOS.refresh();
    }
  });
});

// 햄버거 메뉴 열기
$('.menu-toggle').on('click', function () {
  $('#menuNav').toggleClass('open');
  $('body').toggleClass('menu-open');
});

// 모바일 하위 메뉴 열기
$('#menuNav .has-sub').on('click', function (e) {
  if ($(window).width() <= 768) {
    e.preventDefault();
    const $li = $(this).parent();
    $li.toggleClass('active').siblings().removeClass('active');
  }
});
