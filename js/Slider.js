class Slider {

    constructor(idDivSlider, idPrevArrow, idNextArrow) {
        this.slideActif = 0;
        this.sliderNum = 1;
        this.idDivSlider = document.getElementById(idDivSlider);
        this.indexSlide = this.idDivSlider.querySelectorAll("img").length;


        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 39) {
                this.moveRight();
            } else if (e.keyCode === 37) {
                this.moveLeft();
            }
        });

        //Clic sur fleche slider
        //fleche gauche syntaxe javascript:
        var idPrevArrow = document.getElementById(idPrevArrow);
        idPrevArrow.addEventListener("click", () => {
            this.moveLeft();
        });
        //fleche droite syntaxe jquery:
        $('#' + idNextArrow).click(() => {
            this.moveRight();
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
