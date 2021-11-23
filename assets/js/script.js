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

var input = document.querySelector("#input");
var submit =document.querySelector(".submit-btn");

var fetch = function(){
    const documentURL = {
        async: true,
        crossDomain : true,
        url : "https://documenu.p.rapidapi.com/restaurants/zip_code/90210?size=30&cuisine=Italian&top_cuisines=true&page=2",
        method: "GET",
        headers: {
            "x-api-key": "0593ad15e97663e5746f2064f3591196",
            "x-rapidapi-host": "documenu.p.rapidapi.com",
            "x-rapidapi-key": "baabfa2ab5msh21ce5891da5aaecp1faef3jsn54381f0e345b"
        }
    };
    
    $.ajax(documentURL).done(function (response) {
        console.log(response.data);
    });

}
submit.addEventListener('click',fetch)


