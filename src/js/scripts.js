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
    element.style.backgroundSize = '120% auto'
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
            console.log(pixelScroll)
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


//slider

let positionCards = 0,
    cards = document.querySelectorAll(".ap"),
    slider = document.querySelector(".slider-card"),
    sliderWidth = slider.getBoundingClientRect().width,
    widthCards = cards[0].getBoundingClientRect().width,
    btnLeft = document.querySelector(".left"),
    btnRight = document.querySelector(".right"),
    cardsCount = Math.floor(sliderWidth / widthCards),
    distanceCards = (sliderWidth - (widthCards * cardsCount)) / (cardsCount - 1)
    
if (cards.length > cardsCount){
    positionCards -= (distanceCards + widthCards)
    let firstEl = cards[cards.length - 1].cloneNode(true)
    slider.insertAdjacentElement("afterbegin", firstEl)
}
function infinitySlider() {
    let heightCards = cards[0].getBoundingClientRect().height
    cards = document.querySelectorAll(".ap")
    widthCards = cards[0].getBoundingClientRect().width
    sliderWidth = slider.getBoundingClientRect().width
    cardsCount = Math.floor(sliderWidth / widthCards)
    distanceCards = (sliderWidth - (widthCards * cardsCount)) / (cardsCount - 1)
    slider.style.height = heightCards + "px"
    if (cards.length > cardsCount){
        positionCards -= (distanceCards + widthCards)
        //let firstClone = 
    }
    function shuffleCard() {
        positionCards = 0
        if (cards.length > cardsCount){
            positionCards -= (distanceCards + widthCards)
            btnLeft.style.display = "block"
            btnRight.style.display = "block"

        } else {
            btnLeft.style.display = "none"
            btnRight.style.display = "none"
        }
        cards = document.querySelectorAll(".ap")
        cards.forEach(card => {
            card.style.left = positionCards + 'px'
            positionCards += distanceCards + widthCards
            
        })
    }
    shuffleCard()
    function changeSlide(direction){
        if (direction == "left"){
            cards[cards.length -1].remove()
            let prelastEl = cards[cards.length - 2].cloneNode(true) // bo pislya remove lenght ne obnovilca
            slider.insertAdjacentElement("afterbegin", prelastEl)
            
        } else if (direction == "right"){
            cards[0].remove()
            let preFirstEl = cards[1].cloneNode(true)
            slider.insertAdjacentElement("beforeend", preFirstEl)
        }
        shuffleCard()
    }
    
    btnLeft.onclick = function (){
        changeSlide ("left")
    }
    btnRight.onclick = function (){
        changeSlide ("right")
    }
}
window.onresize = infinitySlider
infinitySlider()



// var div = document.getElementById('div_id'),
//     clone = div.cloneNode(true)
//         clone.id = "some_id"
//     document.body.appendChild(clone)
// let viewport = document.querySelector(".slider-card").offsetWidth;
// let btnLeft = document.querySelector(".cards-slider.left")
// let btnRight = document.querySelector(".cards-slider.right")

// let slides = document.querySelectorAll(".ap")
// let sliders = []


// for (let i = 0; i < slides.length; ++i) {
//     sliders[i] = slides[i]
//     slides[i]
// }

// let offs = 0
// let step = 0


// function drowL() {
//     let slide = document.createElement("div");
//     slide.classList.add(".ap")
//     slide.appendChild(sliders[step])
//     slide.style.left = offs * viewport + "px"
//     document.querySelector(".slider-card").appendChild(slide)
//     if (step + 1 == slide.length) {
//         step = 0
//     } else { 
//         step++
//     }
//     offs = 1
// }

// drowL()

// // function drowR() {
// //     let slid = document.createElement("div");
// //     slid.classList.add("ap")
// //     slid.appendChild(sliders[step])
// //     slid.style.left = offs * viewport + "px"
// //     document.querySelector(".slider-card").appendChild(slid)
// //     if (step == slid.length -1) {
// //         step = 0
// //     } else { 
// //         step--
// //     }
// //     offs = 0
// // }
// // drowR()
// let slider = document.querySelector(".slider-card")
//     cards = document.querySelectorAll(".cards")

// document.querySelector(".cards-slider.left").addEventListener('click', function() {
//     // offs += 1140
//     // if(offs > 1052) {
//     //     offs = 0
//         drowL()
//     //}
//     viewport = offs * viewport - viewport + "px"

// })

// document.querySelector(".cards-slider.right").addEventListener('click', function() {
//     // offs -= 1140
//     // if(offs < 0) {
//     //     offs = -1052
//         drowL()
//     //}
//     viewport = offs * viewport + "px"

// })