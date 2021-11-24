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
        radius: '1500',
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

            var infowindow = new google.maps.infowindow({
                content: content
            })


        }
    }
}




    function fetchWeather (){ 
        var input= prompt("enter your city");
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + ' &units=imperial&id=524901&appid=0fe3cfd026afb76b1605f15581136ad8')
                .then(function(response) {
                     return response.json();
                 })
                .then(function(data) {
                     console.log(data);
                    
             
                })
            }

            fetchWeather();
               