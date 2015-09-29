var Geolocation = {
  geocoder: null,
  init: function() {
    console.debug('initialising');
    try {
      Geolocation.geocoder = new google.maps.Geocoder();

    } catch (exc) {
      console.error('No Google Maps loaded at all!');
    }
  },
  getLocations: function(location) {
    return new Promise(function(resolve, reject) {
      Geolocation.geocoder.geocode({'address': location}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(results);
        }
      });
    });
  },
  getDistance: function(data) {
    return ajax('api/geo/distance', 
      {
        method:'POST',
        data: data
      });
  }
};
