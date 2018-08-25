/* global google */

/**
 * @argument {id} idDivMap 
 * @argument {Object Reservation} reservation 
 * @description Class d'instanciation de Carte google Maps avec markers Vélov
 * @type type
 */
class Map {

    constructor(idDivMap, reservation) {
        this.map = new google.maps.Map(document.getElementById(idDivMap), {
            center: {lat: 45.760500, lng: 4.84765},
            zoom: 12,
            minZoom: 10,
            scrollwheel: false,
            stationSelect: {name: null, address: null}
        });
        this.reservation = reservation;
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
                map: this.map,
                animation: google.maps.Animation.DROP,
                icon: image
            });

            //On supprime le code Station qui n'est pas un Id unique
            var simpleName = /^\#[0-9]* ?-{1} {1}/;
            marker.title = station.name.replace(simpleName, "");

            //Reservation en cours icone rouge si plus de vélo
            if (sessionStorage.getItem('reservation'))
            {
                console.log('une reservation en cours');
                if (this.reservation.reservation.stationName === marker.title)
                {
                    console.log('meme station');
                    if (station.available_bikes === 1)
                    {
                        marker.icon.url = 'imgs/no-cycle.svg';
                    }
                }
            }

            if (station.available_bikes < 1)
            {
                marker.icon.url = 'imgs/no-cycle.svg';
            }

            if (station.status === "OPEN") {
                station.status = "Ouverte";
            } else if (station.status === "CLOSED") {
                station.status = "Fermée";
            }

            markers.push(marker);
            marker.addListener('click', () => {
                if (station.available_bikes > 0) {
                    //map
                    this.map.stationSelect.name = marker.title;
                    this.map.stationSelect.address = station.address;


                    //aside
                    $('#infoReservation').css('display', 'none');
                    //$('#infoStation').remove();

                    $('#map').removeClass('col s12').addClass('col s12 l8');

                    $('#infoStation').css('display', 'block');

                    $('#stationName').text(marker.title);
                    $('#statusStation').text(station.status);
                    $('#indicAdress').text(station.address);

                    //*
                    //Reservation en cours -1 vélo
                    if (sessionStorage.getItem('reservation'))
                    {
                        console.log('une reservation en cours');
                        if (this.reservation.reservation.stationName === this.map.stationSelect.name)
                        {
                            console.log('meme station');
                            station.available_bikes = station.available_bikes - 1;
                        } else
                        {
                            console.log('station differente');
                        }
                    }
                    //*/          

                    $('#availableBike').text(station.available_bikes);

                    //Reservation
                    $('#btnSelect').click(() => {

                        if (sessionStorage.getItem('reservation')) {

                            /////////////Modal////////////////////
                            $('#gotReservation').modal();

                        } else {
                            this.reservation.showReservationForm(station, this.map);
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
        new MarkerClusterer(this.map, markers, options);
    }

}
