function initGoogle() {
    var location = {
        lat: 40.000,
        lng: -79.000
    }
    var options = {
        center: location,
        zoom: 9
    } 
    if(navigator.geolocation) {
        console.log("geolocation is here!");
    
        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;

            map = new google.maps.Map(document.getElementById("map"), options);
        },
        (err) => {
            console.log("User clicked no");
            map = new google.maps.Map(document.getElementById("map"), options);
        }
        )
    }else {
        console.log("geolocation not supported :(");
        map = new google.maps.Map(document.getElementById("map"), options);
    }

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("input"),
    {
        componentResstrictions: {'country': ['us']},
        feilds: ['geometry', 'name'],
        types: ['establishment']
    })

    autocomplete.addListener("place_changed", () => {
        var place = autocomplete.getPlace();
        new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            map: map

        })
    })


}