var Slider = {

    slideActif: 0,
    sliderNum: 1,
    indexSlide:0,
    
    init: function (idDivSlider, idPrevArrow, idNextArrow) {

        var idDivSlider = document.getElementById(idDivSlider);
        Slider.indexSlide = idDivSlider.querySelectorAll("img").length;


        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 39) {
                Slider.moveRight();
            } else if (e.keyCode === 37) {
                Slider.moveLeft();
            }
        });
        
        //Clic sur fleche slider
        //fleche gauche syntaxe javascript:
        var idPrevArrow = document.getElementById(idPrevArrow);
        idPrevArrow.addEventListener("click", function(){
            Slider.moveLeft();
        });
        //fleche droite syntaxe jquery:
        $('#' + idNextArrow).click(function (){
            Slider.moveRight();
        });
        
        



    },


    moveRight: function () {
        if (this.slideActif < (this.indexSlide - 1)) {
            $("#slide"+ this.sliderNum).fadeOut(500);
            this.sliderNum++;
            this.slideActif++;
            //
        } else {
            console.log("dernier slide !");
        }
    },


    moveLeft: function () {
        if (this.slideActif > 0) {
            this.sliderNum--;
            this.slideActif--;
            $("#slide" + this.sliderNum).fadeIn(500);
            
            //
        } else {
            console.log("dernier slide !!!");
        }
    }

};


var sliderElt = Object.create(Slider);
sliderElt.init("divHelp","prevArrow","nextArrow");
