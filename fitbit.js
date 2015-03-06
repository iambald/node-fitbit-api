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
      var url = API_URL + API_VERSION + '/user/' + (user || '-') + '/profile.json';
      _get(url, token, secret, callback);
    }

    this.getBodyWeight = function (token, secret, date, period, end_date, callback) {
      if (period && end_date) callback('Period and end_date specified!', null);

      var url = API_URL + API_VERSION + '/user/-/body/log/weight/date/' + date;
      if (period) url += '/' + period;
      else if (end_date) url += '/' + end_date;
      url += '.json';
      _get(url, token, secret, callback);
    }

    this.getBodyFat = function (token, secret, date, period, end_date, callback) {
      if (period && end_date) callback('Period and end_date specified!', null);

      var url = API_URL + API_VERSION + '/user/-/body/log/fat/date/' + date;
      if (period) url += '/' + period;
      else if (end_date) url += '/' + end_date;
      url += '.json';
      _get(url, token, secret, callback);
    }

    this.getBodyWeightGoal = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/body/log/weight/goal.json';
      _get(url, token, secret, callback);
    }

    this.getBodyFatGoal = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/body/log/fat/goal.json';
      _get(url, token, secret, callback);
    }

    this.getActivities = function (token, secret, user, date, callback) {
      var url = API_URL + API_VERSION + '/user/' + (user || '-') + '/activities/date/' + date + '.json';
      _get(url, token, secret, callback);
    }

    this.getActivityDailyGoals = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/activities/goals/daily.json';
      _get(url, token, secret, callback);
    }

    this.getActivityWeeklyGoals = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/activities/goals/weekly.json';
      _get(url, token, secret, callback);
    }

    this.getFoodLogs = function (token, secret, user, date, callback) {
      var url = API_URL + API_VERSION + '/user/' + (user || '-') + '/foods/log/date/' + date + '.json';
      _get(url, token, secret, callback);
    }

    this.getWater = function (token, secret, date, callback) {
      var url = API_URL + API_VERSION + '/user/-/foods/log/water/date/' + date + '.json';
      _get(url, token, secret, callback);
    }

    this.getFoodGoals = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/foods/log/goal.json';
      _get(url, token, secret, callback);
    }

    this.getWaterGoal = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/foods/log/water/goal.json';
      _get(url, token, secret, callback);
    }

    this.getSleep = function (token, secret, user, date, callback) {
      var url = API_URL + API_VERSION + '/user/' + (user || '-') + '/sleep/date/' + date + '.json';
      _get(url, token, secret, callback);
    }

    // TODO : strip or add slashes to path
    this.getTimeSeries = function (token, secret, user, path, date, period, end_date, callback) {
      if (period && end_date) callback('Period and end_date specified!', null);
      if (!(period || end_date)) callback('Neither of period and end_date specified!', null);

      var url = API_URL + API_VERSION + '/user/' + (user || '-') + path + '/date/' + date;
      if (period) url += period;
      else if (end_date) url += end_date;
      url += '.json';
      _get(url, token, secret, callback);
    }

    this.getActivityStats = function (token, secret, user, callback) {
      var url = API_URL + API_VERSION + '/user/' + (user || '-') + '/activities.json';
      _get(url, token, secret, callback)
    }

    this.getRecentActivities = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/activities/recent.json';
      _get(url, token, secret, callback);
    }

    this.getFrequentActivities = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/activities/frequent.json';
      _get(url, token, secret, callback);
    }

    this.getFavoriteActivities = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/activities/favorite.json';
      _get(url, token, secret, callback);
    }

    this.getRecentFoods = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/foods/log/recent.json';
      _get(url, token, secret, callback);
    }

    this.getFrequentFoods = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/foods/log/frequent.json';
      _get(url, token, secret, callback);
    }

    this.getFavoriteFoods = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/foods/log/favorite.json';
      _get(url, token, secret, callback);
    }

    this.getMeals = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/meals.json';
      _get(url, token, secret, callback);
    }

    this.getFriends = function (token, secret, user, callback) {
      var url = API_URL + API_VERSION + '/user/' + (user || '-') + '/friends.json';
      _get(url, token, secret, callback);
    }

    this.getFriendsLeaderboard = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/friends/leaderboard.json';
      _get(url, token, secret, callback);
    }

    this.getInvites = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/friends/invitations.json';
      _get(url, token, secret, callback);
    }

    this.getBadges = function (token, secret, user, callback) {
      var url = API_URL + API_VERSION + '/user/' + (user || '-') + '/badges.json';
      _get(url, token, secret, callback);
    }

    this.getDevices = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/user/-/devices.json';
      _get(url, token, secret, callback);
    }

    this.getDeviceAlarms = function (token, secret, device_id, callback) {
      var url = API_URL + API_VERSION + '/user/-/devices/tracker/' + device_id + '/alarms.json';
      _get(url, token, secret, callback);
    }

    this.getActivityType = function (token, secret, activity_id, callback) {
      var url = API_URL + API_VERSION + '/activities/' + activity_id + '.json';
      _get(url, token, secret, callback);
    }

    this.getFood = function (token, secret, food_id, callback) {
      var url = API_URL + API_VERSION + '/foods/' + food_id + '.json';
      _get(url, token, secret, callback);
    }

    this.getFoodUnits = function (token, secret, callback) {
      var url = API_URL + API_VERSION + '/foods/units.json';
      _get(url, token, secret, callback);
    }

  };

  if (typeof exports !== 'undefined') {
    module.exports = Fitbit;
  } else {
    window.Fitbit = Fitbit;
  }
}).call(this);
