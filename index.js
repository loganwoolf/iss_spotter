const {fetchMyIP, fetchCoordsByIP} = require('./iss.js');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('It didn\'t work\n', error);
    return;
  }
  console.log(`IP Address: ${ip}`);

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log('Geolocation didn\'t work', error);
      return;
    }
    console.log(`Geolocation: ${data}`);
    console.log(data);
  });
  
});

