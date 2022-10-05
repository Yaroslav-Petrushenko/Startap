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