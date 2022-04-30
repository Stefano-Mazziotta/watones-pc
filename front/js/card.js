import anime from './node_modules/animejs/lib/anime.es.js';

const ELEM_cardShadow = document.getElementById('card-shadow--js');
const ELEM_cardInfoWrap = document.getElementById('card__info-wrap--js'); 
const ELEM_cardTitleWrap = document.getElementById('card__title-wrap--js');
const ELEM_cardSwipeUp = document.getElementById('swipe-up--js');
const ELEM_percentageStat = document.getElementById('percentage-stat--js');

const pibeTest = {
    percentageStat: 80
}

class Card{

    constructor(){
        this.styles = {
            shadowImg: "rgba(0,0,0,.6)",
            rotateSwipeArrow: "0deg",
            heightWrapStats: 0,
            percentageStat: 0,          
        }   
    }
    
    // ========== gets of card ========== //
    get actualHeight() {
        return this.calc_actual_height;
    }
    
    // ========== methods of card ========== //
    calc_actual_height(){
       return ELEM_cardInfoWrap.clientHeight;
    }

    expand_card(){    
        this.styles.heightWrapStats = 50;
        
        this.turn_shadow(false);
        this.swipe_arrow_toUP(false);
        this.load_stat(pibeTest.percentageStat);
        anime({
            targets: ELEM_cardInfoWrap,
            height: this.styles.heightWrapStats,
            duration: 1000,
            easing: 'easeInOutQuad'
        });
    }

    reduce_card(){
        this.styles.heightWrapStats = 0;
            
        this.turn_shadow(true);
        this.swipe_arrow_toUP(true);     
        this.load_stat(0);  
        anime({
            targets: ELEM_cardInfoWrap,
            height: this.styles.heightWrapStats,
            duration: 1000,
            easing: 'easeInOutQuad'
        });        
    }

    turn_shadow(isON){
        this.styles.shadowImg = "rgba(0,0,0,.6)";
        if(isON){
        	this.styles.shadowImg = "rgba(0,0,0,.4)";    
        }
        anime({
            targets: ELEM_cardShadow,
            backgroundColor: this.styles.shadowImg,
            duration: 1000,
            easing: 'easeInQuad'
        });                    
    }
    
    swipe_arrow_toUP(toUP){
        
        this.styles.rotateSwipeArrow = "180deg";
        if(toUP){
            this.styles.rotateSwipeArrow = "0deg";
        }
        anime({
            targets: ELEM_cardSwipeUp,
            rotateX: this.styles.rotateSwipeArrow,
            duration: 1000,
            easing: 'easeInQuad',
            loop: false   
        });       
    }

    load_stat(percentage){
        if(percentage >= 0 || percentage <= 100){

            anime({
                targets: ELEM_percentageStat,
                width: percentage,
                delay: 250,
                duration: 2500,
                easing: 'easeOutElastic(1,.9)'
            });
        }
    }
}

// -------- events --------- //
window.addEventListener('load', ()=>{
    let card = new Card;

    ELEM_cardTitleWrap.addEventListener('click', () => {

        if(card.actualHeight() == 0){
            card.expand_card();
        }
        if(card.actualHeight() == 50){
            card.reduce_card();
        }
    });
});

