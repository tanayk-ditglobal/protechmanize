jQuery(document).ready(function ($) {
  // owl carosuel
  $(".we-work-carousel").owlCarousel({
    loop: true,
    dots: true,
    margin: 10,
    items: 1,
    loop: false,
    navText: ["<img src='images/icons/arrow-left.svg' alt=''>", "<img src='images/icons/arrow-right.svg' alt=''>"],
    responsive: {
      992: {
        nav: true,
      },
    }
  });

  // about-us scroll buttons
  $('.about-us-scroll-left').click(function () {
    $('.about-us__left').animate({
      scrollLeft: "-=175px"
    }, "normal");
  });
  $('.about-us-scroll-right').click(function () {
    $('.about-us__left').animate({
      scrollLeft: "+=175px"
    }, "normal");
  });

  // security-layers scroll buttons
  $('.security-layers-scroll-left').click(function () {
    $('.security-layers__list').animate({
      scrollLeft: "-=175px"
    }, "normal");
  });
  $('.security-layers-scroll-right').click(function () {
    $('.security-layers__list').animate({
      scrollLeft: "+=175px"
    }, "normal");
  });

  // $("#nav-toggle").click(function () {
  //   $('body').toggleClass("overflow-hidden");
  // });

  // search button
  $('#search-btn').click(function () {
    $('.search-box').addClass('active');
  });
  $('#close-search-box').click(function () {
    $('.search-box').removeClass('active');
  });

  // search-group
  $(".search-group input").focus(function () {
    $(this).parent().addClass("active");
  })
  $('#close-search-grp').click(function () {
    $(this).parent().removeClass("active");
  });
});

// light and dark theme switch desktop
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'light') {
    toggleSwitch.checked = true;
  }
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
  else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}
toggleSwitch.addEventListener('change', switchTheme, false);

// light and dark theme switch mobile
const toggleSwitch2 = document.querySelector('.theme-switch-2 input[type="checkbox"]');
const currentTheme2 = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'light') {
    toggleSwitch2.checked = true;
  }
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
  else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}
toggleSwitch2.addEventListener('change', switchTheme, false);