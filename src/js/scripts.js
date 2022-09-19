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
    element.addEventListener("mousemove", function (e) { moveBackground(e); })
    //console.log(element.style)
});



//scroll
let menu = document.querySelectorAll(".top-menu a"),
    interval

function scrollToBlock(href){
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


    interval = setInterval(()=> {
        
        pixelsLeft = Math.abs(targetLocation - window.pageYOffset) 
        
        if(pixelScroll <= 45 && pixelsLeft > (window.innerHeight * 0.25)){
            pixelScroll *= 1.3
        } else if (pixelsLeft < (window.innerHeight * 0.25) && pixelScroll > 3) {
            pixelScroll *= 0.7
        }
        if(direction == "down"){
            window.scrollTo(0, window.pageYOffset + pixelScroll)
        } else {
            window.scrollTo(0, window.pageYOffset - pixelScroll)
        } 

        if (Math.abs(window.pageYOffset - targetLocation) <= 3) {
            window.scrollTo(0, targetLocation)
            clearInterval(interval)
            console.log(pixelScroll)
        } else if (Math.abs(window.pageYOffset + window.innerHeight - document.body.getBoundingClientRect().height) < 5){
            clearInterval(interval)
        }
    },20)
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
    nmenu.classList.toggle ("active-burger")
}


//local
// window.addEventListener("load", function(event) {
//     alert("All resources finished loading!")
// })
let firstVisit,
    lastVisit,
    timeInSite
window.onload = function (){
    if (!localStorage.firstVisit || localStorage.firstVisit == 'undefined'){
        localStorage.firstVisit = new Date ()
    } 
    firstVisit = localStorage.firstVisit
    if (!localStorage.lastVisit){
        localStorage.lastVisit = firstVisit
    }
    window.onblur = function (){
        localStorage.lastVisit = new Date ()  
    }
    lastVisit = localStorage.lastVisit
    timeInSite = ((new Date() - new Date (lastVisit)) / 1000 / 60)
    //console.log(timeInSite)

} 


//

// window.addEventListener('click', function (evt) {
//     if (evt.detail === 3) {
//         alert('triple click!')
//     }
// });

let svgfigur = document.querySelector(".sv svg"),
    trople = document.querySelectorAll(".personal h3"),
    timer 
// svgfigur.addEventListener('click', function (e){
//     if (e.detail === 3) {
//     trople.innerHTML = 'Новuй текст!'
//     //alert("kdj")
//     }
// })
         

svgfigur.addEventListener("dblclick", function () {
    timer = setTimeout(function () {
        timer = null
    }, 2000)
})
svgfigur.addEventListener("click", function () {
    if (timer) {
        clearTimeout(timer)
        timer = null
        changeTex()
    }

})
function changeTex (){
    trople.forEach(element => {
        element.innerText = "Cliiiiick"
    })

}

// svgfigur.addEventListener('click', function() {
//     trople.innerHTML = 'Новый текст!'
// })


//homePage.style.height = window.innerHeight + "px";

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
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(() => {
        animOnScroll()
    }, 200)
}