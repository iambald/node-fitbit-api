(function() {
  var OAuth = require('oauth');

  var API_URL = 'https://api.fitbit.com/';
  var API_VERSION = '1';

  var Fitbit = function (options) {
    options.unit_system = options.unit_system || 'en_US';
    var oauth = new OAuth.OAuth(API_URL + '/oauth/request_token',
                                API_URL + '/oauth/access_token',
                                options.api_key, options.api_secret,
                                '1.0', options.callbackURL, 'HMAC-SHA1', null);

    function _get (url, token, secret, callback) {
      oauth.get(url, token, secret, function(err, data) {
        if (err) return callback(err, data);
        try {
          data = JSON.parse(data);
          callback(null, data);
        } catch (e) {
          callback(e, null);
        }
      });
    }

    // this.getToken = function (callback) {
    //   oauth.getOAuthRequestToken({oauth_callback: options.callbackURL},
    //     function (err, oauth_token, oauth_token_secret) {
    //       if (err) return callback(err);
    //     });
    // }
    this.getUserInfo = function (token, secret, user, callback) {
      user = user || '-';
      var url = API_URL + API_VERSION + '/user/' + user + '/profile.json';
      _get(url);
    }

    this.getBodyWeight = function (token, secret, date, period, end_date, callback) {
      var url = API_URL + API_VERSION + '/user/-/body/log/weight/date/' + date;
      if (period) url += '/' + period;
      else if (end_date) url += '/' + end_date;
      url += '.json';
      _get(url);
    }

    this.getBodyFat = function (token, secret, date, period, end_date, callback) {
      var url = API_URL + API_VERSION + '/user/-/body/log/fat/date/' + date;
      if (period) url += '/' + period;
      else if (end_date) url += '/' + end_date;
      url += '.json';
      _get(url);
    }

    this.getBodyWeightGoal = function (token, secret) {
      var url = API_URL + API_VERSION + '/user/-/body/log/weight/goal.json';
      _get(url);
    }

    this.getBodyFatGoal = function (token, secret) {
      var url = API_URL + API_VERSION + '/user/-/body/log/fat/goal.json';
      _get(url);
    }

    this.getActivities = function (token, secret, user, date) {
      var user = user || '-';
      var url = API_URL + API_VERSION + '/user/' + user + '/activities/date/' + date + '.json';
      _get(url);
    }

    this.getActivityDailyGoals = function (token, secret) {
      var url = API_URL + API_VERSION + '/user/-/activities/goals/daily.json';
      _get(url);
    }

    this.getActivityWeeklyGoals = function (token, secret) {
      var url = API_URL + API_VERSION + '/user/-/activities/goals/weekly.json';
      _get(url);
    }

    this.getFoodLogs = function (token, secret, user, date) {
      var user = user || '-';
      var url = API_URL + API_VERSION + '/user/' + user + '/foods/log/date/' + date + '.json';
      _get(url);
    }

    this.getWater = function (token, secret, date) {
      var url = API_URL + API_VERSION + '/user/-/foods/log/water/date/' + date + '.json';
      _get(url);
    }

    this.getFoodGoals = function (token, secret) {
      var url = API_URL + API_VERSION + '/user/-/foods/log/goal.json';
      _get(url);
    }

    this.getWaterGoal = function (token, secret) {
      var url = API_URL + API_VERSION + '/user/-/foods/log/water/goal.json';
      _get(url);
    }

    this.getSleep = function (token, secret, user, date) {
      var user = user || '-';
      var url = API_URL + API_VERSION + '/user' + user + '/sleep/date/' + date + '.json';
      _get(url);
    }



  };

  if (typeof exports !== 'undefined') {
    module.exports = Fitbit;
  } else {
    window.Fitbit = Fitbit;
  }
}).call(this);
