document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    const videoElement = document.querySelector(".bg-video");
    // const scrollThreshold =
    //   window.innerWidth < 768 ? 700 : window.innerWidth < 992 ? 800 : 1200;

    if (window.scrollY > 1500) {
      videoElement.style.display = "none";
    } else {
      videoElement.style.display = "block";
    }
  });
});

$(function () {
  "use strict";

  $(function () {
    var equalWidth = $(".brand-ds .item").outerWidth();

    $(".brand-ds .item").css({
      height: equalWidth,
    });
  });

  var testim = new Swiper(".testimonials-ds .testim-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var testim = new Swiper(".testimonials-mp .testim-swiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    loop: false,
    pagination: {
      el: ".testimonials-mp .swiper-pagination",
      clickable: true,
    },
  });

  var workswip = new Swiper(".works-ds .work-swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    loop: true,
    pagination: {
      el: ".works-ds .swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: "auto",
      },
    },
  });

  $("#monthly-input").on("change", function () {
    $(".monthly_price").show();
    $(".monthly_price").siblings(".yearly_price").hide();
  });
  $("#yearly-input").on("change", function () {
    $(".yearly_price").show();
    $(".yearly_price").siblings(".monthly_price").hide();
  });

  $(".accordion .accordion-item").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });
});

// services Design : developed Picture Change
$(".services-mp .serv-title .tab-title").on("mouseenter", function () {
  var tab_id = $(this).attr("data-tab");
  $(".services-mp .serv-title .tab-title").removeClass("current");
  $(this).addClass("current");

  $(".services-mp .content .item").removeClass("current");
  $("#" + tab_id).addClass("current");

  if ($(this).hasClass("current")) {
    return false;
  }
});

$(function () {
  function initScrollTriggers() {
    var width = $(window).width();

    if (width > 991) {
      ("use strict");

      let cards = gsap.utils.toArray(".cards .card-item");

      let stickDistance = 0;

      let firstCardST = ScrollTrigger.create({
        trigger: cards[0],
        start: "center center",
      });

      let lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "bottom bottom",
      });

      cards.forEach((card, index) => {
        var scale = 1 - (cards.length - index) * 0.025;
        let scaleDown = gsap.to(card, {
          scale: scale,
          "transform-origin":
            '"50% ' + (lastCardST.start + stickDistance) + '"',
        });

        ScrollTrigger.create({
          trigger: card,
          start: "center center",
          end: () => lastCardST.start + stickDistance,
          pin: true,
          pinSpacing: false,
          ease: "none",
          animation: scaleDown,
          toggleActions: "restart none none reverse",
        });
      });

      ScrollTrigger.refresh();
    } else {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    }
  }

  initScrollTriggers();

  $(window).on("resize", function () {
    initScrollTriggers();
    ScrollTrigger.refresh();
  });
});

$(window).on("load", function () {
  $(".gallery").isotope({
    itemSelector: ".items",
  });
});

//Cta for Menu

const menu = document.querySelectorAll(".slide");

menu.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); 

    const target = this.getAttribute("href");
    console.log("Href value: ", target); 

    if (target) {
      $(".hamenu").removeClass("open").delay(300).animate({ left: "-100%" });
      
      setTimeout(() => {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: {
            y: target,
            offsetY: 40, 
          },
          delay: 0.7,
        });
      }, 400);
    }
  });
});


//Cta for Navbar

const navLinks = document.querySelectorAll(".scroll");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // alert("click")
    e.preventDefault();

    const target = this.getAttribute("href");
    console.log(target);

    gsap.to(window, {
      delay: 0.1,
      duration: 0.3,
      scrollTo: {
        y: target,
        offsetY: 25,
      },
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const colors = ["#007FFF", "#C497FE"];
  const spans = document.querySelectorAll(".list span");
  spans.forEach((span) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    span.style.backgroundColor = randomColor;
    if (randomColor === "#007FFF") {
      span.style.color = "#FFFFFF";
    } else {
      span.style.color = "#0E0F11";
    }
  });
});
//add active classes for nav 
const navs = document.querySelectorAll('.nav-link');

// Loop through each link and attach a click event listener
navs.forEach(links => {
  links.addEventListener('click', function() {
    // Remove 'active' class from all links
    navs.forEach(links => links.classList.remove('active'));

    // Add 'active' class to the clicked link
    this.classList.add('active');
  });
});
