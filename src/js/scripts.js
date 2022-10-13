function $(selector) {
    let elem = document.querySelectorAll(selector)
    if(elem.length == 1){
        return elem[0]
    }
    return elem
}

//hamburger
let hamburger = document.querySelector(".hamburger")
let nmenu = document.querySelector(".navmenu")
hamburger.onclick = function () {
    nmenu.classList.toggle("active-burger")
}

// Header menu
const headerSection = document.querySelector('.header-section')
let lastScrollTop = 0
function menuBackground() {
    let scrltop = window.pageYOffset || document.documentElement.scrollTop
    if (scrltop > lastScrollTop){
        headerSection.classList.add("headerHid")
    } else {
        headerSection.classList.remove("headerHid")
    }
    lastScrollTop = scrltop <= 0 ? 0 : scrltop

    if (window.pageYOffset > (window.innerHeight / 4)) {
        headerSection.style.background = "linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45))"
    } else {
        headerSection.style.background = "transparent"
    }
}
window.addEventListener(`scroll`, menuBackground)

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

//triple click
let svgfigur = document.querySelector(".sv svg"),
    trople = document.querySelectorAll(".personal h3")
svgfigur.addEventListener('click', function (e) {
    if (e.detail === 3) {
        trople.forEach(element => {
            element.innerHTML = 'New text triple click'
        })
    }
})









