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

   // security-layers scroll buttons
   $(".locations__action-scroll-left").click(function () {
    $(".locations__content-wrap").animate(
      {
        scrollLeft: "-=175px",
      },
      "normal"
    );
  });
  $(".locations__action-scroll-right").click(function () {
    $(".locations__content-wrap").animate(
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
  function initializeScrollContainer(container) {
    // Get references to the content, scrollbar, and thumb elements inside the container
    const content = container.querySelector(".content"); // The scrollable content area
    const scrollbar = container.querySelector(".custom-scrollbar"); // The custom scrollbar container
    const thumb = container.querySelector(".thumb"); // The draggable scrollbar thumb

    // State variables to handle dragging
    let isDraggingThumb = false; // Indicates if the thumb is being dragged
    let isDraggingContent = false; // Indicates if the content is being dragged
    let startX = 0; // Starting X-coordinate when dragging begins
    let scrollLeft = 0; // Initial scroll position of the content area
    let initialThumbLeft = 0; // Initial left position of the thumb when dragging starts

    /**
     * Function to dynamically hide or show the scrollbar
     * Checks if the content is scrollable and adjusts the visibility of the scrollbar accordingly.
     */
    function toggleScrollbarVisibility() {
      const contentWidth = content.scrollWidth; // Total width of the content (scrollable area)
      const visibleWidth = content.clientWidth; // Visible width of the content area (viewport)

      if (contentWidth > visibleWidth) {
        // Content is scrollable, show the scrollbar
        scrollbar.style.display = "block";
        updateThumb(); // Ensure the thumb is updated to match the content
      } else {
        // Content is not scrollable, hide the scrollbar
        scrollbar.style.display = "none";
      }
    }

    /**
     * Function to update the size of the thumb dynamically
     * The thumb's width is proportional to the visible area of the content.
     */
    function updateThumb() {
      const contentWidth = content.scrollWidth; // Total content width
      const visibleWidth = content.clientWidth; // Visible content width
      const scrollbarWidth = scrollbar.clientWidth; // Width of the custom scrollbar

      // Calculate the thumb's width as a proportion of the visible content
      thumb.style.width = `${(visibleWidth / contentWidth) * scrollbarWidth}px`;

      // Update the thumb's position based on the content's current scroll position
      updateThumbPosition();
    }

    /**
     * Function to update the thumb's position based on the content's scroll position
     */
    function updateThumbPosition() {
      const contentScrollWidth = content.scrollWidth - content.clientWidth; // Total scrollable width of the content
      const scrollbarWidth = scrollbar.clientWidth; // Width of the custom scrollbar
      const thumbWidth = thumb.offsetWidth; // Current width of the thumb

      // Calculate the thumb's position as a percentage of the scroll
      const scrollPercentage = content.scrollLeft / contentScrollWidth;
      const thumbLeft = scrollPercentage * (scrollbarWidth - thumbWidth);

      // Set the thumb's left position
      thumb.style.left = `${thumbLeft}px`;
    }

    /**
     * Function to handle dragging of the thumb
     * Calculates the new position of the thumb and updates the content's scroll position accordingly.
     */
    function handleThumbDrag(e) {
      if (!isDraggingThumb) return; // Exit if the thumb is not being dragged

      const deltaX = e.clientX - startX; // Change in the X position during the drag
      const scrollbarWidth = scrollbar.clientWidth; // Width of the custom scrollbar
      const thumbWidth = thumb.offsetWidth; // Width of the thumb
      const maxThumbLeft = scrollbarWidth - thumbWidth; // Maximum left position for the thumb

      // Calculate the new left position of the thumb within bounds
      const newThumbLeft = Math.min(
        Math.max(initialThumbLeft + deltaX, 0),
        maxThumbLeft
      );
      thumb.style.left = `${newThumbLeft}px`;

      // Update the content's scroll position based on the thumb's new position
      const contentScrollWidth = content.scrollWidth - content.clientWidth;
      const scrollPercentage = newThumbLeft / maxThumbLeft;
      content.scrollLeft = contentScrollWidth * scrollPercentage;
    }

    /**
     * Function to handle dragging of the content area
     * Updates the content's scroll position during dragging.
     */
    function handleContentDrag(e) {
      if (!isDraggingContent) return; // Exit if the content is not being dragged

      const deltaX = e.clientX - startX; // Change in the X position during the drag
      content.scrollLeft = scrollLeft - deltaX; // Update the content's scroll position
    }

    /**
     * Function to stop dragging
     * Resets the dragging states and removes event listeners.
     */
    function stopDrag() {
      isDraggingThumb = false; // Reset thumb dragging state
      isDraggingContent = false; // Reset content dragging state
      thumb.style.cursor = "grab"; // Restore the cursor for the thumb
      content.style.cursor = "grab"; // Restore the cursor for the content

      // Remove event listeners for dragging
      document.removeEventListener("mousemove", handleThumbDrag);
      document.removeEventListener("mousemove", handleContentDrag);
      document.removeEventListener("mouseup", stopDrag);
    }

    // Event listener for starting thumb drag
    thumb.addEventListener("mousedown", (e) => {
      isDraggingThumb = true; // Set thumb dragging state
      startX = e.clientX; // Record the initial X position
      initialThumbLeft = parseFloat(thumb.style.left) || 0; // Record the initial left position of the thumb
      thumb.style.cursor = "grabbing"; // Change the cursor to indicate dragging

      // Add event listeners for dragging
      document.addEventListener("mousemove", handleThumbDrag);
      document.addEventListener("mouseup", stopDrag);
    });

    // Event listener for starting content drag
    content.addEventListener("mousedown", (e) => {
      isDraggingContent = true; // Set content dragging state
      startX = e.clientX; // Record the initial X position
      scrollLeft = content.scrollLeft; // Record the initial scroll position of the content
      content.style.cursor = "grabbing"; // Change the cursor to indicate dragging

      // Add event listeners for dragging
      document.addEventListener("mousemove", handleContentDrag);
      document.addEventListener("mouseup", stopDrag);
    });

    // Event listener to update thumb position when content scrolls
    content.addEventListener("scroll", updateThumbPosition);

    // Event listener to adjust scrollbar visibility on window resize
    window.addEventListener("resize", toggleScrollbarVisibility);

    // Initialize the thumb size, position, and scrollbar visibility
    toggleScrollbarVisibility();
  }

  // Initialize the scroll behavior for all scroll containers on the page
  document.querySelectorAll(".scroll-container").forEach((container) => {
    initializeScrollContainer(container);
  });
}
