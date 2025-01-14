// bootstrap tooltip trigger
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// open nav in mobile
$("#nav-toggle").click(function(){
  $(this).toggleClass("active");
  $('body').toggleClass("overflow-hidden");
  $('.header__wrap').toggleClass("header-open");
  $(".header__navbar-collapse").toggleClass("show");
});

// open search box
$("#search-btn").click(function(){ 
  $(this).toggleClass("active");
  $('body').toggleClass("overflow-hidden");
  $('.header__wrap').toggleClass("search-open");
  $('.search-box').slideToggle(300);
});

// if search input has value
function checkForInput(element) {
  if ($(element).val().length > 0) {
    $('.search-box__content--box').hide();
    $('.search-box__content--input-box').show();
    $('.search-box__content--result').hide();
    $('#close-result-btn').hide();
    $('#search-result-btn').show().removeClass('disabled');
  } else {
    $('.search-box__content--input-box').hide();
    $('.search-box__content--box').show();
    $('#close-result-btn').hide();
    $('#search-result-btn').show().addClass('disabled');
  }
}
// search input change & keyup
$('#search-input').on('change keyup', function() {
  checkForInput(this);  
})

// passing suggestion value to search input
$(".suggestion-list li").on("click", function(){
  $("#search-input").val($(this).data('value'));
});

// show search result
$("#search-result-btn").click(function(){ 
  $(this).hide();
  $('#close-result-btn').show();
  $('.search-box__content--box').hide();
  $('.search-box__content--input-box').hide();
  $('.search-box__content--result').show();
});

// close search result
$("#close-result-btn").click(function(){ 
  $(this).hide();
  $('#search-result-btn').show().addClass('disabled');
  $('.search-box__content--box').show();
  $('.search-box__content--input-box').hide();
  $('.search-box__content--result').hide();
  $("#search-input").val('');
});

// remove class when click outside search
$(document).on("click", function(e) {
  if ($(e.target).is(".search-box__input, .search-box__input *, .search-box__content .container *, .header, .header *") === false) {
    $(".search-box").slideUp(300);
    $('#search-btn').removeClass("active");
    $('body').removeClass("overflow-hidden");
    $('.header__wrap').removeClass("search-open");
  }

  if (!$(e.target).is('.nav-collapse__content, .nav-collapse__content *, .header, .header *')) {
    $('.header .collapse').collapse('hide');	    
  }
});

// light and dark theme switch
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }    
}
toggleSwitch.addEventListener('change', switchTheme, false);

// app url redirect
$('.app_url').click(function(){
  document.location.href = 'http://150.129.243.241/'
});

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
      return false;
  }
  else {
      return true;
  }
}

// app url redirect email validation
// const handleUrl = (val) =>{
//   if (val.length > 0){
//     return document.location.replace(`http://150.129.243.241?email=${val}`);
//   }
//   else {
//     alert('Please enter email id');
//   }
// }

const handleUrl = (val) =>{
  if (val.length > 0){
    if (IsEmail(val) == false) {
      alert("Please enter valid email address.");
    }else{
      return document.location.replace(`http://stg.webwerksvmx.com/?email=${val}`);
    }
  }
  else {
    alert('Please enter email id');
  }
}

$('.app_url_valid').click(function(){
  const val = $('.email-valid').val();
  handleUrl(val);
  // document.location.replace(`http://150.129.243.241?email=${val}`);
});

$('.app_url_valid-f').click(function(){
  const val = $('.email-valid-f').val();
  handleUrl(val);
  // document.location.replace(`http://150.129.243.241?email=${val}`);
});

// custom scrollspy
$(document).ready(function() {
  var sectionIds = $('.doc-scrollspy a.nav-link');

  $(document).scroll(function() {
    sectionIds.each(function() {
      var container = $(this).attr('href');
      var containerOffset = $(container).offset().top;
      var containerHeight = $(container).outerHeight();
      var containerBottom = containerOffset + containerHeight;
      var scrollPosition = $(document).scrollTop();

      if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
          $(this).addClass('active');
      } else {
          $(this).removeClass('active');
      }
    });
  });
});