const {nextISSTimesForMyLocation} = require('./iss.js');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(passTimes);
});



/* const {fetchMyIP, fetchCoordsByIP, fetchFlyoverTimes} = require('./iss.js');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('It didn\'t work\n', error);
    return;
  }
  console.log('IP Address:');
  console.log(ip);

  fetchCoordsByIP(ip, (error, position) => {
    if (error) {
      console.log('Geolocation didn\'t work', error);
      return;
    }
    console.log('Position:');
    console.log(position);
  
    fetchFlyoverTimes(position ,(error, flyoverTimes) => {
      if (error) {
        console.log('Position API error: ', error);
        return;
      }
      console.log('Flyover times:');
      console.log(flyoverTimes);
    });
  });

});

 */