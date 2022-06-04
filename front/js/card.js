import anime from './node_modules/animejs/lib/anime.es.js';

const ELEM_cardShadow = document.getElementById('card-shadow--js');
const ELEM_cardInfoWrap = document.getElementById('card__info-wrap--js'); 
const ELEM_cardTitleWrap = document.getElementById('card__title-wrap--js');
const ELEM_cardSwipeUp = document.getElementById('swipe-up--js');
const ELEM_percentageStat = document.getElementById('percentage-stat--js');

class Card{

    constructor(){
        this.styles = {
            shadowImg: "rgba(0,0,0,.6)",
            rotateSwipeArrow: "0deg",
            heightWrapStats: 0,
            percentageStat: 0,          
        }   
        this.pibes = [];
    }
    
    // ========== gets of card ========== //
    get actualHeight() {
        return this.calc_actual_height;
    }
    
    // ========== methods of card ========== //
    calc_actual_height(){
       return ELEM_cardInfoWrap.clientHeight;
    }

    turn_shadow(isON){
        this.styles.shadowImg = "rgba(0,0,0,.4)";
        if(isON){
        	this.styles.shadowImg = "rgba(0,0,0,.6)";    
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
            delay: 1500,
            duration: 1000,
            easing: 'easeInQuad',
            loop: false   
        });       
    }

    load_stat(percentage,delay){
        if(percentage >= 0 || percentage <= 100){

            anime({
                targets: ELEM_percentageStat,
                width: `${percentage}%`,
                delay: delay,
                duration: 2500,
                // easing: 'easeOutElastic(1,.9)'
                easing: 'easeInOutQuad',
                // easing: 'easeInQuad'
            });
        }
    }

    expand_card(){    
        this.styles.heightWrapStats = 50;
        
        this.turn_shadow(false);
        this.swipe_arrow_toUP(false);
        this.load_stat(50,1500);
        anime({
            targets: ELEM_cardInfoWrap,
            height: this.styles.heightWrapStats,
            delay: 1500,
            duration: 1000,
            easing: 'easeInOutQuad'
        });
    }

    reduce_card(){
        this.styles.heightWrapStats = 0;

        this.turn_shadow(true);
        this.swipe_arrow_toUP(true);     
        this.load_stat(0,0);  
        anime({
            targets: ELEM_cardInfoWrap,
            height: this.styles.heightWrapStats,
            delay: 1500,
            duration: 1000,
            easing: 'easeInOutQuad'
        });        
    }

    /*
    <div class="card">
        <div class="card__img">
            <div id="card-shadow--js" class="card__shadow-wrap">
                <img class="card__medal" src="assets/img/medals/medal-1.png" alt="medal">
                <div id="card__info-wrap--js" class="card__info-wrap">
                    <div class="info__stat-wrap">
                        <svg version="1.1" id="Capa_1" x="0px" y="0px"viewBox="0 0 487 487" xml:space="preserve"><g><g><path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3zM97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45zM358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                        <div class="stat__percentage-wrap">
                            <div id="percentage-stat--js" class="stat__percentage"></div>
                        </div>
                    </div>
                </div>                    
            </div>
        </div>
        <div id="card__title-wrap--js" class="card__title-wrap">
            <h3 class="card__title">Stefano</h3>
            <svg id="swipe-up--js" class="card__swipe-up" width="24" height="24"><path d="m6.293 11.293 1.414 1.414L12 8.414l4.293 4.293 1.414-1.414L12 5.586z"></path><path d="m6.293 16.293 1.414 1.414L12 13.414l4.293 4.293 1.414-1.414L12 10.586z"></path></svg>
        </div>             
    </div>   
    */
    // renderizar una tarjeta por pibe.
    async render(){
        this.pibes = await this.getPibes();
        console.log(this.pibes);
        const ELEM_cardsWrap = document.getElementById('cards-wrap--js');
        
        this.pibes.forEach(pibe => {
            
            // let newText = document.createTextNode(`pibe ${i}`);
            // card.appendChild(newText);

            let cardWrap = document.createElement('div');
            cardWrap.className = "card";

            let cardImg = document.createElement('div');
            cardImg.className = "card__img";

            let cardShadowWrap = document.createElement('div');
            cardShadowWrap.id = "card-shadow--js";
            cardShadowWrap.className = "card__shadow-wrap";

            let imgMedal = document.createElement('img');
            imgMedal.src = "src='assets/img/medals/medal-1.png'";
            imgMedal.alt = "medal";
            imgMedal.className = "card__medal";

            let cardInfoWrap = document.createElement("div");
            cardInfoWrap.id = "card__info-wrap--js";
            cardInfoWrap.className = "card__info-wrap";  
            
            let infoStatWrap = document.createElement("div");
            infoStatWrap.className = "info__stat-wrap"; 
            
            


            ELEM_cardsWrap.appendChild(card_wrap);
        });

        

    }

    // ------------- services -------------
    async getPibes(){
        // obtener todos los pibes de la db.
        let pibes = [];
        
        let url = "http://localhost:3000";
        let dataRequest = {
            method: 'GET', 
        }
        try {
            let response = await fetch(url, dataRequest);

            if(response.ok){
            
                pibes = await response.json();
                return pibes;
            }
            
        } catch (error) {
            return error;        
        } 
    }
}

// -------- events --------- //
window.addEventListener('load', ()=>{
    let card = new Card;
    card.render();   

    ELEM_cardTitleWrap.addEventListener('click', () => {

        if(card.actualHeight() == 0){
            card.expand_card();
        }
        if(card.actualHeight() == 50){
            card.reduce_card();
        }
    });
});

