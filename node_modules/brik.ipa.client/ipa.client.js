var request = require('request');
var path = require('path');
var naan = require('naan');

module.exports = function(serverLocation) {
  var fnurl = function(path) {
    return serverLocation + "/" + path;
  }
  var genericCallback = function(callback) {
    return function(err, response, body) {
      if (!callback) return;
      if (err || response.status >= 300) {
        callback(err || body || response.status);
      } else {
        callback();
      }
    }
  }

  var client = {
    log: function ipaSendLogMessage(message, callback) {
      request.post({
        url: fnurl('log'),
        json: { text: message }
      }, genericCallback(callback));
    },
    logImage: function ipaSendLogImage(url, callback) {
      client.log('<img src="' + url + '"/>', callback)
    },
    play: function ipaPlaySound(soundFile,callback) {
      request({
        url: fnurl('sound/' + soundFile)
      }, genericCallback(callback));
    }
  }

  return client;
}