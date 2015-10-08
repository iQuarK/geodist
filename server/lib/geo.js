/**
 * Module to calculate all geospatial data needed on our project
 **/

var exports = module.exports = {};

exports = {
  // get the distance (in km) using the harvesine formula
  getDistance: function(from, to) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(to.latitude-from.latitude);  // deg2rad below
    var dLon = deg2rad(to.longitude-from.longitude); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(from.latitude)) * Math.cos(deg2rad(to.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
};

// Auxiliar functions
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports = exports;
