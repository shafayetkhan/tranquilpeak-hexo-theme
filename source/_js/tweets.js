(function($) {
  'use strict';
  String.prototype.linkify = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(m) {
      return '<a target="_blank" href="' + m + '">' + m + "</a>";

    });
  };

  String.prototype.hashify = function() {
    return this.replace(/\B#([A-Za-z0-9\/\.]*)/g, function(m) {
      return '<a target="_blank" href="http://twitter.com/search?q=' + m.replace('#','') + '">' + m + "</a>";
    });
  };

  String.prototype.atify = function() {
    return this.replace(/@[\w]+/g, function(m) {
      return '<a href="http://www.twitter.com/' + m.replace('@','') + '"target="_blank">' + m + "</a>";
    });
  };

  // Get tweets and display them using slick

  var Tweets = function() {
    this.$myTweets = [
      {
        text: "hello world - this is your first tweet!",
        created_at: "Mon Feb 06 21:08:09 +0000 2017"
      },
      {
        text: "hello world - this is your second tweet",
        created_at: "Mon Feb 06 21:08:09 +0000 2017"

      }
    ];
    this.$tweetContainer = $('.tweets-container');
    this.$tweets = $('#tweets');
  };

  Tweets.prototype = {
    run: function() {
      var self = this;

      setTimeout(function() {
        $.getJSON('https://shafio.herokuapp.com/tweets/10',
                  self.processTweets).error(function() {
                    $('.tweets-container').fadeOut('slow');
                  });
      }, 1200);

      // self.processTweets(this.myTweets);
    },

    processTweets: function(data) {
      var self = this;
      var html = '';

      // $.each(this.$myTweets, function(index, tweet){
      //   html += '<div><h4>' + tweet.text + '</h4><small>' +
      //     moment(tweet.created_at).fromNow() + '</small></div>';
      // });

      $.each(data, function(index, tweet){
        if (tweet.text && tweet.created_at) {
          html += '<div class="tweet-item"><p>' + tweet.text.linkify().hashify().atify() + '</p><small>' +
            moment(tweet.created_at).fromNow() + '</small></div>';
        }
      });

      if (html) {
        $('#tweets').hide().html(html).fadeIn('slow');

        $(".single-item").slick({
          dots: true,
          prevArrow: false,
          nextArrow: false,
          autoplay: true,
          autoplaySpeed: 3000
        });
      } else {
        $('.tweets-container').fadeOut('slow');
      }
    }
  };

  $(document).ready(function() {
    var tweets = new Tweets();
    tweets.run();
  });
})(jQuery);
