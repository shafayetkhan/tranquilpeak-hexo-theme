(function($) {
  'use strict';

  // Fade out the blog and let drop the about card of the author and vice versa

  /**
   * AboutCard
   * @constructor
   */
  var AboutCard = function() {
    this.$openBtn = $("#sidebar, #header").find("a[href*='#about']");
      this.$closeBtn = $('#about-btn-close');
      this.$moreBtn = $('#about-card-more-link');
      this.$moreBtnLink = $("#about-card-more-link").attr("data-link");
    this.$blog = $('#blog');
    this.$about = $('#about');
    this.$aboutCard = $('#about-card');
  };

  AboutCard.prototype = {

    /**
     * Run AboutCard feature
     * @return {void}
     */
    run: function() {
      var self = this;
      // Detect click on open button
      self.$openBtn.click(function(e) {
        e.preventDefault();
        self.play();
      });
      // Detect click on close button
      self.$closeBtn.click(function(e) {
        e.preventDefault();
        self.playBack();
      });
        // Detect click on more button
        self.$moreBtn.click(function(e) {
            e.preventDefault();
            self.playBackWithRedirect();
        });
    },

    /**
     * Play the animation
     * @return {void}
     */
    play: function() {
      var self = this;
      // Fade out the blog
      self.$blog.fadeOut();
      // Fade in the about card
      self.$about.fadeIn();
      // Small timeout to drop the about card after that
      // the about card fade in and the blog fade out
      setTimeout(function() {
        self.dropAboutCard();
      }, 300);
    },

    /**
     * Play back the animation
     * @return {void}
     */
    playBack: function() {
      var self = this;
      // Lift the about card
      self.liftAboutCard();
      // Fade in the blog after that the about card lifted up
      setTimeout(function() {
        self.$blog.fadeIn();
        // Initialize slick once blog is restored in homepage
        if ($('.tweets-container').length) {
          self.refreshSlick();
        }
      }, 500);
      // Fade out the about card after that the about card lifted up
      setTimeout(function() {
        self.$about.fadeOut();
      }, 500);
    },

      /**
       * Play back the animation with ridirect
       * @return {void}
       */
      playBackWithRedirect: function() {
          var self = this;
          // Lift the about card
          self.liftAboutCard();
          // Fade in the blog after that the about card lifted up
          setTimeout(function() {
              self.$blog.fadeIn();
            if ($('.tweets-container').length) {
              // Initialize slick once blog is restored in homepage
              self.refreshSlick();
            }
          }, 500);
          // Fade out the about card after that the about card lifted up
          setTimeout(function() {
              self.$about.fadeOut();
              setTimeout(function() {
                  window.location.replace(self.$moreBtnLink);
              }, 500);
          }, 500);
      },

    /**
     * Slide the card to the middle
     * @return {void}
     */
    dropAboutCard: function() {
      var self = this;
      var aboutCardHeight = self.$aboutCard.innerHeight();
      // default offset from top
      var offsetTop = ($(window).height() / 2) - (aboutCardHeight / 2) + aboutCardHeight;
      // if card is longer than the window
      // scroll is enable
      // and re-define offsetTop
      if (aboutCardHeight + 30 > $(window).height()) {
        offsetTop = aboutCardHeight;
      }
      self.$aboutCard
        .css('top', '0px')
        .css('top', '-' + aboutCardHeight + 'px')
        .show(500, function() {
          self.$aboutCard.animate({
            top: '+=' + offsetTop + 'px'
          });
        });
    },

    /**
     * Slide the card to the top
     * @return {void}
     */
    liftAboutCard: function() {
      var self = this;
      var aboutCardHeight = self.$aboutCard.innerHeight();
      // default offset from top
      var offsetTop = ($(window).height() / 2) - (aboutCardHeight / 2) + aboutCardHeight;
      if (aboutCardHeight + 30 > $(window).height()) {
        offsetTop = aboutCardHeight;
      }
      self.$aboutCard.animate({
        top: '-=' + offsetTop + 'px'
      }, 500, function() {
        self.$aboutCard.hide();
        self.$aboutCard.removeAttr('style');
      });
    },

    /**
     * Destroy the slick carousel
     * @return {void}
     */
    _unslick: function() {
      $(".single-item").slick('unslick');

    },

    /**
     * Initialize slick carousel
     * @return {void}
     */
    refreshSlick: function() {
      $(".single-item").slick('refresh');
    }
  };

  $(document).ready(function() {
    var aboutCard = new AboutCard();
    aboutCard.run();
  });
})(jQuery);
