/* global map */

//$(document).ready(function () { //Quand la page est chargé

var sliderElt = new Slider("divHelp", "prevArrow", "nextArrow");
var mapElt = new Mapp;

//Récupération des infos JCDecaux
$.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=fe8726ec7799c2b2674986982b9abc32e2ced05a", (datas) => {
    mapElt.addMarkers(datas);
});

var resa = new Reservation;
 //On vérifie la présence d'une réservation à la connection
 resa.checkStatutReservation();
 console.log(resa);


