function $(selector) {
    let elem = document.querySelectorAll(selector)
    if(elem.length == 1){
        return elem[0]
    }
    return elem
}


//parallax
let parallaxStartPos
const parallaxBG = document.querySelectorAll(".parallax")

function moveBackground(e) {
    // parallaxBG.forEach(element => {
    let Y = e.pageY - window.pageYOffset - e.target.getBoundingClientRect().top + 1
    let offsetX = 50 + (e.pageX / window.innerWidth * 15)

    let offsetY = 50 + (Y / window.innerHeight * 20)
    e.target.style.backgroundPosition = `${offsetX}% ${offsetY}%`
    // });
}

parallaxBG.forEach(element => {
    element.style.backgroundPosition = 'center'
    // element.style.backgroundSize = '120% auto'
    // element.style.backgroundSizeX = '250%'
    element.addEventListener("mousemove", function (e) {
        moveBackground(e);
    })
    //console.log(element.style)
});



//scroll
let menu = document.querySelectorAll(".top-menu a"),
    interval

function scrollToBlock(href) {
    let target = document.querySelector(href),
        targetLocation = target.getBoundingClientRect().top + window.pageYOffset, //положення цілі
        currentPosition = window.pageYOffset, //поточна позиція
        direction, //напрямок скролу
        pixelScroll = 1, // швидкість скролу 
        pixelsLeft //залишилось пікселів до цілі
    if (targetLocation > currentPosition) {
        direction = "down"
    } else {
        direction = "up"

    }
    clearInterval(interval)


    interval = setInterval(() => {

        pixelsLeft = Math.abs(targetLocation - window.pageYOffset)

        if (pixelScroll <= 45 && pixelsLeft > (window.innerHeight * 0.25)) {
            pixelScroll *= 1.3
        } else if (pixelsLeft < (window.innerHeight * 0.25) && pixelScroll > 3) {
            pixelScroll *= 0.7
        }
        if (direction == "down") {
            window.scrollTo(0, window.pageYOffset + pixelScroll)
        } else {
            window.scrollTo(0, window.pageYOffset - pixelScroll)
        }

        if (Math.abs(window.pageYOffset - targetLocation) <= 3) {
            window.scrollTo(0, targetLocation)
            clearInterval(interval)
            //console.log(pixelScroll)
        } else if (Math.abs(window.pageYOffset + window.innerHeight - document.body.getBoundingClientRect().height) < 5) {
            clearInterval(interval)
        }
    }, 20)
}

menu.forEach(element => {
    element.onclick = function (event) {
        event.preventDefault()
        scrollToBlock(this.getAttribute("href"))
    }
})

//hamburger
let hamburger = document.querySelector(".hamburger")
let nmenu = document.querySelector(".navmenu")
hamburger.onclick = function () {
    nmenu.classList.toggle("active-burger")
}


//localStorage
// window.addEventListener("load", function(event) {
//     alert("All resources finished loading!")
// })
let firstVisit,
    lastVisit,
    timeInSite,
    firstTimeInSite
window.onload = function () {
    if (!localStorage.firstVisit || localStorage.firstVisit == 'undefined') {
        localStorage.firstVisit = new Date()
    }
    firstVisit = localStorage.firstVisit
    if (!localStorage.lastVisit) {
        localStorage.lastVisit = firstVisit
    }
    timeInSite = (new Date() - new Date(localStorage.lastVisit)) / 1000 / 60

    if (timeInSite > 5) {
        console.log("Welcome to STARTUP")
    } else if (timeInSite > 1440) {
        console.log("Тебе не було цілий день")
    } else if (timeInSite > 2880) {
        console.log("де тебе носило так довго")

        window.onblur = function () {
            localStorage.lastVisit = new Date()

        }
        lastVisit = localStorage.lastVisit

        //console.log(timeInSite)

    }
}
// window.addEventListener('click', function (evt) {
//     if (evt.detail === 3) {
//         alert('triple click!')
//     }
// });
let svgfigur = document.querySelector(".sv svg"),
    trople = document.querySelectorAll(".personal h3")
