var reservation = {};

checkStatutReservation();



function checkStatutReservation() {
    if (sessionStorage.getItem('reservation')) {

        showFooterReservation();

    } else {

        console.log('Aucune reservation en cours');
    }

}


function initReservation() {

    //Remplace les info station par le formulaire de reservation

    $('#infoStation').css('display', 'none');
    $('#infoReservation').css('display', 'block');
    $('#name').focus();

    //Indique que le formule n'a pas été signé de base
    reservation.sign = false;
    console.log(reservation); //test

        // Bouton Reset :
    $("#reset").click(function () {
        reservation.sign = false;
    });

    $('#formReservation').submit(function (e) {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
        console.log(reservation); //test
        if (!reservation.sign) {
            /////////////Modal////////////////////
        $('#signReservation').modal();
        } else {
            //Recuperation en variable global
            reservation = {
                stationName: map.stationSelect.name,
                address: map.stationSelect.address,
                client: this.name.value + " " + this.firstname.value,
                dateReservation: new Date(),
                sign: reservation.sign,
                limit: null,
                dlcMin: null,
                dlcSec: null,
            };
            var reservation_json = JSON.stringify(reservation);
            //Stoque la reservation  dans la sessionstorage
            sessionStorage.setItem('reservation', reservation_json);
            $('#infoReservation').css('display', 'none');
            $('#map').removeClass('col s12 l8').addClass('col s12');

            showFooterReservation();
        }
        e.preventDefault(); // Annulation de l'envoi des données
    });

}


function showFooterReservation() {

    var reservation_json = sessionStorage.getItem('reservation');
    reservation = JSON.parse(reservation_json);
    //console.log(reservation);


    //Validité de la reservation
    delaiReservation();


    //Affichage info footer
    $('#noReservationFooter').css('display', 'none');

    $('#reservationFooter').css('display', 'block');
    $('#footerNomStation').text(reservation.stationName);
    $('#footerAddress').text(reservation.address);
    $('#footerClient').text(reservation.client);


    //Annuler reservation

    $('.cancelReservation').click(function () {
        //clearInterval(reservation.actualisationTps);
        expire();
        /////////////Modal////////////////////
        $('#annulReservation').modal();
        //////////////////////////////////////////////Solution temporaire:
        setTimeout(function () {
            window.location = ("./index.html");
        }, 3000);

    });

}

function delaiReservation() {
    var dateReservation = new Date(reservation.dateReservation);
    //console.log("dateReservation: " + dateReservation);

    reservation.limit = new Date(dateReservation.setMinutes(dateReservation.getMinutes() + 20)); //1 Pour test
    //console.log("reservation.limit :" + reservation.limit);
    //console.log("now: " + Date());

    var now = new Date();

    if (now <= reservation.limit) {

        if (now.getTime() < reservation.limit.getTime()) {
            console.log("Réservation valide");

            //Actualiser ttes les sec
            reservation.actualisationTps = setInterval(calcMinSec, 1000);
            //console.log(reservation); //test

        } else {
            console.log("expiré");
            //clearInterval(reservation.actualisationTps);
            expire();
            /////////////Modal////////////////////
            $('#expiReservation').modal();
            //////////////////////////////////////////////Solution temporaire:
            setTimeout(function () {
                window.location = ("./index.html");
            }, 3000);
        }

    } else {
        console.log("expiré");
        //clearInterval(reservation.actualisationTps);
        expire();
        /////////////Modal////////////////////
        $('#expiReservation').modal();
        //////////////////////////////////////////////Solution temporaire:
        setTimeout(function () {
            window.location = ("./index.html");
        }, 3000);
    }



}

function calcMinSec() {

    var now = new Date();

    if (now.getTime() < reservation.limit.getTime()) {
        console.log("Réservation valide");
        //Actualiser ttes les sec
        var dlc = (reservation.limit - new Date());
        //console.log(dlc);
        //nombre de minute(s) restante(s)
        reservation.dlcMin = parseInt(dlc / (60 * 1000));
        //console.log(reservation.dlcMin);
        //nombre de seconde(s) restante(s)
        reservation.dlcSec = parseInt(dlc % (60 * 1000) / 1000);
        //console.log(reservation.dlcSec);

        $('#footerDlcMin').text(reservation.dlcMin);
        $('#footerDlcSec').text(reservation.dlcSec);

    } else {
        console.log("expiré");
        //clearInterval(reservation.actualisationTps);
        expire();
        /////////////Modal////////////////////
        $('#expiReservation').modal();
        //////////////////////////////////////////////Solution temporaire:
        setTimeout(function () {
            window.location = ("./index.html");
        }, 3000);

    }

}



function expire() {

    clearInterval(reservation.actualisationTps);

    //reservation.actualisationTps = null;
    reservation.dlcMin = null;
    reservation.dlcSec = null;
    reservation = {};

    sessionStorage.clear();
    console.log(reservation);
    //Changement Info footer
    $('#reservationFooter').css('display', 'none');
    $('#noReservationFooter').css('display', 'block');




}
