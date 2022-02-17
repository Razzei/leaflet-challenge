// Creating the map object
var myMap = L.map("map", {
    center: [36.0522, -118.2437],
    zoom: 5
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
// Load the GeoJSON data.
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let geojson;

function color(depth) {
    if (depth > 90) {
        return '#f54242'
    } else if (depth > 70) {
        return '#f56f42'
    } else if (depth > 50) {
        return '#f59642'
    } else if (depth > 30) {
        return '#f5c542'
    } else if (depth > 10) {
        return '#f5f542'
    } else {
        return '#a7f542'
    }
}

// Get the data with d3.
d3.json(geoData).then(function(data) {
    earthquakes = data.features
      
    earthquakes.forEach(function(earthquake){
        var magnitude = earthquake.properties.mag
        var location = earthquake.geometry.coordinates

        L.circle([location[1],location[0]], {
            color: "black",
            fillColor: color(location[3]),
            fillOpacity: .75,
            radius: magnitude * 10000,
            // stroke: false
        }).addTo(myMap);

    })
})

var legend = L.control({position: "bottomright",});
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    var depth = [9, 29, 49, 69, 89, 99];
    var labels = ["<10", "10-30", "30-50", "50-70", "70-90", "90+"];

    for (var i = 0; i < depth.length; i++){
        div.innerHTML += '<i style="background:' + color(depth[i]) + '">&nbsp;&nbsp;&nbsp;&nbsp;</i>&nbsp;'+ labels[i] + '<br>';
    }
    return div;
};
    
legend.addTo(myMap);
