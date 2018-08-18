/******************************************Fichier test***********************************/
/*
 * 
 * Pas d'utilisation
 */
/* global google, map, listMarkers */

class Station
{
    
    constructor(JcDecauxData,id)
    {
        this.id = id;
        //Réecrire le nom de la station sans l'id.
        const simpleName = /^\#[0-9]* ?-{1} {1}/;
        this.name = JcDecauxData.name.replace(simpleName, "");
        this.available_bikes = JcDecauxData.available_bikes;
        this.address = JcDecauxData.address;
        this.position = JcDecauxData.position;
        //Définition status
        if (JcDecauxData.status === "OPEN")
        {
            this.status = "Ouverte";
        } 
            else if (JcDecauxData.status === "CLOSED")
        {
            this.status = "Fermée";
        }
        this.status = JcDecauxData.status;
        ////////////////////////////////////////////////////////////////////////
        this.createMarker();
    }
    
    createMarker()
    {
        var image = {
            url: 'imgs/cycle.svg',
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 25),
            scaledSize: new google.maps.Size(50, 50)
        };
        this.marker = new google.maps.Marker({
            position: this.position,
            title: this.name,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: image
        });

        this.marker.addListener('click', this.showStationInfos);
        
        listMarkers.push(this.marker);
    }

    showStationInfos()
    {
        console.log(this);
        if (this.available_bikes > 0) {
            //map
            /*this.map.stationSelect.name = station.name;
             console.log(this.map.stationSelect.name);
             this.map.stationSelect.address = station.address;
             */

            //aside
            $('#infoReservation').css('display', 'none');
            //$('#infoStation').remove();

            $('#map').removeClass('col s12').addClass('col s12 l8');

            $('#infoStation').css('display', 'block');

            $('#stationName').text(this.name);
            $('#statusStation').text(this.status);
            $('#indicAdress').text(this.address);
            $('#availableBike').text(this.available_bikes);

        } else {
            /////////////Modal////////////////////
            $('#noBike').modal();
            //window.location = ("./index.html");
        }


        //Selection Reservation
        $('#btnSelect').click(function () {
            if (sessionStorage.getItem('reservation')) {
                /////////////Modal////////////////////
                $('#gotReservation').modal();
            } else {
                /*reservation.showReservationForm();*/
                this.showReservationForm();
            }
        });

    }
}
