/* global resa, map */

class Reservation {

    constructor() {
        this.reservation = {};
    }

    initReservation(map) {
        /*this.reservation = {
         stationName: map.stationSelect.name,
         address: map.stationSelect.address,
         client: $('#name').val() + " " + $('#firstname').val(),
         dateReservation: new Date(),
         sign: this.sign
         /*limit: null,
         dlcMin: null,
         dlcSec: null,*/

        this.reservation.stationName = map.stationSelect.name;
        this.reservation.address = map.stationSelect.address;
        this.reservation.client = $('#name').val() + " " + $('#firstname').val();
        this.reservation.dateReservation = new Date();
    }

    checkStatutReservation() {
        if (sessionStorage.getItem('reservation')) {
            this.showFooterReservation();
        } else {
            console.log('Aucune reservation en cours');
        }
    }

    //Stocage en sessionStorage
    reservationStorage() {
        var reservation_json = JSON.stringify(this.reservation);
        //Stoque la reservation  dans la sessionstorage
        sessionStorage.setItem('reservation', reservation_json);
    }

    showReservationForm(station,map) {
        //Remplace les infos station par le formulaire de reservation
        $('#infoStation').css('display', 'none');
        $('#infoReservation').css('display', 'block');
        $('#name').focus();

        //Indique que le formulaire n'a pas été signé de base
        this.reservation.sign = false;

        // Bouton Reset :
        $("#reset").click(()=> {
            this.reservation.sign = false;
        });

        $('#formReservation').submit((e)=> {
            if (!this.reservation.sign) {
                /////////////Modal////////////////////
                $('#signReservation').modal();
            } else {
                //Recuperation en variable global
                this.initReservation(map);  //station /**/**/
                console.log(this.reservation);

                this.reservationStorage();

                $('#infoReservation').css('display', 'none');
                $('#map').removeClass('col s12 l8').addClass('col s12');

                this.showFooterReservation();
            }
            e.preventDefault(); // Annulation de l'envoi des données
        });
    }

    showFooterReservation() {

        console.log(this.reservation); //test
        var reservation_json = sessionStorage.getItem('reservation');
        this.reservation = JSON.parse(reservation_json);

        //Validité de la reservation
        this.delaiReservation();

        //Affichage info footer
        $('#noReservationFooter').css('display', 'none');

        $('#reservationFooter').css('display', 'block');
        $('#footerNomStation').text(this.reservation.stationName);
        $('#footerAddress').text(this.reservation.address);
        $('#footerClient').text(this.reservation.client);


        //Annuler reservation
        $('.cancelReservation').click(()=> {
            console.log(this.reservation); //test
            console.log(this); //test
            resa.expire();
            /////////////Modal////////////////////
            $('#annulReservation').modal();
            ////////////////////////////////////////Redirection:
            setTimeout(function () {
                window.location = ("./index.html");
            }, 2000);

        });

    }

    delaiReservation() {
        var dateReservation = new Date(this.reservation.dateReservation);
        this.reservation.limit = new Date(dateReservation.setMinutes(dateReservation.getMinutes() + 20)); //1 Pour test
        var now = new Date();



        if (now <= this.reservation.limit) {

            if (now.getTime() < this.reservation.limit.getTime()) {
                console.log("Réservation valide");
                console.log(this.reservation);
                //Actualiser ttes les sec

                this.reservation.actualisationTps = setInterval(() => {
                    console.log(this);
                    var now = new Date();

                    if (now.getTime() < this.reservation.limit.getTime()) {
                        //*console.log("Réservation valide");
                        var dlc = (this.reservation.limit - new Date());
                        //nombre de minute(s) restante(s)
                        this.reservation.dlcMin = parseInt(dlc / (60 * 1000));
                        //nombre de seconde(s) restante(s)
                        this.reservation.dlcSec = parseInt(dlc % (60 * 1000) / 1000);

                        $('#footerDlcMin').text(this.reservation.dlcMin);
                        $('#footerDlcSec').text(this.reservation.dlcSec);

                    } else {
                        console.log("expiré");
                        resa.expire();
                        /////////////Modal////////////////////
                        $('#expiReservation').modal();
                        //////////////////////////////////////////////Solution temporaire:
                        setTimeout(function () {
                            window.location = ("./index.html");
                        }, 2000);

                    }

                }, 1000);
            } else {
                console.log("expiré");
                console.log(this.reservation); //test
                console.log(this); //test
                this.expire();
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
            resa.expire();
            /////////////Modal////////////////////
            $('#expiReservation').modal();
            //////////////////////////////////////////////Solution temporaire:
            setTimeout(function () {
                window.location = ("./index.html");
            }, 2000);
        }



    }

    // probleme portee this
    calcMinSec() {
        console.log(this);
        var now = new Date();

        if (now.getTime() < this.reservation.limit.getTime()) {
            //console.log("Réservation valide");
            var dlc = (this.reservation.limit - new Date());
            //nombre de minute(s) restante(s)
            this.reservation.dlcMin = parseInt(dlc / (60 * 1000));
            //nombre de seconde(s) restante(s)
            this.reservation.dlcSec = parseInt(dlc % (60 * 1000) / 1000);

            $('#footerDlcMin').text(this.reservation.dlcMin);
            $('#footerDlcSec').text(this.reservation.dlcSec);

        } else {
            console.log("expiré");
            resa.expire();
            /////////////Modal////////////////////
            $('#expiReservation').modal();
            //////////////////////////////////////////////Solution temporaire:
            setTimeout(function () {
                window.location = ("./index.html");
            }, 2000);

        }

    }

    //Supprimer la réservation
    expire() {

        console.log(this.reservation); //test
        console.log(this.reservation); //test

        clearInterval(this.reservation.actualisationTps);
        this.reservation = {};

        sessionStorage.clear();
        console.log(this.reservation);
        console.log(this.reservation);
        //Changement Info footer
        $('#reservationFooter').css('display', 'none');
        $('#noReservationFooter').css('display', 'block');
    }

}
