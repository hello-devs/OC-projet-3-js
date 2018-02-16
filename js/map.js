//initialisation de la map
var map;

function initMap() {





    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.760500,
            lng: 4.84765
        },
        zoom: 12,
        minZoom: 10,
        //mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        //animation: google.maps.Animation.DROP,


        //Select
        stationSelect: {
            name: null,
            address: null,
        },


    });




    //Get Marqueur JCDECAUX
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=fe8726ec7799c2b2674986982b9abc32e2ced05a", function (reponse) {

        var stations = JSON.parse(reponse);
        var markers = [];
        var image = {
            url: 'imgs/cycle.svg',
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 25),
            scaledSize: new google.maps.Size(50, 50)
        };


        stations.forEach(function (station) {

            var marker = new google.maps.Marker({
                position: station.position,
                title: station.name,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: image
            });

            if (station.available_bikes < 1) {
                marker.icon.url = 'imgs/no-cycle.svg';
            }

            if (station.status === "OPEN") {
                station.status = "Ouverte";
            } else if (station.status === "CLOSED") {
                station.status = "Fermée";
            }

            var simpleName = /^[0-9]* {1}-{1} {1}/;
            station.name = station.name.replace(simpleName, "");


            function showStationInfos() {
                //map
                map.stationSelect.name = station.name;
                map.stationSelect.address = station.address;

                //aside
                $('#infoReservation').css('display', 'none');
                //$('#infoStation').remove();

                $('#map').removeClass('col s12').addClass('col s12 l8');

                $('#infoStation').css('display', 'block');

                $('#stationName').text(station.name);
                $('#statusStation').text(station.status);
                $('#indicAdress').text(station.address);
                $('#availableBike').text(station.available_bikes);

                //Reservation
                $('#btnSelect').click(function () {
                    if (sessionStorage.getItem('reservation')) {

                        /////////////Modal////////////////////
                        $('#gotReservation').modal();

                    } else {
                        initReservation();
                    }

                });







            }

            marker.addListener('click', showStationInfos);

            markers.push(marker);

        });

        var options = {
            imagePath: 'imgs/markerclusterer/m'
        };

        //Regroupements des marqueurs du tableau markers
        var markerCluster = new MarkerClusterer(map, markers, options);

    });

}
