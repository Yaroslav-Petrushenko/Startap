/** slider by Hashtag team 
 * .slider                          обов'язковий клас для слайдера
 *  id                              обов'язково задати id 
 * .slider-card                     контейнер слайдів
 * .cards-slider                    клас стилів css для кнопок .left .right
 *  const sliderProps = {
        slideToScrollAll: false,    скролити одразу всі видимі слайди
        gap: 20,                    відстань між слайдами
        arrows: false,              наявність стрілочок 
        autoPlay: true,             автоскрол
        autoPlaySpeed: 3000,        швидкість автоскрола
    }
    infinitySlider (selector, settings)
    selector - шлях до слайдера,
    settings - нестандартні налаштування sliderProps
 **/

const sliderProps = {
    arrows: true,
    autoPlay: false,
    gap: 20
}
const sliderPropsBrand = {
    arrows: false,
    autoPlay: true,
    gap: 60
}
function infinitySlider (selector, settings) {
    window.onresize = function(){
        infinitySlider(selector, settings)
    }
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
        realCardlendth,
        defaultSettings = {
            slideToScrollAll: false,
            gap: 30,
            arrows: false,
            autoPlay: true,
            autoPlaySpeed: 3000,
        }
    // console.log(sliderCard)
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
        realCardlendth = cards.length - slider.querySelectorAll('.clone').length 
        counter++
    } while (counter <= realCardlendth && settings.slideToScrollAll)
    if(settings.slideToScrollAll) {
        counter = 0
        while (counter < realCardlendth){
            cloneCard = cards[counter].cloneNode(true)
            cloneCard.classList.add("clone")
            cloneCard.style.transition = 'none'
            sliderCard.insertAdjacentElement("beforeend", cloneCard)
            counter++
        }
    }
    if (cloneCard.classList.contains('clone')) {
        slider.querySelectorAll('.clone').forEach(cloneCard => {
            setTimeout(() =>{
                cloneCard.style.transition = 'all 1s ease-in-out'
            }, 1)
        })
    }
    cards = sliderCard.children
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = widthCards + 'px'
    }
    heightCards = cards[0].getBoundingClientRect().height
    sliderCard.style.height = heightCards + 'px'

    function createArr() {
        const creArr = document.querySelectorAll('.cards-slider').length
        if (creArr < 1){
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
        if (settings.slideToScrollAll){
            positionCards = 0 - (distanceCards + widthCards) * realCardlendth
        }
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
        cards = sliderCard.children
        if (direction == "left") {
            if (settings.slideToScrollAll){
                for (let i = 0; i < cardsCount; i++){
                    sliderCard.insertAdjacentElement("afterbegin", cards[cards.length -1])
                }
            } else { 
                cards[cards.length - 1].remove()
                let preLastEl = cards[cards.length - 1].cloneNode(true)
                preLastEl.classList.add("clone")
                sliderCard.insertAdjacentElement("afterbegin", preLastEl)
                cards[1].classList.remove('clone')
            }
        } else if (direction == "right") {
            if (settings.slideToScrollAll){
                for (let i = 0; i < cardsCount; i++){
                    sliderCard.insertAdjacentElement("beforeend", cards[0])
                }
            } else {
                cards[0].remove()
                let preFirstEl = cards[0].cloneNode(true)
                preFirstEl.classList.add("clone")
                sliderCard.insertAdjacentElement("beforeend", preFirstEl)
                cards[cards.length-2].classList.remove('clone')
            }
        }
        shuffleCard()
    }
    function autoPlaySlider () {
        if (settings.autoPlay && (cards.length -1) > cardsCount){
            sliderInterval = setInterval(() => {
                changeSlide('right')
                console.log('rabotai')
            }, settings.autoPlaySpeed)
            localStorage[slider.id + 'interval'] = sliderInterval
        }
    }
    if (settings.autoPlay) {
        autoPlaySlider ()
    }
    slider.onmouseenter = () => {
        clearInterval(localStorage[slider.id + 'interval'])
    }
    slider.onmouseleave = () => {
        autoPlaySlider()
    }
}
infinitySlider(".slider", sliderProps)
infinitySlider(".sliderBrand", sliderPropsBrand)

