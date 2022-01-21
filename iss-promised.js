const request = require('request-promise-native');

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP) // being provided as a callback
    .then(fetchFlyoverTimes) // being provided as a callback
    .then(data => {
      const {response} = JSON.parse(data);
      return response;
    });
};

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://freegeoip.live/json/${ip}`);
};

const fetchFlyoverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

module.exports = {nextISSTimesForMyLocation};