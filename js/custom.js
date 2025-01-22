jQuery(document).ready(function ($) {
  // owl carosuel
  $(".we-work-carousel").owlCarousel({
    loop: true,
    dots: true,
    margin: 10,
    items: 1,
    loop: false,
    navText: [
      "<img src='images/icons/arrow-left.svg' alt=''>",
      "<img src='images/icons/arrow-right.svg' alt=''>",
    ],
    responsive: {
      992: {
        nav: true,
      },
    },
  });

  $(".industries-carousel").owlCarousel({
    nav: true,
    dots: false,
    items: 1,
    navText: [
      "<img src='images/icons/long-arrow-left.svg' alt=''>",
      "<img src='images/icons/long-arrow-right.svg' alt=''>",
    ],
  });

  // about-us scroll buttons
  $(".about-us-scroll-left").click(function () {
    $(".about-us__left").animate(
      {
        scrollLeft: "-=175px",
      },
      "normal"
    );
  });
  $(".about-us-scroll-right").click(function () {
    $(".about-us__left").animate(
      {
        scrollLeft: "+=175px",
      },
      "normal"
    );
  });

  // security-layers scroll buttons
  $(".security-layers-scroll-left").click(function () {
    $(".security-layers__list").animate(
      {
        scrollLeft: "-=175px",
      },
      "normal"
    );
  });
  $(".security-layers-scroll-right").click(function () {
    $(".security-layers__list").animate(
      {
        scrollLeft: "+=175px",
      },
      "normal"
    );
  });

  // $("#nav-toggle").click(function () {
  //   $('body').toggleClass("overflow-hidden");
  // });

  // search button
  $("#search-btn").click(function () {
    $(".search-box").addClass("active");
  });
  $("#close-search-box").click(function () {
    $(".search-box").removeClass("active");
  });

  // search-group
  $(".search-group input").focus(function () {
    $(this).parent().addClass("active");
  });
  $("#close-search-grp").click(function () {
    $(this).parent().removeClass("active");
  });

  $(".navbar-toggler").click(function () {
    $("body").toggleClass("overflow-hidden");
  });
});

// light and dark theme switch desktop
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "light") {
    toggleSwitch.checked = true;
  }
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}
toggleSwitch.addEventListener("change", switchTheme, false);

// light and dark theme switch mobile
const toggleSwitch2 = document.querySelector(
  '.theme-switch-2 input[type="checkbox"]'
);
const currentTheme2 = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "light") {
    toggleSwitch2.checked = true;
  }
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}
toggleSwitch2.addEventListener("change", switchTheme, false);

// scroll carousel

// if carousel-container class present then only this script will work.
if (document.getElementsByClassName("scroll-container").length) {
  const content = document.querySelector(".content");
  const scrollbar = document.querySelector(".custom-scrollbar");
  const thumb = document.querySelector(".thumb");

  let isDraggingThumb = false;
  let isDraggingContent = false;
  let startX = 0;
  let scrollLeft = 0;
  let initialThumbLeft = 0;

  // Function to update the thumb width and position
  function updateThumb() {
    const contentWidth = content.scrollWidth;
    const visibleWidth = content.clientWidth;
    const scrollbarWidth = scrollbar.clientWidth;

    // Update thumb width proportionally to the visible content
    thumb.style.width = `${Math.max(
      (visibleWidth / contentWidth) * scrollbarWidth,
      30
    )}px`;

    // Update thumb position based on the current scroll position
    updateThumbPosition();
  }

  // Function to update the thumb position relative to content scroll
  function updateThumbPosition() {
    const contentScrollWidth = content.scrollWidth - content.clientWidth;
    const scrollbarWidth = scrollbar.clientWidth;
    const thumbWidth = thumb.offsetWidth;

    const scrollPercentage = content.scrollLeft / contentScrollWidth;
    thumb.style.left = `${scrollPercentage * (scrollbarWidth - thumbWidth)}px`;
  }

  // Handle the thumb drag event
  function handleThumbDrag(e) {
    if (!isDraggingThumb) return;

    const deltaX = e.clientX - startX;
    const scrollbarWidth = scrollbar.clientWidth;
    const thumbWidth = thumb.offsetWidth;
    const maxThumbLeft = scrollbarWidth - thumbWidth;

    const newThumbLeft = Math.min(
      Math.max(initialThumbLeft + deltaX, 0),
      maxThumbLeft
    );
    thumb.style.left = `${newThumbLeft}px`;

    const contentScrollWidth = content.scrollWidth - content.clientWidth;
    const scrollPercentage = newThumbLeft / maxThumbLeft;
    content.scrollLeft = contentScrollWidth * scrollPercentage;
  }

  // Handle the content drag event
  function handleContentDrag(e) {
    if (!isDraggingContent) return;

    const deltaX = e.clientX - startX;
    content.scrollLeft = scrollLeft - deltaX;
  }

  // Event listener to start dragging the thumb
  thumb.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDraggingThumb = true;
    startX = e.clientX;
    initialThumbLeft = parseFloat(thumb.style.left) || 0;
    thumb.style.cursor = "grabbing";

    document.addEventListener("mousemove", handleThumbDrag);
    document.addEventListener("mouseup", stopDrag);
  });

  // Event listener to start dragging the content
  content.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDraggingContent = true;
    startX = e.clientX;
    scrollLeft = content.scrollLeft;
    content.style.cursor = "grabbing";

    document.addEventListener("mousemove", handleContentDrag);
    document.addEventListener("mouseup", stopDrag);
  });

  // Function to stop dragging (thumb or content)
  function stopDrag() {
    isDraggingThumb = false;
    isDraggingContent = false;
    thumb.style.cursor = "grab";
    content.style.cursor = "grab";
    document.removeEventListener("mousemove", handleThumbDrag);
    document.removeEventListener("mousemove", handleContentDrag);
    document.removeEventListener("mouseup", stopDrag);
  }

  // Event listeners for updating the thumb on scroll or resize
  content.addEventListener("scroll", updateThumbPosition);
  window.addEventListener("resize", updateThumb);

  // Initialize thumb position and width
  updateThumb();
}
