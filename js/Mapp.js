/* global google */

//initialisation de la map
class Mapp {

    initMap() {


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
                address: null
            }
        });

    }

    addMarkers(stations) {

        var markers = [];


        var image = {
            url: 'imgs/cycle.svg',
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 25),
            scaledSize: new google.maps.Size(50, 50)
        };


        stations.forEach((station) => {

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

            //On supprime le code Station qui n'est pas un Id unique
            var simpleName = /^\#[0-9]* ?-{1} {1}/;
            marker.title = station.name.replace(simpleName, "");
            markers.push(marker);
            marker.addListener('click', () => {
                if (station.available_bikes > 0) {
                    //map
                    map.stationSelect.name = marker.title;
                    console.log(map.stationSelect.name);
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
                            resa.showReservationForm(station);
                        }

                    });

                } else {
                    /////////////Modal////////////////////
                    $('#noBike').modal();
                    //window.location = ("./index.html");
                }
            });
        });



        //MarkerClusterer//////////////////////////////
        //option des markers regroupé
        var options = {
            imagePath: 'imgs/markerclusterer/m'
        };
        //Regroupements des marqueurs du tableau markers
        new MarkerClusterer(map, markers, options);
    }

}
