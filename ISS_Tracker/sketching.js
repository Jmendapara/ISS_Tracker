var map;
var locationdata;
var assdata;

function setup(){

  loadJSON("http://api.open-notify.org/iss-now.json", getData);
  setInterval(askISS,1000); //every second

}

function askISS(){

  loadJSON("http://api.open-notify.org/iss-now.json", getData);
}

function getData(data){

  locationdata = data;

}

var markers = [];

function initMap() {

  var myLatLng = {lat: 0, lng: 0};
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 2.5,
    center: myLatLng
  });

  var isspic = {
    url: "ISS.png", // url
    scaledSize: new google.maps.Size(60, 60), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(30, 30) // anchor
  };

  var trail = {
    url: "reddotmarker.png", // url
    scaledSize: new google.maps.Size(6, 6), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(3, 3) // anchor
  };

  setInterval(function(){

    deleteMarkers();
    var centerPoint = new google.maps.LatLng(locationdata.iss_position.latitude,locationdata.iss_position.longitude);
    var marker = new google.maps.Marker({
      position: centerPoint,
      map: map,
      icon: isspic,
    });

    document.getElementById("loc").innerHTML = locationdata.iss_position.latitude + ", " + locationdata.iss_position.longitude;

    var trailer = new google.maps.Marker({
      position: centerPoint,
      map: map,
      icon: trail,
    });

    markers.push(marker);
    setMapOnAll(map);

  }, 2000);

}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}
