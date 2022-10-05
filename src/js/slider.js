//slider by Hashtag team
const sliderProps = {
    arrows: true, 
}
function infinitySlider (selector, settings) { // selector - шлях до слайдера. settings - нестандартні налаштування
    let btnRight,
        btnLeft,
        sliderInterval,
        slider = document.querySelector(selector),
        positionCards = 0,
        sliderCard = slider.querySelector('.slider-card'),
        sliderWidth = sliderCard.getBoundingClientRect().width,
        cards = sliderCard.children,
        widthCards,
        heightCards,
        cloneCard,
        distanceCards,
        constCardWidth,
        cardsCount,
        defaultSettings = {
            slideToScrollAll: false,
            gap: 20,//відстань між слайдами
            arrows: false,
            autoPlay: false,
            autoPlaySpeed: 3000,
        }
    
    
    slider.querySelectorAll('.clone').forEach(clone => {
        clone.remove()
    }) 
    if (localStorage[slider.id]) {
        clearInterval(localStorage[slider.id + 'interval'])
        constCardWidth = localStorage[slider.id]
    } else {      
        constCardWidth = cards[0].getBoundingClientRect().width
        localStorage[slider.id] = constCardWidth
    }

    cardsCount = Math.floor(sliderWidth / constCardWidth)
    //let connectTheObject = Object.assign(settings, defaultSettings)
    settings = {...defaultSettings, ...settings} // берем всі аргументи обох об'єктів settings в кінці щоб перекрити новими властивостями яких не вистачає
    distanceCards = settings.gap
    widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
    positionCards = 0 - (distanceCards + widthCards)
    
    
    if (settings.arrows) createArr()
    btnLeft = slider.querySelector('.left')
    btnRight = slider.querySelector('.right')
    if(settings.arrows && cards.length <= cardsCount){
        btnLeft.style.display = "none"
        btnRight.style.display = "none"
    } else if (settings.arrows){
        btnLeft.style.display = "block"
        btnRight.style.display = "block"
    }
    let counter = 1
    do {
        cloneCard = cards[cards.length - counter].cloneNode(true)
        cloneCard.classList.add("clone")
        cloneCard.style.transition = 'none'
        sliderCard.insertAdjacentElement("afterbegin", cloneCard)
        counter++
    } while (counter <= cardsCount && settings.slideToScrollAll)

    if (cloneCard.classList.contains('clone')) {
        setTimeout(() =>{
            cloneCard.style.transition = 'all 1s ease-in-out'
        }, 1)
    }
    cards = sliderCard.children
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = widthCards + 'px'
    }
    heightCards = cards[0].getBoundingClientRect().height
    sliderCard.style.height = heightCards + 'px'

    function createArr() {
        const creArr = document.querySelectorAll('.cards-slider').length
        if (creArr < 1){//!document.querySelectorAll('.cards-slider').length && settings.arrows && (cards.length - 1) > cardsCount
            btnRight  = document.createElement('span')
            btnLeft = document.createElement('span')
            btnLeft.className = 'cards-slider left'
            btnRight.className = 'cards-slider right'
            slider.insertAdjacentElement('afterbegin', btnLeft)
            slider.insertAdjacentElement('beforeend', btnRight) 
            btnLeft.onclick = function () {
                changeSlide("left")
            }
            btnRight.onclick = function () {
                changeSlide("right")
            }   
        } 
        
    } 
    
    function shuffleCard () {
        cards = sliderCard.children
        positionCards = 0 - (distanceCards + widthCards)
        for(let i = 0; i < cards.length; i++){
            cards[i].style.left = positionCards + 'px'
            positionCards += (distanceCards + widthCards)
        }  
    }
    shuffleCard()
    
    function changeSlide (direction) { 
        sliderWidth = sliderCard.getBoundingClientRect().width
        cardsCount = Math.floor(sliderWidth / constCardWidth)
        widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
        //cards = document.querySelector(selector).children
        if (direction == "left") {
            cards[cards.length - 1].remove()
            let preLastEl = cards[cards.length - 1].cloneNode(true)
            preLastEl.classList.add("clone")
            sliderCard.insertAdjacentElement("afterbegin", preLastEl)
            cards[1].classList.remove('clone')
        } else if (direction == "right") {
            cards[0].remove()
            let preFirstEl = cards[0].cloneNode(true)
            preFirstEl.classList.add("clone")
            sliderCard.insertAdjacentElement("beforeend", preFirstEl)
            cards[cards.length-2].classList.remove('clone')
        }
        shuffleCard()
    }
    if (settings.autoPlay && (cards.length -1) > cardsCount){
        
        sliderInterval = setInterval(() => {
            changeSlide('right')
            console.log('rabotai')
        }, settings.autoPlaySpeed)
        localStorage[slider.id + 'interval'] = sliderInterval
    }
}

window.onresize = function(){
    infinitySlider(".slider", sliderProps)
}

infinitySlider(".slider", sliderProps)


//коли наводимо курсор миши автоплей повинен заупинятися і на кнопку обнуляти 

