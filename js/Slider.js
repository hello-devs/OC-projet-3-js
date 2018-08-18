/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Slider {



    constructor(idDivSlider, idPrevArrow, idNextArrow) {
        var self = this;
        this.slideActif = 0;
        this.sliderNum = 1;
        var idDivSlider = document.getElementById(idDivSlider);
        this.indexSlide = idDivSlider.querySelectorAll("img").length;


        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 39) {
                self.moveRight();
            } else if (e.keyCode === 37) {
                self.moveLeft();
            }
        });

        //Clic sur fleche slider
        //fleche gauche syntaxe javascript:
        var idPrevArrow = document.getElementById(idPrevArrow);
        idPrevArrow.addEventListener("click", function () {
            self.moveLeft();
        });
        //fleche droite syntaxe jquery:
        $('#' + idNextArrow).click(function () {
            self.moveRight();
        });

    }

    moveRight() {
        if (this.slideActif < (this.indexSlide - 1)) {
            $("#slide" + this.sliderNum).fadeOut(500);
            this.sliderNum++;
            this.slideActif++;
            //
        } else {
            console.log("dernier slide !");
        }
    }

    moveLeft() {
        if (this.slideActif > 0) {
            this.sliderNum--;
            this.slideActif--;
            $("#slide" + this.sliderNum).fadeIn(500);

            //
        } else {
            console.log("dernier slide !!!");
        }
    }

}

