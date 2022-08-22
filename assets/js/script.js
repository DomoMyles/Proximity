var searchInput = 'search_input';
var lati = 0
var long = 0
var map;
var city;
var service;
var total;
var info = $('#new');
var uluru;
var marker;
var aux = [];
var cont = 0;
var lat;
var lng;
var icon;
var auxCont = 0;
var arrayNotEmpty;
var storedLat = JSON.parse(localStorage.getItem("storedLat"));
var storedLgn = JSON.parse(localStorage.getItem("storedLgn"));
var storedContLat;
var storedContlgn;

function init() {

    storedContLat = storedLat;
    storedContlgn = storedLgn;
    if (storedContLat != null && storedContlgn != null) {
        lati = storedContLat;
        long = storedContlgn;


        searchResultsPlace(storedContLat, storedContlgn)

    }

}
$(document).ready(function () {
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['geocode'],
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var near_place = autocomplete.getPlace();
        lati = near_place.geometry.location.lat();
        long = near_place.geometry.location.lng();

    });
});

function searchResultsPlace(la, lo) {


    city = new google.maps.LatLng(la, lo);

    map = new google.maps.Map(
        document.getElementById('map'), { center: city, zoom: 15 });

    var selectBar = $('#selectBar').val();
    var search = "";
    if (selectBar === "Bank") {
        search = "bank";
    }
    if (selectBar === "Restaurant") {
        search = "restaurant";
    }
    if (selectBar === "Theater") {
        search = "movie_theater";
    }
    if (selectBar === "Museum") {
        search = "museum";
    }
    if (selectBar === "Pharmacy") {
        search = "pharmacy";
    }
    if (selectBar === "Library") {
        search = "library";
    }
    var request = {
        location: city,
        radius: '10000',
        type: [search]
    };


    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function (results, status) {


        ///checks if the input area is clear
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            info.empty();
            showIcons(results)
            aux = [];
        }
    });
}

search_button.addEventListener('click', function () {


    city = new google.maps.LatLng(lati, long);

    map = new google.maps.Map(
        document.getElementById('map'), { center: city, zoom: 15 });

    var selectBar = $('#selectBar').val();
    var search = "";
    if (selectBar === "Bank") {
        search = "bank";
    }
    if (selectBar === "Restaurant") {
        search = "restaurant";
    }
    if (selectBar === "Theater") {
        search = "movie_theater";
    }
    if (selectBar === "Museum") {
        search = "museum";
    }
    if (selectBar === "Pharmacy") {
        search = "pharmacy";
    }
    if (selectBar === "Library") {
        search = "library";
    }
    var request = {
        location: city,
        radius: '10000',
        type: [search]
    };


    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function (results, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            info.empty();
            showIcons(results)
            aux = [];
        }


    });

})

//
function showIcons(results) {
    for (var i = 0; i < results.length; i++) {
        var request = {
            placeId: results[i].place_id,
            location: { lat: lati, lng: long },
            fields: ['name', 'rating', 'formatted_phone_number', 'geometry', 'address_components', 'opening_hours', 'rating', 'reviews', 'vicinity']
        };
        storedContLat = lati;
        storedContlgn = long;
        storedLatLgn();
        service = new google.maps.places.PlacesService(map);

        service.getDetails(request, function (newresults) {
            var total = results.length;
            if (auxCont < total - 1) {
                aux[auxCont] = newresults;
                auxCont++;
            } else {
                aux[auxCont] = newresults;
                auxCont = 0;
                arrayNotEmpty = aux.filter(function (i) {
                    return i;
                });
                for (var i = 0; i < arrayNotEmpty.length; i++) {

                    icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    lat = arrayNotEmpty[i].geometry.location.lat();
                    lng = arrayNotEmpty[i].geometry.location.lng();
                    uluru = { lat: lat, lng: lng };
                    marker = new google.maps.Marker({
                        position: uluru,
                        map: map,
                        icon: icon,
                    });
                    google.maps.event.addListener(marker, "click", (response) => {
                        var auxI;
                        for (var i = 0; i < arrayNotEmpty.length; i++) {
                            if (response.latLng.lat() === arrayNotEmpty[i].geometry.location.lat() && response.latLng.lng() === arrayNotEmpty[i].geometry.location.lng()) {
                                auxI = i;
                                icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                                lat = arrayNotEmpty[i].geometry.location.lat();
                                lng = arrayNotEmpty[i].geometry.location.lng();
                                uluru = { lat: lat, lng: lng };
                                marker = new google.maps.Marker({
                                    position: uluru,
                                    map: map,
                                    icon: icon,
                                });
                            }
                        }


                        //Put the results into display onto the screen
                        info.empty();
                        var name = $('<h4>');
                        name.className = "h1";
                        var number = $('<h5>');
                        number.className = "h5";
                        var address = $('<h6>');
                        address.className = "h4";
                        var rating = $('<h7>');
                        rating.className = "h4";
                        var hours = $('<ul>');

                        if (arrayNotEmpty[auxI].opening_hours != undefined) {
                            var liMo = $('<li>');
                            var liTu = $('<li>');
                            var liWe = $('<li>');
                            var liTh = $('<li>');
                            var liFr = $('<li>');
                            var liSa = $('<li>');
                            var liSu = $('<li>');
                            liMo.text(arrayNotEmpty[auxI].opening_hours.weekday_text[0]);
                            liTu.text(arrayNotEmpty[auxI].opening_hours.weekday_text[1]);
                            liWe.text(arrayNotEmpty[auxI].opening_hours.weekday_text[2]);
                            liTh.text(arrayNotEmpty[auxI].opening_hours.weekday_text[3]);
                            liFr.text(arrayNotEmpty[auxI].opening_hours.weekday_text[4]);
                            liSa.text(arrayNotEmpty[auxI].opening_hours.weekday_text[5]);
                            liSu.text(arrayNotEmpty[auxI].opening_hours.weekday_text[6]);
                            hours.append(liMo);
                            hours.append(liTu);
                            hours.append(liWe);
                            hours.append(liTh);
                            hours.append(liFr);
                            hours.append(liSa);
                            hours.append(liSu);
                        }


                        name.text("Name: " + arrayNotEmpty[auxI].name);
                        address.text("Address: " + arrayNotEmpty[auxI].vicinity);
                        if (arrayNotEmpty[auxI].formatted_phone_number != undefined) {
                            number.text("Cell phone: " + arrayNotEmpty[auxI].formatted_phone_number);
                        }



                        info.append(name)
                        info.append(address)
                        info.append(number)

                        info.append(hours)
                        updateMiles(response.latLng.lat(), response.latLng.lng())
                    });
                }


            }


        });

    }
    const image =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    uluru = { lat: lati, lng: long };
    marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: image,
    });


}


function updateMiles(lat, lng) {


    var origin1 = new google.maps.LatLng(lati, long);
    var destinationB = new google.maps.LatLng(lat, lng);

    service = new google.maps.DistanceMatrixService();
    request = {
        origins: [origin1],
        destinations: [destinationB],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
    };

    service.getDistanceMatrix(request, function (newresults1) {

        var miles = $('<h3>');
        var time = $('<h3>');
        miles.text("Miles: " + newresults1.rows[0].elements[0].distance.text)
        time.text("Time: " + newresults1.rows[0].elements[0].duration.text)
        info.append(miles);
        info.append(time);


    });

}

function storedLatLgn() {
    localStorage.setItem("storedLat", JSON.stringify(storedContLat));
    localStorage.setItem("storedLgn", JSON.stringify(storedContlgn));
}
init()