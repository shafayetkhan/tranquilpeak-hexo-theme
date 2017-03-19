(function($) {
  'use strict';

  // Get tweets and display them using slick

  var Tweets = function() {

  };

  Tweets.prototype = {
    run: function() {
      var self = this;

      // do something
      $.getJSON('http://shaf-io.appspot.com/tweets', self.processTweets);
      $(".single-item").slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000
      });
    },

    processTweets: function(data) {
      var self = this;
      console.log(data);
    }
  };

  $(document).ready(function() {
    var tweets = new Tweets();
    tweets.run();
  });
})(jQuery);
