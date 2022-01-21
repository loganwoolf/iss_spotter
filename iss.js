const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json',
    (error, response, body) => {

      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const ip = JSON.parse(body).ip;
      callback(null, ip);

    });
};

const fetchCoordsByIP = function(ip, callback) {
  request('http://freegeoip.live/json/' + ip,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const {latitude, longitude} = JSON.parse(body);
      callback(null, {latitude, longitude});
    }
  );
};

const fetchFlyoverTimes = function(position, callback) {
  //https://iss-pass.herokuapp.com/json/?lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE
  const {latitude: lat, longitude: lon} = position;
  request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const flyoverTimes = JSON.parse(body).response;
      callback(null, flyoverTimes);


    }
  );
};

const nextISSTimesForMyLocation = function(callback) {


  fetchMyIP((error, ip) => {
    // console.log("IP?", ip);
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      // console.log("Coords ?", coords);
      if (error) {
        return callback(error, null);
      }
      fetchFlyoverTimes(coords, (error, times) => {
        // console.log("Times ?", times);
        if (error) {
          return callback(error, null);
        }
        callback(null, times);
      });
    });
  });



};

module.exports = {nextISSTimesForMyLocation};