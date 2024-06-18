(function($) {
  'use strict';

  $( document ).ready(function() {
       // Preloader

    setTimeout(function(){ 
      $("#preloader").css('display', 'none');     
    }, 1500)


    // ScrollUp
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 200) {
        $('.scrollingUp').addClass('is-active');
      } else {
        $('.scrollingUp').removeClass('is-active');
      }
    });
    $('.scrollingUp').on('click', function () {
      $("html, body").animate({
        scrollTop: 0
      }, 600);
      return false;
    });

        // Sticky Header
    if ($(".is-sticky-on").length > 0) {
      $(window).on('scroll', function() {
        if ($(window).scrollTop() >= 250) {
          $('.is-sticky-on').addClass('is-sticky-menu');
        }
        else {
          $('.is-sticky-on').removeClass('is-sticky-menu');
        }
      });
    }

    // Breadcrumb Sticky Menu
    if ($(".breadcrumb-sticky-on").length > 0) {
      $(window).on('scroll', function() {
        if ($(window).scrollTop() >= 420) {
          $('.breadcrumb-sticky-on').addClass('breadcrumb-sticky-menu');
        }
        else {
          $('.breadcrumb-sticky-on').removeClass('breadcrumb-sticky-menu');
        }
      });
    }

    jQuery(function($) {
  // Home Slider
      var $owlHome = $('.home-slider');
      var $owlHomeThumb = $(".home-thumbs-carousel");
      var $slidesPerPage = 5;
      var $owledSecondary = true;
      $owlHome.owlCarousel({
        rtl: $("html").attr("dir") == 'rtl' ? true : false,
        items: 1,
        autoplay: true,
        autoplayTimeout: 8000,
        margin: 0,
        loop: true,
        dots: false,
        nav: false,
        singleItem: true,
        transitionStyle: "fade",
        touchDrag: true,
        mouseDrag: true,
        responsiveRefreshRate: 200,
      }).on('changed.owl.carousel', owlPosition);
      $owlHomeThumb.on('initialized.owl.carousel', function() {
        $owlHomeThumb.find(".owl-item").eq(0).addClass("current");
      }).owlCarousel({
        items: $slidesPerPage,
        dots: false,
        nav: false,
        margin: 20,
        smartSpeed: 200,
        slideSpeed: 500,
        touchDrag: true,
        mouseDrag: true,
        slideBy: $slidesPerPage,
        responsiveRefreshRate: 100
      }).on('changed.owl.carousel', owlPosition2);
      function owlPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);
        if (current < 0) {
          current = count;
        }
        if (current > count) {
          current = 0;
        }
        $owlHomeThumb.find(".owl-item").removeClass("current").eq(current).addClass("current");
        var onscreen = $owlHomeThumb.find('.owl-item.active').length - 1;
        var start = $owlHomeThumb.find('.owl-item.active').first().index();
        var end = $owlHomeThumb.find('.owl-item.active').last().index();
        if (current > end) {
          $owlHomeThumb.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
          $owlHomeThumb.data('owl.carousel').to(current - onscreen, 100, true);
        }
      }
      function owlPosition2(el) {
        if ($owledSecondary) {
          var number = el.item.index;
          $owlHome.data('owl.carousel').to(number, 100, true);
        }
      }
      $owlHomeThumb.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        $owlHome.data('owl.carousel').to(number, 300, true);
      });
      $owlHome.owlCarousel();
      $owlHome.on('translate.owl.carousel', function (event) {
        var data_anim = $("[data-animation]");
        data_anim.each(function() {
          var anim_name = $(this).data('animation');
          $(this).removeClass('animated ' + anim_name).css('opacity', '0');
        });
      });
      $("[data-delay]").each(function() {
        var anim_del = $(this).data('delay');
        $(this).css('animation-delay', anim_del);
      });
      $("[data-duration]").each(function() {
        var anim_dur = $(this).data('duration');
        $(this).css('animation-duration', anim_dur);
      });
      $owlHome.on('translated.owl.carousel', function() {
        var data_anim = $owlHome.find('.owl-item.active').find("[data-animation]");
        data_anim.each(function() {
          var anim_name = $(this).data('animation');
          $(this).addClass('animated ' + anim_name).css('opacity', '1');
        });
      });
    });

    jQuery(function($) {
   // Testimonial Slider
      var $owlHomeTes = $('.client-testimonial-carousel');
      var $owlHomeTesThumb = $(".client-thumbs-carousel");
      var $slidesPerPage = 6;
      var $slidesLapPage = 4;
      var $slidesTabPage = 3;
      var $slidesMobPage = 2;
      var $owledSecondary = true;
      $owlHomeTes.owlCarousel({
        rtl: $("html").attr("dir") == 'rtl' ? true : false,
        items: 1,
        autoplay: false,
        margin: 0,
        loop: true,
        dots: false,
        nav: false,
        center:false,
        singleItem: true,
        transitionStyle: "fade",
        animateIn: 'fadeIn',
        touchDrag: true,
        mouseDrag: true,
        slideSpeed: 2000,
        responsiveRefreshRate: 200,
      }).on('changed.owl.carousel', owlPosition);
      $owlHomeTesThumb.on('initialized.owl.carousel', function() {
        $owlHomeTesThumb.find(".owl-item").eq(0).addClass("current");
      }).owlCarousel({
        dots: false,
        nav: true,
        margin: 20,
        smartSpeed: 200,
        slideSpeed: 500,
        touchDrag: true,
        mouseDrag: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        slideBy: $slidesPerPage,
        responsiveRefreshRate: 100,
        responsive: {
          0: {
            items: $slidesMobPage,
          },
          768: {
            items: $slidesTabPage,
          },
          992: {
            items: $slidesLapPage,
          },
          1220: {
            items: $slidesPerPage,
          }
        }
      }).on('changed.owl.carousel', owlPosition2);
      function owlPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);
        if (current < 0) {
          current = count;
        }
        if (current > count) {
          current = 0;
        }
        $owlHomeTesThumb.find(".owl-item").removeClass("current").eq(current).addClass("current");
        var onscreen = $owlHomeTesThumb.find('.owl-item.active').length - 1;
        var start = $owlHomeTesThumb.find('.owl-item.active').first().index();
        var end = $owlHomeTesThumb.find('.owl-item.active').last().index();
        if (current > end) {
          $owlHomeTesThumb.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
          $owlHomeTesThumb.data('owl.carousel').to(current - onscreen, 100, true);
        }
      }
      function owlPosition2(el) {
        if ($owledSecondary) {
          var number = el.item.index;
          $owlHomeTes.data('owl.carousel').to(number, 100, true);
        }
      }
      $owlHomeTesThumb.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        $owlHomeTes.data('owl.carousel').to(number, 300, true);
      });
      $owlHomeTes.owlCarousel();
      $owlHomeTes.on('translate.owl.carousel', function (event) {
        var data_anim = $("[data-animation]");
        data_anim.each(function() {
          var anim_name = $(this).data('animation');
          $(this).removeClass('animated ' + anim_name).css('opacity', '1');
        });
      });
      $("[data-delay]").each(function() {
        var anim_del = $(this).data('delay');
        $(this).css('animation-delay', anim_del);
      });
      $("[data-duration]").each(function() {
        var anim_dur = $(this).data('duration');
        $(this).css('animation-duration', anim_dur);
      });
      $owlHomeTes.on('translated.owl.carousel', function() {
        var data_anim = $owlHomeTes.find('.owl-item.active').find("[data-animation]");
        data_anim.each(function() {
          var anim_name = $(this).data('animation');
          $(this).addClass('animated ' + anim_name).css('opacity', '1');
        });
      });
    });

// Single Magnific Popup Video
    $('.btn-play').magnificPopup({
      type: 'iframe'
    });
    // Animated Typing Text
    var typingText = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick();
      this.isDeleting = false;
    };
    typingText.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    };
    window.onload = function () {
      var elements = document.getElementsByClassName("typewrite");
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
          new typingText(elements[i], JSON.parse(toRotate), period);
        }
      }
          // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #111111}";
      document.body.appendChild(css);
    };

  });

}(jQuery));