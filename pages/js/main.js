
var submit = document.getElementById('submit');
var output = document.getElementById('data-output');
var locFrom = document.getElementById('location-from');
var locTo = document.getElementById('location-to');
var listFrom = document.getElementById('list-from');
var listTo = document.getElementById('list-to');
var latLongFrom = document.getElementById('lat-long-from');
var latLongTo = document.getElementById('lat-long-to');
var dataFrom = [];
var dataTo = [];

submit.addEventListener('click', function(evt) {
  try {
  var data = {
    from: {
      latitude: dataFrom[listFrom.selectedIndex].geometry.location.lat(),
      longitude: dataFrom[listFrom.selectedIndex].geometry.location.lng()
    },
    to: {
      latitude: dataTo[listTo.selectedIndex].geometry.location.lat(),
      longitude: dataTo[listTo.selectedIndex].geometry.location.lng()
    }
  }

  console.log(data);
  Geolocation.getDistance(data).then(
    function(response) {
      console.log('success', response);
      output.innerHTML = response.distance+" km";
    },
    function(error) {
      console.error('error', response);
    });

  } catch(excp) {
    console.error('Data not valid');
  }
});

locFrom.addEventListener('keypress', function(evt) {
  Geolocation.getLocations(evt.target.value).then(
    function(data) {
      var length = data.length;
      dataFrom = data;

      while (listFrom.options.length != 0) {
          listFrom.options.remove(listFrom.options.length - 1);
      }

      for(var idx=0; idx<length; idx++) {
        var opt = document.createElement('option');
        opt.value = idx;
        opt.text = data[idx].formatted_address;

        listFrom.add(opt);
      }
      var event = new Event('change');
      listFrom.dispatchEvent(event);

    }, function(error) {

    });
});

listFrom.addEventListener('change', function(evt) {
  latLongFrom.innerHTML = "Coordinates: "+dataFrom[evt.target.selectedIndex].geometry.location.lat()+","+dataFrom[evt.target.selectedIndex].geometry.location.lng();
});

locTo.addEventListener('keypress', function(evt) {
  Geolocation.getLocations(evt.target.value).then(
    function(data) {
      var length = data.length;
      dataTo = data;

      while (listTo.options.length != 0) {
          listTo.options.remove(listTo.options.length - 1);
      }

      for(var idx=0; idx<length; idx++) {
        var opt = document.createElement('option');
        opt.value = idx;
        opt.text = data[idx].formatted_address;

        listTo.add(opt);
      }
      var event = new Event('change');
      listTo.dispatchEvent(event);

    }, function(error) {

    });
});


listTo.addEventListener('change', function(evt) {
  console.log('change',evt.target);
  latLongTo.innerHTML = "Coordinates: "+dataTo[evt.target.selectedIndex].geometry.location.lat()+","+dataTo[evt.target.selectedIndex].geometry.location.lng();
});

Geolocation.init();