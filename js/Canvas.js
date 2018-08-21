/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



class Canvas
{
    /**
     * 
     * @returns {Canvas}
     */
    constructor(reservation)
    {
        this.reservation = reservation;
        this.painting = false;
        this.started = false;
        this.canvas = $('#signature');
        this.cursorX;
        this.cursorY;
        this.context = this.canvas[0].getContext('2d');
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';

        /*Events*/
        this.canvas.mousedown(this.moveStart.bind(this));
        this.canvas[0].addEventListener('touchstart', this.moveStart.bind(this));

        this.canvas.mouseup(this.moveEnd.bind(this));
        this.canvas[0].addEventListener('touchend', this.moveEnd.bind(this));

        this.canvas.mousemove(this.move.bind(this));
        this.canvas[0].addEventListener('touchmove', this.move.bind(this));


        $("#reset").click(() => {
            this.clear_canvas();
        });

        // Bouton Save :
        $('#formReservation').submit(() => {
            /*sauvegarde image a travailler
             var canvas_tmp = document.getElementById("signature");
             window.location = canvas_tmp.toDataURL("imgs/canvas/png");
             */
            this.clear_canvas();
        });
    }

    /**
     * @description Début du dessin au clic sur le canvas
     * @param {event} e
     * @returns {undefined}
     */
    moveStart(e)
    {
        console.log(e);
        this.painting = true;

        if (e.changedTouches)
        {
            console.log('touché');
            var pageX = e.changedTouches[0].pageX;
            var pageY = e.changedTouches[0].pageY;
            e.preventDefault();
        } else
        {
            var pageX = e.pageX;
            var pageY = e.pageY;
        }

        // Coordonnées de la souris :
        this.cursorX = (pageX - e.currentTarget.offsetLeft);
        this.cursorY = (pageY - e.currentTarget.offsetTop);
    }

    /**
     * @description Au relachement de la souris le dessin stop
     * @returns {undefined}
     */
    moveEnd()
    {
        this.painting = false;
        this.started = false;
    }

    /**
     * @description Ecrit lors du mouvement si ecriture activée
     * @param {type} e
     * @returns {undefined}
     */
    move(e)
    {
        // Si je suis en train de dessiner (click souris enfoncé) :
        if (this.painting)
        {
            if (e.changedTouches)
            {
                console.log('touché');
                var pageX = e.changedTouches[0].pageX;
                var pageY = e.changedTouches[0].pageY;
                e.preventDefault();
            } else
            {
                var pageX = e.pageX;
                var pageY = e.pageY;
            }

            // Set Coordonnées de la souris :
            this.cursorX = (pageX - e.currentTarget.offsetLeft) - 5; // 5 = décalage du curseur
            this.cursorY = (pageY - e.currentTarget.offsetTop) - 5;

            // Dessine une ligne :
            this.drawLine();
            //console.log(this.cursorX,this.cursorY,);
        }
    }

    /**
     * Dessine sur le canvas
     * @returns {undefined}
     */
    drawLine()
    {
        //console.log(this.cursorX,this.cursorY,);
        // Si c'est le début, j'initialise
        if (!this.started) {
            // Je place mon curseur pour la première fois :
            this.context.beginPath();
            this.context.moveTo(this.cursorX, this.cursorY);
            this.started = true;
            this.reservation.reservation.sign = true;
        }
        // Sinon je dessine
        else
        {
            this.context.lineTo(this.cursorX, this.cursorY);
            this.context.strokeStyle = '#000';
            this.context.lineWidth = 2;
            this.context.stroke();
        }
    }

    clear_canvas()
    {
        this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
    }
}