function $(selector) {
    let elem = document.querySelectorAll(selector)
    if (elem.length == 1) {
        return elem[0]
    }
    return elem
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

// Header menu
// hamburger
let hamburger = document.querySelector(".hamburger")
let nmenu = document.querySelector(".navmenu")
hamburger.onclick = function () {
    nmenu.classList.toggle("active-burger")
}
const headerSection = document.querySelector('.header-section')
let lastScrollTop = 0

function menuBackground() {
    let scrltop = window.pageYOffset || document.documentElement.scrollTop
    if (scrltop > lastScrollTop) {
        headerSection.classList.add("headerHid")
    } else {
        headerSection.classList.remove("headerHid")
        nmenu.classList.remove("active-burger")
    }
    lastScrollTop = scrltop <= 0 ? 0 : scrltop

    if (window.pageYOffset > (window.innerHeight / 4)) {
        headerSection.style.background = "linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45))"
    } else {
        headerSection.style.background = "transparent"
    }
}
window.addEventListener(`scroll`, menuBackground)

//zoom photo
zoomPhotoBlogPost('.zoomImg')

function zoomPhotoBlogPost(classImg) {
    const zoomCont = document.querySelectorAll(classImg)
    if(zoomCont.length) {
        zoomCont.forEach(element => {
            const zoomImg = element.querySelector('img')
            element.style.overflow = 'hidden'

            element.onmouseenter = function (e){
                zoomImg.style.transform = 'scale(2)'
            }
            element.onmousemove = function (e){
                let originX = (e.clientX - element.getBoundingClientRect().left) / element.getBoundingClientRect().width * 100,
                    originY = (e.clientY - element.getBoundingClientRect().top) / element.getBoundingClientRect().height * 100
                zoomImg.style.transformOrigin = originX + '%' + originY + '%'
            }
            element.onmouseleave = function (e){
                zoomImg.style.transform = 'scale(1)'
            }
        })
    }
}

//form
function formMasg(){
    let formStart = document.getElementById('form'),
        submitForm = formStart.querySelector('#submitForm'),
        userName = document.querySelector('.userName'),
        userEmail = document.querySelector('.userEmail'),
        userPhone = document.querySelector('.userPhone'),
        userCompany = document.querySelector('.userCompany'),
        userMesg = document.querySelector('.userMesg'),
        popupAgree = document.querySelector('.popupAgree'),
        userInfo = {}

    submitForm.onclick = function (e) {
            e.preventDefault()
            userInfo = {
                formName: document.querySelector('#formName').value,
                formEmail: document.querySelector('#formEmail').value,
                formTel: document.querySelector('#formTel').value,
                formComp: document.querySelector('#formComp').value,
                formMess: document.querySelector('#formMess').value
            }
            userName.innerHTML = userInfo.formName
            userEmail.innerHTML = userInfo.formEmail
            userPhone.innerHTML = userInfo.formTel
            userCompany.innerHTML = userInfo.formComp
            userMesg.innerHTML = userInfo.formMess
            
        }

    popupAgree.onclick = function (e) {
        e.preventDefault()
        localStorage['UserInformation'] = JSON.stringify(userInfo)
    }

}
formMasg()


window.onload = function () {
    let headerWelcome = document.querySelector('.headerWelcome'),
        firstVisit,
        lastVisit,
        timeInSite;

    if (!localStorage.firstVisit || localStorage.firstVisit == "undefined") {
        localStorage.firstVisit = new Date();
        titleHome.innerText = "Welcome to STARTUP";
    }
    firstVisit = localStorage.firstVisit;

    if (!localStorage.lastVisit) {
        localStorage.lastVisit = firstVisit;
    }
    timeInSite = (new Date() - new Date(localStorage.lastVisit)) / 1000 / 60; // min
    let timeInSiteFirst = (new Date() - new Date(localStorage.firstVisit)) / 1000 / 60; // min
    if (timeInSiteFirst <= 5) {
        headerWelcome.innerText = "Welcome to STARTUP";
    } else if (timeInSite < 5) {
        headerWelcome.innerText = "glad to see you again";
    } else if (timeInSite >= 1440) {
        headerWelcome.innerText = "you were gone for a day, welcome to STARTUP";
    } else if (timeInSite >= 5) {
        headerWelcome.innerText = "Welcome back to STARTUP";
    }

    window.onblur = function () {
        localStorage.lastVisit = new Date();
    }
    lastVisit = localStorage.lastVisit;
}


// let firstVisit,
//     lastVisit,
//     timeInSite,
//     firstTimeInSite,
//     headerWelcome = document.querySelector('.headerWelcome')

// window.onload = function () {
//     if (!localStorage.firstVisit || localStorage.firstVisit == 'undefined') {
//         localStorage.firstVisit = new Date()
//     }
//     firstVisit = localStorage.firstVisit
//     if (!localStorage.lastVisit) {
//         localStorage.lastVisit = firstVisit
//     }
//     timeInSite = (new Date() - new Date(localStorage.lastVisit)) / 1000 / 60
//     if (timeInSite > 5) {
//         headerWelcome.innerHTML = 'Welcome to STARTUP'
//     } else if (timeInSite > 1440) {
//         headerWelcome.innerHTML = 'Тебе не було цілий день'
//     } else if (timeInSite > 2880) {
//         headerWelcome.innerHTML = 'Де тебе носило так довго'
//         window.onblur = function () {
//             localStorage.lastVisit = new Date()
//         }
//         lastVisit = localStorage.lastVisit
//     }
    
// }