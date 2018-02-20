var reservation = {};

//On vérifie la présence d'une réservation à la connection
checkStatutReservation();

//
function initReservation() {
    reservation = {
        stationName: map.stationSelect.name,
        address: map.stationSelect.address,
        client: $('#name').val() + " " + $('#firstname').val(),
        dateReservation: new Date(),
        sign: this.sign,
        /*limit: null,
        dlcMin: null,
        dlcSec: null,*/
    };
}


function checkStatutReservation() {
    if (sessionStorage.getItem('reservation')) {
        showFooterReservation();
    } else {
        console.log('Aucune reservation en cours');
    }
}

//Stocage en sessionStorage
function reservationStorage() {
    var reservation_json = JSON.stringify(reservation);
    //Stoque la reservation  dans la sessionstorage
    sessionStorage.setItem('reservation', reservation_json);
}

function showReservationForm() {
    //Remplace les infos station par le formulaire de reservation
    $('#infoStation').css('display', 'none');
    $('#infoReservation').css('display', 'block');
    $('#name').focus();

    //Indique que le formulaire n'a pas été signé de base
    reservation.sign = false;

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
            initReservation();

            reservationStorage();

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
        ////////////////////////////////////////Solution temporaire:
        setTimeout(function () {
            window.location = ("./index.html");
        }, 2000);


    });

}

function delaiReservation() {
    var dateReservation = new Date(reservation.dateReservation);
    reservation.limit = new Date(dateReservation.setMinutes(dateReservation.getMinutes() + 20)); //1 Pour test
    var now = new Date();

    if (now <= reservation.limit) {

        if (now.getTime() < reservation.limit.getTime()) {
            console.log("Réservation valide");
            //Actualiser ttes les sec
            reservation.actualisationTps = setInterval(calcMinSec, 1000);
        } else {
            console.log("expiré");
            expire();
            /////////////Modal////////////////////
            $('#expiReservation').modal();
            //////////////////////////////////////////////Solution temporaire:
            setTimeout(function () {
                window.location = ("./index.html");
            }, 2000);
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
        }, 2000);
    }



}

function calcMinSec() {

    var now = new Date();

    if (now.getTime() < reservation.limit.getTime()) {
        console.log("Réservation valide");
        var dlc = (reservation.limit - new Date());
        //nombre de minute(s) restante(s)
        reservation.dlcMin = parseInt(dlc / (60 * 1000));
        //nombre de seconde(s) restante(s)
        reservation.dlcSec = parseInt(dlc % (60 * 1000) / 1000);

        $('#footerDlcMin').text(reservation.dlcMin);
        $('#footerDlcSec').text(reservation.dlcSec);

    } else {
        console.log("expiré");
        expire();
        /////////////Modal////////////////////
        $('#expiReservation').modal();
        //////////////////////////////////////////////Solution temporaire:
        setTimeout(function () {
            window.location = ("./index.html");
        }, 2000);

    }

}


//supprimer la reservation
function expire() {

    clearInterval(reservation.actualisationTps);
    reservation = {};


    sessionStorage.clear();
    console.log(reservation);
    //Changement Info footer
    $('#reservationFooter').css('display', 'none');
    $('#noReservationFooter').css('display', 'block');
}
