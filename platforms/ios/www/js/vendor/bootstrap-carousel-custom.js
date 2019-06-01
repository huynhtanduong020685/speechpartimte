/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


!function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = $.extend({}, $.fn.carousel.defaults, options)
    this.options.slide && this.slide(this.options.slide)
    this.options.pause == 'hover' && this.$element
        .on('mouseenter', $.proxy(this.pause, this))
        .on('mouseleave', $.proxy(this.cycle, this))
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.touch = {
        supported: "ontouchend" in document
        , startedAt: 0
        , startPositionX: 0
        , startPositionY: 0
    }

    //this.isGesture = false
    this.isVerticalSwipe = false; //  세로로 스와이프일 경우

    if (this.options.touch && this.touch.supported == true) {
        this.$element
        .on('touchstart', $.proxy(this.touchstart, this))
        .on('touchend', $.proxy(this.touchend, this))
        .on('touchmove', $.proxy(this.touchmove, this))

        this.options.touchHideControls && this.$element
        .children('.carousel-control').fadeOut('slow')
    }
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }

  Carousel.prototype.touchstart= function (e) {

      //ios에서는 이미지 사이즈 조절이 가능하도록 조절할 수 있으나 안드로이드는 안됨
      //if (this.iOS && e.originalEvent.touches.length > 1) {
      //    this.isGesture = true;
      //    return;
      //}

      //e.preventDefault();

      //this.isGesture = false;
      this.isVerticalSwipe = false;
      this.touch.startedAt = e.timeStamp
      this.touch.startPositionX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX
      this.touch.startPositionY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY
  }

  Carousel.prototype.touchend= function (e) {

      //if (this.isGesture) {
      //return;
      //}

      if (this.isVerticalSwipe) {
          return;
      }

      this.touch.startedAt = 0
      this.touch.startPositionX = 0
      this.touch.startPositionY = 0
  }

  Carousel.prototype.touchmove= function (e) {

      //if (this.isGesture) {
      //return;
      //}

      e.preventDefault();

      var currentX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
          currentY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY,
          currentDistanceX = (this.touch.startPositionX === 0) ? 0 : Math.abs(currentX - this.touch.startPositionX),
          currentDistanceY = (this.touch.startPositionY === 0) ? 0 : Math.abs(currentY - this.touch.startPositionY),
          currentDistanceYnotABS = (this.touch.startPositionY === 0) ? 0 : currentY - this.touch.startPositionY,
          currentTime = e.timeStamp

      //스크롤 있는 컨텐츠의 경우 스와이프가 아닌 스크롤이 움직이게
      if (currentDistanceY > 20 && $(document).height() > $(window).height()) {

          var scrollPosY = $(document).scrollTop();
          //손동작이 위에서 아래로
          if (currentDistanceYnotABS > 0) {
              if (scrollPosY != 0) {
                  $(document).scrollTop(scrollPosY - currentDistanceYnotABS)
              }
          }
              // 손동작이 아래에서 위로
          else {
              if (scrollPosY != $(document).height()) {
                  $(document).scrollTop(scrollPosY - currentDistanceYnotABS)
              }
          }
          this.isVerticalSwipe = true
          return
      }

      if (this.isVerticalSwipe == false && this.touch.startedAt !== 0 && currentTime - this.touch.startedAt < this.options.touchMaxTime && currentDistanceX > this.options.touchMaxDistance) {
          if (currentX < this.touch.startPositionX) {
              this.next();
              this.pause();
          } else if (currentX > this.touch.startPositionX) {
              this.prev();
              this.pause();
          }

          this.touch.startedAt = 0
          this.touch.startPositionX = 0
          this.touch.startPositionY = 0
      }
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.defaults = {
      interval: true
      , intervalTime: 5000
      , pause: 'hover'
      , touch: false
      , touchMaxTime: 1000
      , touchMaxDistance: 50
      , touchHideControls: true
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('touchstart.carousel.data-api click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);