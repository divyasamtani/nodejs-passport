var Twitter = require('twitter');

module.exports = function (app, passport) {

  function isLoggedIn(req, res, next) {

    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
    }

    app.get('/twitter', isLoggedIn, function(req, res){
     res.render('twitter', {message: req.flash('loginMessage') });
  });

    app.post('/twitter', isLoggedIn, function(req, res){

      var tweet = req.body.tweet;

      console.log(tweet);

      var client = new Twitter({
        consumer_key: 'kwOL7cNGEEjqRwEA6mUyc6Ml1',
        consumer_secret: 'yygmOzKXTjkxInG1UWDLwes2ZhlfYTdqGxvyREcNxVYRqvHm5P',
        access_token_key: req.user.twitter.token,
        access_token_secret: req.user.twitter.secret,
      });

      // Post to Twitter
      client.post('statuses/update', {status: tweet},  function(error, tweet, response) {
        if(error) console.log(error);
          // console.log(response);  // Raw response object.
        res.json('success, tweet has been posted');
      });
  });
}