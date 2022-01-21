const {fetchMyIP} = require('./iss.js');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('It didn\'t work\n', error);
    return;
  }
  console.log(`IP Address: ${ip}`);
});

module.exports = { fetchMyIP };