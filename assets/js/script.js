var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var weatherEl = document.querySelector("#weather-container");
var cityNameEl = document.querySelector("#city-search-term");
var iconEl = document.querySelector("#icon");

const myKey = "19c8ff289c37224bc84974fe7d88ee33";
let map= null;

function initMap(){
    navigator.geolocation.getCurrentPosition(function(pos){
        location.lat = pos.coords.latitude;
        location.long = pos.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'),{

            center: {lat: location.lat, lng: location.long },
            zoom: 15
        });
        getRestaurants(location);
    });
}


function getRestaurants(location) {
    var pyrmont = new google.maps.LatLng(location.lat,location.long);
    var request = {
        location: pyrmont,
        radius: '15000',
        type: ['restaurant']
    };
service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);
}

function callback (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            console.log(results)
            var place = results[i];
            let price = createPrice(place.price_level);
            let content = `<h3>${place.name}</h3>
            <h4>${place.vicinity}</h4>
            <p>Price: ${price}<br/>
            Rating: ${place.rating}`;

            var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name
            });

            var infowindow = new google.maps.InfoWindow({
                content: content
            });

            bindInfoWindow(marker, map, infowindow, content);
            marker.setMap(map);
        }
    }
}

function bindInfoWindow(marker, map, infoWindow, html) {
    marker.addListener('click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, this);
    });
}

function createPrice(level){
    if (level != "" && level != null ){
        let out = "";
        for (var x = 0; x < level; x++){
            out += "$";
        }
    return out; 
    } else {
    return "?";
    }
}

 var formSubmit = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getWeather(city);
    }
}

var getWeather = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + myKey;
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displayWeather(data, cityName);
        })
    })
}
var displayWeather = function(weather, searchTerm) {

    weatherEl.textContent = "";

    // format date
    var date = new Date(weather['dt'] * 1000).toDateString("en-US");
    
    // show city and date
    cityNameEl.innerHTML = searchTerm + " " + date;

    // format icon
    var icon = weather['weather'][0]['icon'];
    var iconDisplay = document.createElement("img");
    iconDisplay.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");

    // temp display
    var temp = weather['main']['temp'];
    var tempDisplay = document.createElement("p");
    tempDisplay.textContent = "Temp: " + temp + "F";

    weatherEl.appendChild(iconDisplay);
    weatherEl.appendChild(tempDisplay);
}
userFormEl.addEventListener("submit", formSubmit);
