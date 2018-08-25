
class Reservation {

    constructor() {
        this.reservation = {};
    }

    initReservation(map) {
        
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

        //Indique que le formulaire n'a pas Ã©tÃ© signÃ© de base
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
                this.initReservation(map);  //station 
                this.reservationStorage();

                $('#infoReservation').css('display', 'none');
                $('#map').removeClass('col s12 l8').addClass('col s12');

                this.showFooterReservation();
            }
            e.preventDefault(); // Annulation de l'envoi des donnÃ©es
        });
    }

    showFooterReservation() {
        
        var reservation_json = sessionStorage.getItem('reservation');
        this.reservation = JSON.parse(reservation_json);

        //ValiditÃ© de la reservation
        this.delaiReservation();

        //Affichage info footer
        $('#noReservationFooter').css('display', 'none');

        $('#reservationFooter').css('display', 'block');
        $('#footerNomStation').text(this.reservation.stationName);
        $('#footerAddress').text(this.reservation.address);
        $('#footerClient').text(this.reservation.client);


        //Annuler reservation
        $('.cancelReservation').click(()=> {

            this.expire();
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
                
                //Actualiser ttes les sec
                this.reservation.actualisationTps = setInterval(() => {
                    console.log(this);
                    var now = new Date();

                    if (now.getTime() < this.reservation.limit.getTime()) {
                        var dlc = (this.reservation.limit - new Date());
                        //nombre de minute(s) restante(s)
                        this.reservation.dlcMin = parseInt(dlc / (60 * 1000));
                        //nombre de seconde(s) restante(s)
                        this.reservation.dlcSec = parseInt(dlc % (60 * 1000) / 1000);

                        $('#footerDlcMin').text(this.reservation.dlcMin);
                        $('#footerDlcSec').text(this.reservation.dlcSec);

                    } else {
                        console.log("expiré");
                        this.expire();
                        /////////////Modal////////////////////
                        $('#expiReservation').modal();
                        //////////////////////////////////////////////Solution temporaire:
                        setTimeout(function () {
                            window.location = ("./index.html");
                        }, 2000);

                    }

                }, 1000);
            } else {
                console.log("expirÃ©");
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
            this.expire();
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
        var now = new Date();

        if (now.getTime() < this.reservation.limit.getTime()) {
            //console.log("RÃ©servation valide");
            var dlc = (this.reservation.limit - new Date());
            //nombre de minute(s) restante(s)
            this.reservation.dlcMin = parseInt(dlc / (60 * 1000));
            //nombre de seconde(s) restante(s)
            this.reservation.dlcSec = parseInt(dlc % (60 * 1000) / 1000);

            $('#footerDlcMin').text(this.reservation.dlcMin);
            $('#footerDlcSec').text(this.reservation.dlcSec);

        } else {
            console.log("expirÃ©");
            this.expire();
            /////////////Modal////////////////////
            $('#expiReservation').modal();
            //////////////////////////////////////////////Solution temporaire:
            setTimeout(function () {
                window.location = ("./index.html");
            }, 2000);

        }

    }

    //Supprimer la rÃ©servation
    expire() {
        clearInterval(this.reservation.actualisationTps);
        this.reservation = {};
        sessionStorage.clear();
        //Changement Info footer
        $('#reservationFooter').css('display', 'none');
        $('#noReservationFooter').css('display', 'block');
    }

}