//timer 
svgfigur.addEventListener('click', function (e) {
    if (e.detail === 3) {
        trople.forEach(element => {
            element.innerHTML = 'New text triple click'
        })
    }
})
// animation


const animItems = document.querySelectorAll(`._anim-start`)
if (animItems.length > 0) {
    window.addEventListener(`scroll`, animOnScroll)

    function animOnScroll() {
        animItems.forEach(element => {
            const animItem = element
            const animItemHeight = animItem.offsetHeight
            const animItemOffSet = offset(animItem).top
            const animStart = 4
            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            if ((window.pageYOffset > animItemOffSet - animItemPoint) && window.pageYOffset < (animItemOffSet + animItemHeight)) {
                animItem.classList.add(`_active-anim`)
            } else {
                if (!(animItem.classList.contains(`_anim-no`))) {
                    animItem.classList.remove(`_active-anim`)
                }
            }
        });
    }

    function offset(el) {
        const rect = el.getBoundingClientRect()
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }
    
    setTimeout(() => {
        animOnScroll()
    }, 200)
}


//slider by Hashtag team
const sliderProps = {
    arrows: true,
    autoPlay: true,

}
function infinitySlider (selector, settings) { // selector - шлях до слайдера. settings - нестандартні налаштування
    let positionCards = 0,
    slider = document.querySelector(selector),
    sliderCard = slider.querySelector('.slider-card'),
    sliderWidth = sliderCard.getBoundingClientRect().width,
    cards = sliderCard.children,
    widthCards,
    heightCards,
    cloneCard,
    distanceCards,
    constCardWidth,
    cardsCount,
    btnRight  = document.createElement('span'),
    btnLeft = document.createElement('span'),
    defaultSettings = {
        slideToScrollAll: false,
        gap: 20,//відстань між слайдами
        arrows: false,
        autoPlay: false,
        autoPlaySpead: 3000,
    }

    if (localStorage[slider.id]) {
        constCardWidth = localStorage[slider.id]
    } else {      
        constCardWidth = cards[0].getBoundingClientRect().width
        localStorage[slider.id] = constCardWidth
    }
    cardsCount = Math.floor(sliderWidth / constCardWidth)
    slider.querySelectorAll('.clone').forEach(clone => {
        clone.remove()
    })
    //let connectTheObject = Object.assign(settings, defaultSettings)
    settings = {...defaultSettings, ...settings} // берем всі аргументи обох об'єктів settings в кінці щоб перекрити новими властивостями яких не вистачає
    distanceCards = settings.gap
    widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
    positionCards = 0 - (distanceCards + widthCards)
    let counter = 1
    do {
        cloneCard = cards[cards.length - counter].cloneNode(true)
        cloneCard.classList.add("clone")
        cloneCard.style.transition = 'none'
        sliderCard.insertAdjacentElement("afterbegin", cloneCard)
        counter++
    } while (counter <= cardsCount && settings.slideToScrollAll)

    console.log(cardsCount)
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
    
    function shuffleCard () {
        positionCards = 0 - (distanceCards + widthCards)
        btnLeft.className = 'cards-slider left'
        btnRight.className = 'cards-slider right'
        if (!document.querySelectorAll('.cards-slider').length){
            slider.insertAdjacentElement('afterbegin', btnLeft)
            slider.insertAdjacentElement('beforeend', btnRight)
            
            btnLeft.onclick = function () {
                changeSlide("left")
            }
            btnRight.onclick = function () {
                changeSlide("right")
            } 
        }
        if (!settings.arrows || (cards.length - 1) <= cardsCount){
            btnLeft.style.display = "none"
            btnRight.style.display = "none"
        } else if (settings.arrows){
            btnLeft.style.display = "block"
            btnRight.style.display = "block"
        }
        for(let i = 0; i < cards.length; i++){
            cards[i].style.left = positionCards + 'px'
            positionCards += (distanceCards + widthCards)
        }  
    }
    shuffleCard()

    function changeSlide (direction) {
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
}

window.onresize = function(){
    infinitySlider(".slider", sliderProps)
}

infinitySlider(".slider", sliderProps)





