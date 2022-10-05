//parallax
let parallaxStartPos
const parallaxBG = document.querySelectorAll(".parallax")

function moveBackground(e) {
    let Y = e.pageY - window.pageYOffset - e.target.getBoundingClientRect().top + 1
    let offsetX = 50 + (e.pageX / window.innerWidth * 15)
    let offsetY = 50 + (Y / window.innerHeight * 20)
    e.target.style.backgroundPosition = `${offsetX}% ${offsetY}%`
}
parallaxBG.forEach(element => {
    element.style.backgroundPosition = 'center'
    element.addEventListener("mousemove", function (e) {
        moveBackground(e)
    })
})