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
    baseCardWidth: "263rem",
    slideToScrollAll: true,
    autoplay: true,
    gap: 20

}

const sliderProppsBrands = {
    gap: 45,
    slideToScrollAll: false,
    baseCardWidth: "127rem",
    autoplay: false
}
const sliderQuotes = {
    autoplay: true,
    arrows: true,
    autoplayspeed: 4000,
    fadeOut: true,
    dots: true,
    distansetoDots: 40
}

window.onresize = function () {
    infinitySlider(".slider", sliderProps)
    infinitySlider(".sliderBrand", sliderProppsBrands)
    infinitySlider(".sliderQuotes", sliderQuotes)
}

infinitySlider(".slider", sliderProps)
infinitySlider(".sliderBrand", sliderProppsBrands)
infinitySlider(".sliderQuotes", sliderQuotes)

function infinitySlider(selector, settings) {
    let positionCards = 0,
        slider = document.querySelector(selector),
        sliderCard = slider.querySelector(".slider-card"),
        sliderWidth = sliderCard.getBoundingClientRect().width,
        cards = sliderCard.children,
        widthCards,
        btnLeft,
        btnRight,
        distanceCards,
        cloneCard,
        heightCards,
        cardsCount,
        sliderInterval,
        realCardsLenth = cards.length,
        maxHeight,
        sliderDots,
        defoltSettings = {
            slideToScrollAll: false,
            gap: 0,
            distansetoDots: 0,
            fadeOut: false,
            dots: false,
            autoplay: false,
            arrows: false,
            autoplayspeed: 3000,
            baseCardWidth: sliderWidth + "px",
            transitionslider: "all 1s ease-in-out"
        }
    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove()
    })
    if ((localStorage[slider.id + "interval"])) {
        clearInterval(localStorage[slider.id + "interval"])
    }
    slider.style.position = "relative" 
    sliderCard.style.position = "relative"
    sliderCard.style.width = "100%"
    sliderCard.style.overflow = "hidden"
    // let connect = Object.assign(settings, defoltSettings)
    settings = {
        ...defoltSettings,
        ...settings
    } //берем всі аргументи обох об'єктів і сетінгс в кінці щоб перекрити елементи яких не вистачає

    cardsCount = Math.floor(sliderWidth / (parseInt(settings.baseCardWidth) + settings.gap))
    distanceCards = settings.gap
    widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
    positionCards = 0 - (distanceCards + widthCards)
    if (settings.arrows) createArrows()
    btnLeft = slider.querySelector(".left")
    btnRight = slider.querySelector(".right")

    if (settings.arrows && cards.length <= cardsCount) {
        btnLeft.style.display = "none"
        btnRight.style.display = "none"
    } else if (settings.arrows) {
        btnLeft.style.display = "block"
        btnRight.style.display = "block"
    }
    if (settings.dots && realCardsLenth > 1) {
        createDots ()
        dot = document.querySelectorAll('.quote-dot')
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].classList.contains("activeFade")) {
                cards[i].classList.remove("activeFade")
                dot[i].classList.remove("activeFade")
            }
        }        
        dot[0].classList.add("activeFade")
        cards[0].classList.add("activeFade")
    }
    if (!settings.fadeOut) {
        createClone()
        shuffleCard()
    }

    function createClone() {
        let counter = 1
        do {
            cloneCard = cards[cards.length - counter].cloneNode(true)
            cloneCard.classList.add("clone")
            cloneCard.style.transition = "none"
            sliderCard.insertAdjacentElement("afterbegin", cloneCard)
            realCardsLenth = cards.length - slider.querySelectorAll(".clone").length
            counter++
        } while (counter <= realCardsLenth && settings.slideToScrollAll)

        if (settings.slideToScrollAll) {
            counter = 0
            while (counter < realCardsLenth) {
                cloneCard = cards[counter].cloneNode(true)
                cloneCard.classList.add("clone")
                cloneCard.style.transition = "none"
                sliderCard.insertAdjacentElement("beforeend", cloneCard)
                counter++
            }
        }
    }
    cards = sliderCard.children
    heightCards = 0
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = widthCards + 'px'
        cards[i].style.position = "absolute"
        maxHeight = cards[i].getBoundingClientRect().height
        if (heightCards < maxHeight) {
            heightCards = maxHeight
        }
        setTimeout(() => {
            cards[i].style.transition = settings.transitionslider
        }, 1300);
    }
    sliderCard.style.height = heightCards + 'px'

    function createArrows() {
        const arrowsExist = slider.querySelectorAll(".cards-slider").length
        if (arrowsExist < 1) {
            btnLeft = document.createElement("span")
            btnRight = document.createElement("span")
            btnLeft.className = "cards-slider left"
            btnRight.className = "cards-slider right"
            slider.insertAdjacentElement("afterbegin", btnLeft)
            slider.insertAdjacentElement("beforeend", btnRight)

            btnLeft.onclick = function () {
                changeSlide("left")
            }
            btnRight.onclick = function () {
                changeSlide("right")
            }
        }
    }

    function createDots() {
        const dotsExist = slider.querySelectorAll(".quoteDots-container").length
        if (dotsExist < 1) {
            sliderDots = document.createElement('div')
            sliderDots.className = 'quoteDots-container'
            sliderDots.style.position = "absolute";
            slider.insertAdjacentElement("beforeend", sliderDots)
            for (let i = 0; i < realCardsLenth; i++) {
                const dot = document.createElement('span')
                dot.className = 'quote-dot'
                dot.dataset.order = i
                sliderDots.insertAdjacentElement("beforeend", dot)
            }
        }

    }

    function shuffleCard() {
        positionCards = 0 - (distanceCards + widthCards)
        cards = sliderCard.children
        if (settings.slideToScrollAll) {
            positionCards = 0 - (distanceCards + widthCards) * realCardsLenth
        }
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.left = positionCards + 'px'
            positionCards += (distanceCards + widthCards)
        }
    }

    function changeSlide(direction) {
        sliderWidth = sliderCard.getBoundingClientRect().width
        cardsCount = Math.floor(sliderWidth / (parseInt(settings.baseCardWidth) + settings.gap))
        widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
        cards = sliderCard.children
        if (direction == "left") {
            if (settings.slideToScrollAll) {
                for (let i = 0; i < cardsCount; i++) {
                    sliderCard.insertAdjacentElement("afterbegin", cards[cards.length - 1])
                }

            } else {
                cards[cards.length - 1].remove()
                let preLastEl = cards[cards.length - 1].cloneNode(true)
                preLastEl.classList.add("clone")
                sliderCard.insertAdjacentElement("afterbegin", preLastEl)
                cards[1].classList.remove("clone")

            }
        } else if (direction == "right") {
            if (settings.slideToScrollAll) {
                for (let i = 0; i < cardsCount; i++) {
                    sliderCard.insertAdjacentElement("beforeend", cards[0])
                }

            } else {
                cards[0].remove()
                let preFirstEl = cards[0].cloneNode(true)
                preFirstEl.classList.add("clone")
                sliderCard.insertAdjacentElement("beforeend", preFirstEl)
                cards[cards.length - 2].classList.remove("clone")
            }
        }
        shuffleCard()
    }

    function autoPlaySlider() {
        clearInterval(localStorage[slider.id + "interval"])
        if (settings.fadeOut) {
            let numGuote = 0
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].classList.contains("activeFade")) {
                    numGuote = i
                }
            }
            const setActive = (index) => {
                setTimeout(() => cards[index].classList.add("activeFade"), 1000)
                setTimeout(() => dot[index].classList.add("activeFade"), 1000)
            }
            sliderInterval = setInterval(() => {
                cards[numGuote].classList.remove("activeFade")
                dot[numGuote].classList.remove("activeFade")
                if (cards[numGuote +1]){
                    numGuote++
                } else {
                    numGuote = 0
                }
                setActive(numGuote)
            }, settings.autoplayspeed)
        } else {
                sliderInterval = setInterval(() => {
                    changeSlide("right")
                    console.log("next slide")
                }, settings.autoplayspeed)
        }
        localStorage[slider.id + "interval"] = sliderInterval
    }
    if (settings.autoplay && realCardsLenth > cardsCount) {
        autoPlaySlider()
    }
    
    // window.onscroll = () => {
    //     clearInterval(localStorage[slider.id + "interval"])
    //     if (slider.classList.contains("_active-anim")) {
    //         autoPlaySlider()
    //     }
    // }
    dot = document.querySelectorAll('.quote-dot')
    dot.forEach(element => {
        element.onclick = function () {
            clearInterval(localStorage[slider.id + "interval"])
            for (let i = 0; i < realCardsLenth; i++) {
                dot[i].classList.remove("activeFade")
                cards[i].classList.remove("activeFade")
            }
            cards[element.dataset.order].classList.add("activeFade")
            element.classList.add("activeFade")
        }
    })

    slider.onmouseenter = () => {
        clearInterval(localStorage[slider.id + "interval"])
    }
    slider.onmouseleave = () => {
        if (settings.autoplay && realCardsLenth > cardsCount) {
            autoPlaySlider()
        }
    }
}