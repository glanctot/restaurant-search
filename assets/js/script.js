var userFormEl = document.querySelector("#user-form");
var listEl = document.querySelector("#restaurantInfo");
var weatherEl = document.querySelector("#weather-container");
var cityNameEl = document.querySelector("#city-search-term");
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
            console.log(results);

            var place = results[i]['name'];

            // var address = results[i]['vicinity'];
            // var price = results[i]['price_level'];
            // var rating = results[i]['rating'];
            
            var restaurantList = document.createElement("li");
            restaurantList.classList = "list-item";
            restaurantList.textContent = place;
            listEl.appendChild(restaurantList);

            
            var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name
            });

            var infowindow = new google.maps.infowindow({
                content: content
            })
        }
    }
}

 /* var formSubmit = function(event) {
    event.preventDefault();

    var city = cityInputEl.ariaValueMax.trim();

    if (city) {
        getWeather(city);
    }

var getWeather = function (cityName) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=minneapolis&units=imperial&appid=" + myKey;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, cityName);
        })
    })
}

var displayWeather = function(weather, searchTerm) {
    var date = new Date(weather['dt'] * 1000).toDateString("en-US");

    var icon = weather['weather'][0]['icon'];
    var iconDisplay = document.createElement("img");
    iconDisplay.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");

    cityNameEl.innerHTML = searchTerm + " " + date;
}

userFormEl.addEventListener("submit", formSubmit); */