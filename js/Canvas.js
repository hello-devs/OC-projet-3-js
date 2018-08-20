/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global resa */

class Canvas
{
    /**
     * 
     * @returns {Canvas}
     */
    constructor()
    {
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


        this.canvas.mouseup(this.moveEnd.bind(this));


        this.canvas.mousemove(this.move.bind(this));
        


        $("#reset").click(() => {
            this.clear_canvas();
        });

        // Bouton Save :
        $('#formReservation').submit(() => {
            /*sauvegarde image a voir
             var canvas_tmp = document.getElementById("signature");
             window.location = canvas_tmp.toDataURL("imgs/canvas/png");
             */
            this.clear_canvas();
        });

        console.log(this);
    }

    /**
     * @description Début du dessin au clic sur le canvas
     * @param {type} e
     * @returns {undefined}
     */
    moveStart(e)
    {
        this.painting = true;
        // Coordonnées de la souris :
        this.cursorX = (e.pageX - e.currentTarget.offsetLeft);
        this.cursorY = (e.pageY - e.currentTarget.offsetTop);
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
            // Set Coordonnées de la souris :
            this.cursorX = (e.pageX - e.currentTarget.offsetLeft) - 5; // 5 = décalage du curseur
            this.cursorY = (e.pageY - e.currentTarget.offsetTop) - 5;

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
            resa.reservation.sign = true;
            console.log(resa); //test
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