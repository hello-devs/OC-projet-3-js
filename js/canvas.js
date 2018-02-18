//Le canevas sera utilisé dans un contexte 2 dimensions

//function ecouteCanvas () {


$(document).ready(function () { //Quand la page est chargé

    // Variables :
    var painting = false;
    var started = false;
    var canvas = $('#signature');
    var cursorX, cursorY;

    var context = canvas[0].getContext('2d');

    // Trait arrondi :
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // Click souris enfoncé sur le canvas, je dessine :
    canvas.mousedown(function moveStart(e) {
        painting = true;


        // Coordonnées de la souris :
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
    });
    ////////////////////////////////////////
    //touch ecran mobile
    //canvas.bind('touchstart', moveStart(e));


    // Relachement du Click sur tout le document, j'arrête de dessiner :
    $(this).mouseup(function moveEnd() {
        painting = false;
        started = false;
    });
    ///////////////////////////////////////////
    //retire doigt ecran mobile
    //$(this).bind('touchend', moveEnd);


    // Mouvement de la souris sur le canvas :
    canvas.mousemove(function move(e) {
        // Si je suis en train de dessiner (click souris enfoncé) :
        if (painting) {
            // Set Coordonnées de la souris :
            cursorX = (e.pageX - this.offsetLeft) - 5; // 5 = décalage du curseur
            cursorY = (e.pageY - this.offsetTop) - 5;

            // Dessine une ligne :
            drawLine();
        }
    });

    ////////////////////////////////////////////////////////////////////
    //Mvnt doigt sur ecran
    //canvas.bind('touchmove', move(e));


    // Fonction qui dessine une ligne :
    function drawLine() {
        // Si c'est le début, j'initialise
        if (!started) {
            // Je place mon curseur pour la première fois :
            context.beginPath();
            context.moveTo(cursorX, cursorY);
            started = true;
            reservation.sign = true;
            console.log(reservation); //test
        }
        // Sinon je dessine
        else {
            context.lineTo(cursorX, cursorY);
            context.strokeStyle = '#000';
            context.lineWidth = 2;
            context.stroke();
        }
    }

    // Clear du Canvas :
    function clear_canvas() {
        context.clearRect(0, 0, canvas.width(), canvas.height());
    }


    // Bouton Reset :
    $("#reset").click(function () {
        clear_canvas();
    });

    // Bouton Save :
    $('#formReservation').submit(function () {
        /*sauvegarde image a voir
        var canvas_tmp = document.getElementById("signature");
        window.location = canvas_tmp.toDataURL("imgs/canvas/png");
        */
        clear_canvas();
    });

});

//}
