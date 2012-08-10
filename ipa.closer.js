var client = require('brik.ipa.client');
var feed = require('brik.ipa.feed');
var fs = require('fs');

var alreadyPubd = (function() {
  var publist = [];
  try {
    var plstr = fs.readFileSync('pubd.json','utf8');
    publist = JSON.parse(plstr);
  } catch(e) {}
  return function(desc) {
    if (publist.indexOf(desc) >= 0) return true;
    publist.push(desc);
    fs.writeFile('pubd.json', JSON.stringify(publist), function(){});
    return false;
  }
})()

var shouldPublish = function(item) {
  if (!item || !item.title) return false;
  return !!item.title.match(/closed\sissue/gi) ? !alreadyPubd(item.title) : 0;
}

module.exports = function(srv, feedurl) {
  var ipa = client(srv);
  var fd = feed([feedurl], shouldPublish, function(thing) {
    ipa.log(thing);
    ipa.play('brass.wav');
  });
  setInterval(function(){
    fd(function() {
      console.log('Updated...');
    });
  }, 1000);
}