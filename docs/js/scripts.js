// function ajaxForm (form, method, requestURL){
//     const promise = new Promise((resolve, reject) => {
//         let data = new FormData(form)
//         fetch(requestURL,{
//             method: method,
//             body: data
//         }).then(response => {
//             form.reset()
//             return (response.ok) ? resolve(response) : reject(response)
//         })
//     })
//     return promise
// }
// document.querySelector('#form').onsubmit = function(e){ // id form
//     e.preventDefault()
//     ajaxForm(this, "POST", "../docs/php/get.php") // method, action
//         .then(response => { // все що після відправки
//             return response.text()
//         }).then(response => {
//             console.log(response)
//         })
// }

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
        })
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
const popupLinks = document.querySelectorAll('.popup-link'),
    body = document.querySelector('body'),
    lockPadding = document.querySelectorAll('.lock-padding'),
    timeout = 300

let unlock = true

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i]
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '')
            const curentPopup = document.getElementById(popupName)
            popupOpen(curentPopup)
            e.preventDefault()
        })
    }
}

const popupCloseIkon = document.querySelectorAll('.close-popup')
if (popupCloseIkon.length > 0) {
    for (let i = 0; i < popupCloseIkon.length; i++) {
        const el = popupCloseIkon[i]
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'))
            e.preventDefault()
        })
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open')
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            bodyLock()
        }
        curentPopup.classList.add('open')
        curentPopup.addEventListener('click', function (e) {
            
            if (!e.target.closest('.popup-content')) {
                popupClose(e.target.closest(".popup"))

            }
        })
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open')
        if (doUnlock) {
            bodyUnLock()
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('section').offsetWidth + 'px'

    for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i]
        el.style.paddingRight = lockPaddingValue
    }
    body.style.paddingRight = lockPaddingValue
    body.classList.add('lock')

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout)
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i]
                el.style.paddingRight = '0px'
            }
        }
        body.style.paddingRight = '0px'
        body.classList.remove('lock')
    }, timeout);

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

//blog-startup
const blogReadMore = document.querySelector('.blogMore')
const blogStartup = document.querySelector('.blogPostOne')

blogReadMore.addEventListener("click", function (e) {
    e.preventDefault()
    blogStartup.classList.toggle('active')
    if (blogStartup.classList.contains('active')) {
        blogReadMore.innerHTML = "Hide"
    } else {
        blogReadMore.innerHTML = "Read more"
    }
})
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
class Shop {
    constructor (){
        this.basketItems = {},
        this.counter,
        this.costCard,
        this.basketCounter = document.querySelector('.basket-counter'),
        this.tableBusket = document.querySelector('.tableBusket'),
        this.empty = document.querySelector('.empty'),
        this.sumaBasket = document.querySelector('.sumaBasket'),
        this.totalPrice = document.querySelector('.totalPrice')
    }
    
    init(){
        fetch("goods.json")
        .then(response => {
            return response.json()
        })
        .then(response => {
            for (let [key, value] of Object.entries(response)) {
                let shopBlock = document.querySelector('.shopBlock'),
                    shopCard = document.createElement('div'),
                    imgCard = document.createElement('img'),
                    cardHover = document.createElement('div'),
                    nameCards = document.createElement('p'),
                    categoryCards = document.createElement('p'),
                    priceCards = document.createElement('p'),
                    btnCards = document.createElement('a')

                shopCard.style.position = 'relative'
                shopCard.className = 'worksCards'
                shopCard.dataset.filter = value.category
                cardHover.className = 'worksCardsHover flex'
                nameCards.className = 'name'
                categoryCards.className = 'category'
                priceCards.className = 'price'
                btnCards.className = 'view'
                imgCard.src = value.src
                imgCard.alt = value.alt
                shopCard.appendChild(imgCard)
                shopBlock.appendChild(shopCard)
                nameCards.innerText = value.name
                categoryCards.innerText = value.category
                priceCards.innerText = value.price + ' $'
                btnCards.innerText = "Add to +"
                btnCards.href = value.href
                btnCards.dataset.id = key
                cardHover.appendChild(nameCards)
                cardHover.appendChild(categoryCards)
                cardHover.appendChild(priceCards)
                cardHover.appendChild(btnCards)
                shopCard.appendChild(cardHover)

                this.translateToCart(btnCards)
            }
            this.filterCardShop()
        })

        if ((localStorage['basketItems'])) {
            this.basketItems = JSON.parse(localStorage['basketItems'])
            this.showCounter()
            this.totalPriceBusket()
        } else {
            this.basketItems = {}
        }
        
        this.showProductInBusket()
    }

    showCounter(){
        if (Object.keys(this.basketItems).length == 0) {
            this.basketCounter.style.opacity = '0'
            this.empty.style.display = 'block'
            this.tableBusket.style.display = 'none'
            this.sumaBasket.style.display = 'none'
        } else {
            this.counter = Object.keys(this.basketItems).length
            this.basketCounter.style.opacity = '1'
            this.basketCounter.innerText = this.counter
            this.empty.style.display = 'none'
            this.tableBusket.style.display = 'block'
            this.sumaBasket.style.display = 'flex'
        }
    }
    
    translateToCart(ev){
        ev.onclick = (e) => {
            e.preventDefault()
            let workShopCard = e.target.closest('.worksCards'),
                cloneTop = workShopCard.getBoundingClientRect().top,
                cloneLeft = workShopCard.getBoundingClientRect().left,
                basket = document.querySelector('.basket'),
                basketTop = basket.getBoundingClientRect().top,
                basketLeft = basket.getBoundingClientRect().left,
                cloneShopCard = workShopCard.cloneNode(true),
                idCloneCard,
                imgCloneCard,
                altCloneCard,
                nameCloneCard,
                costCloneCard
    
            cloneShopCard.style.position = 'fixed'
            cloneShopCard.style.transition = 'all .5s ease'
            cloneShopCard.style.top = cloneTop + 'px'
            cloneShopCard.style.left = cloneLeft + 'px'
            document.body.appendChild(cloneShopCard)
    
            setTimeout(() => {
                cloneShopCard.style.top = basketTop + 'px'
                cloneShopCard.style.left = basketLeft + 'px'
                setTimeout(() => {
                    cloneShopCard.remove()
                    imgCloneCard = cloneShopCard.querySelector('img').src
                    altCloneCard = cloneShopCard.querySelector('img').alt
                    nameCloneCard = cloneShopCard.querySelector('.name').innerText
                    costCloneCard = cloneShopCard.querySelector('.price').innerText
                    idCloneCard = cloneShopCard.querySelector('.view').dataset.id
                    
                    if (idCloneCard in this.basketItems) {
                        this.basketItems[idCloneCard].counter++
                    } else {
                        this.basketItems[idCloneCard] = {
                            'img': imgCloneCard,
                            'alt': altCloneCard,
                            'name': nameCloneCard,
                            'counter': 1,
                            'cost': costCloneCard
                        }
    
                        this.counter = Object.keys(this.basketItems).length
                        this.basketCounter.style.opacity = '1'
                        this.sumaBasket.style.display = 'block'
    
                        this.basketCounter.innerHTML = this.counter
                    }
                    localStorage['basketItems'] = JSON.stringify(this.basketItems)
                    this.showProductInBusket()
                    this.showCounter()
                    this.totalPriceBusket()
                }, 500);
            }, 100);
        }
    }
    
    showProductInBusket(){
        let productInBasket = document.querySelector('.productInBasket'),
            tablebody = ''
    
        for (const [key, value] of Object.entries(this.basketItems)) {
            tablebody += `
                <tr class="prodBasket" >
                    <td class="photo-product">
                        <img src="${value.img}", alt="${value.alt}">
                    </td>
                    <td>${value.name}</td>
                    <td>${value.cost}</td>
                    <td class="count-product">
                        <div class="flex" >
                            <button class="delite-product" data-id='${key}'> - </button>
                            <input class="counter-product" data-id='${key}' type="number" value="${value.counter}">
                            <button class="add-product" data-id='${key}'> + </button>
                        </div>  
                    </td>
                    <td class="priceCard">${parseInt(value.counter) *  parseInt(value.cost)}$</td>
                    <td>
                        <a href='#' class="delt" data-id='${key}'>+</button>
                    </td>
                </tr>
            `
            localStorage['basketItems'] = JSON.stringify(this.basketItems)
        }
    
        productInBasket.innerHTML = tablebody
    
        let deliteProduct = document.querySelectorAll('.delite-product'),
            addProduct = document.querySelectorAll('.add-product'),
            deltAll = document.querySelectorAll('.delt'),
            counterProduct = document.querySelectorAll('.counter-product');

        counterProduct.forEach(el => {
            el.oninput = () => {
                let cartShop = el.closest('.prodBasket'),
                    cardid = el.getAttribute('data-id'),
                    priceCard = cartShop.querySelector('.priceCard')
                this.basketItems[cardid].counter = el.value
                el.value = this.basketItems[cardid].counter
                priceCard.innerHTML = `${parseInt(this.basketItems[cardid].counter) * parseInt(this.basketItems[cardid].cost)}$`
                if (el.value.length == 0){
                    delete this.basketItems[cardid]
                    cartShop.remove()
                }
                localStorage['basketItems'] = JSON.stringify(this.basketItems)
                this.showCounter()
                this.totalPriceBusket()
            }
        })

        deliteProduct.forEach(el => {
            el.onclick = () => {
                let cartShop = el.closest('.prodBasket'),
                    cardid = el.getAttribute('data-id'),
                    counterProduct = cartShop.querySelector('.counter-product'),
                    priceCard = cartShop.querySelector('.priceCard')
                if (this.basketItems[cardid].counter > 1) {
                    this.basketItems[cardid].counter--
                    counterProduct.value = this.basketItems[cardid].counter
                    priceCard.innerHTML = `${parseInt(this.basketItems[cardid].counter) * parseInt(this.basketItems[cardid].cost)}$`
                    this.showCounter()
                    this.totalPriceBusket()
                    localStorage['basketItems'] = JSON.stringify(this.basketItems)
                }
            }
        })
    
        addProduct.forEach(el => {
            el.onclick = () => {
                let cartShop = el.closest('.prodBasket'),
                    cardid = el.getAttribute('data-id'),
                    counterProduct = cartShop.querySelector('.counter-product'),
                    priceCard = cartShop.querySelector('.priceCard')
                this.basketItems[cardid].counter++
                counterProduct.value = this.basketItems[cardid].counter
                priceCard.innerHTML = `${parseInt(this.basketItems[cardid].counter) * parseInt(this.basketItems[cardid].cost)}$`
                this.showCounter()
                localStorage['basketItems'] = JSON.stringify(this.basketItems)
                this.totalPriceBusket()
            }
        })
    
        deltAll.forEach(el => {
            el.style.transform = 'rotate(45deg)'
            el.onclick = (e) => {
                e.stopPropagation()
                let cartShop = el.closest('.prodBasket'),
                    cardid = el.getAttribute('data-id')
                    
                delete this.basketItems[cardid]
                cartShop.remove()
                this.showCounter()
                this.totalPriceBusket()
                localStorage["basketItems"] = JSON.stringify(this.basketItems)
            }
        })
    
    }
    
    totalPriceBusket(){
        let sumPrice = 0
        for (const [key, value] of Object.entries(this.basketItems)) {
            sumPrice += (parseInt(value.counter) * parseInt(value.cost))
    
        }
        this.totalPrice.innerHTML = sumPrice + '$'
    }

    filterCardShop() {
        const cardsFilter = document.querySelectorAll(".worksCards")
        const btnFilter = document.querySelectorAll(".filterCategory")
        if (localStorage["selectedCategory"]) {
            this.filter(localStorage["selectedCategory"], cardsFilter)
            btnFilter.forEach(el => {
                if (el.dataset.filter == localStorage["selectedCategory"]) {
                    el.classList.add('active_color')
                }
            })
        }
    
        btnFilter.forEach(el => {
            el.addEventListener('click', (e) => {
                btnFilter.forEach(el => {
                    el.classList.remove('active_color')
                })
                e.preventDefault()
                el.classList.add('active_color')
                let currentCategory = el.dataset.filter
                this.filter(currentCategory, cardsFilter)
                localStorage["selectedCategory"] = currentCategory
            })
        })
    }
    filter(category, items) {
        items.forEach(item => {
            const isItemFilter = item.querySelector('p.category').innerHTML.toLowerCase() == category;
            const isShowAll = category === 'all'
            if (!isItemFilter && !isShowAll) {
                item.classList.add('anim-worksCards')
            } else {
                item.classList.remove('anim-worksCards')
                this.animationCartsShop(item)
            }
        })
    }
    
    animationCartsShop(obj){
        let img = obj.querySelector('img'),
            gridX = 15,
            gridY = 15,
            wImg = img.getBoundingClientRect().width,
            hImg = img.getBoundingClientRect().height

        function createSpan (){
            for (let x = 0; x < gridX; x++) {
                for (let y = 0; y < gridY; y++) {
                    let span = document.createElement('span'),
                        width = wImg / gridX + 'px',
                        height = hImg / gridY + 'px',
                        top = hImg / gridY * y + 'px',
                        left = wImg / gridX * x + 'px',
                        bgPosX = -(wImg / gridX * x) + "px",
                        bgPosY = -(hImg / gridY * y) + "px";

                    span.style.backgroundImage = `url(${img.src})`
                    span.style.backgroundRepeat = 'no-repeat'
                    span.style.display = 'inline-block'
                    span.style.position = "absolute"
                    span.style.top = top
                    span.style.left = left
                    span.style.width = width
                    span.style.height = height
                    span.style.backgroundPosition = bgPosX + " " + bgPosY
                    span.style.transition = `all ${(rand(0, 10))/10}s ease ${(rand(0, 10))/10}s`
                    span.style.top = `${rand(window.innerHeight, -window.innerHeight)}px`//hImg*2, window.innerHeight/2
                    span.style.left = `${rand(-window.innerHeight, window.innerHeight)}px`// 0, wImg
                    img.style.opacity = '0'
                    obj.appendChild(span)

                    setTimeout(() => {
                        span.remove()
                        img.style.opacity = '1'
                    }, 3000); 
                }
            }
        }
        createSpan ()

        const spans = obj.querySelectorAll('span')
        setInterval(() => {
            let index = 0
            for (let x = 0; x < gridX; x++) {
                for (let y = 0; y < gridY; y++) {
                    const span = spans[index]
                    index++
                    span.style.top = hImg / gridY * y + 'px'
                    span.style.left = wImg / gridX * x + 'px'
                    span.style.opacity = "1"
                }
            }
        }, 100)

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}

window.onload = function (){
    new Shop().init()
}



//slider
// function $(selector){
//     let elem = document.querySelectorAll(selector)
//     if(elem.length == 1){
//         return elem[0]
//     }
//     return elem
// }

/**
 * .slider -           обов'язковий клас для слайдера
* id -                 обов'язково задати id
* .slider-card -       обов'язковий клас для контейнера слайдів
* .cards-slider -      клас стилів css для кнопок .left . right
 * const sliderProps = {
        slideToScrollAll: true,     скролити одразу всі видимі слайди
        gap: 20,                    відстань між слайдами
        autoplay: true,             автоскрол
        arrows: false,              наявність стрілочок
        autoplayspeed: 3000         швидкість автоскролу
    } 
    infinitySlider(selector, settings) selector шлях до слайдера а settings не стандартні налаштування sliderProps
    
 */
    // const sliderProps = {
    //     arrows: true,
    //     baseCardWidth: "263rem",
    //     slideToScrollAll: true,
    //     autoplay: false,
    //     gap: 20
    // }
    
    // const sliderProppsBrands = {
    //     gap: 45,
    //     slideToScrollAll: true,
    //     baseCardWidth: "127rem",
    //     autoplay: false
    // }
    // const sliderQuotes = {
    //     autoplay: false,
    //     autoplayspeed: 4000,
    //     fadeOut: true,
    //     dots: true,
    //     distanceDots: 40,
    //     arrows: false
    // }
    
    // window.onresize = function () {
    //     infinitySlider(".slider", sliderProps)
    //     infinitySlider(".sliderBrand", sliderProppsBrands)
    //     infinitySlider(".sliderQuotes", sliderQuotes)
    
    // }
    
    
    // infinitySlider(".slider", sliderProps)
    // infinitySlider(".sliderBrand", sliderProppsBrands)
    // infinitySlider(".sliderQuotes", sliderQuotes)
    
    // function infinitySlider(selector, settings) {
    //     let positionCards = 0,
    //         slider = document.querySelector(selector),
    //         sliderCard = slider.querySelector(".slider-card"),
    //         sliderWidth = sliderCard.getBoundingClientRect().width,
    //         cards = sliderCard.children,
    //         heightCards = 0,
    //         realCardsLenth = cards.length,
    //         widthCards, btnLeft, btnRight, distanceCards, cloneCard, cardsCount, sliderInterval, maxHeight, sliderDots, touchPoint,
    //         defoltSettings = {
    //             slideToScrollAll: false,
    //             dots: false,
    //             distanceDots: 0,
    //             fadeOut: false,
    //             gap: 0,
    //             autoplay: false,
    //             arrows: false,
    //             autoplayspeed: 3000,
    //             baseCardWidth: sliderWidth + "px",
    //             transitionslider: "all 1.3s cubic-bezier(.44,-0.13,.43,1.13)"
    //         }
    
    
    //     slider.querySelectorAll(".clone").forEach(clone => {
    //         clone.remove()
    //     })
    
    //     if ((localStorage[slider.id + "interval"])) {
    //         clearInterval(localStorage[slider.id + "interval"])
    //     }
    
    //     slider.style.position = "relative"
    //     sliderCard.style.position = "relative"
    //     sliderCard.style.width = "100%"
    //     sliderCard.style.overflow = "hidden"
    
    //     // let connect = Object.assign(settings, defoltSettings)
    //     settings = {
    //         ...defoltSettings,
    //         ...settings
    //     } //берем всі аргументи обох об'єктів і сетінгс в кінці щоб перекрити елементи яких не вистачає
    
    //     cardsCount = Math.floor(sliderWidth / (parseInt(settings.baseCardWidth) + settings.gap))
    //     distanceCards = settings.gap
    //     widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
    //     positionCards = 0 - (distanceCards + widthCards)
    
    //     if (settings.arrows) createArrows()
    //     btnLeft = slider.querySelector(".left")
    //     btnRight = slider.querySelector(".right")
    
    //     if (settings.arrows && cards.length <= cardsCount) {
    //         btnLeft.style.display = "none"
    //         btnRight.style.display = "none"
    //     } else if (settings.arrows) {
    //         btnLeft.style.display = "block"
    //         btnRight.style.display = "block"
    //     }
    
    //     if (settings.dots && realCardsLenth > 1) {
    //         createDots()
    //         dot = document.querySelectorAll('.dot')
    //         for (let i = 0; i < cards.length; i++) {
    //             if (cards[i].classList.contains("activeFade")) {
    //                 dot[i].classList.remove("activeFade")
    //                 cards[i].classList.remove("activeFade")
    //             }
    //         }
    //         dot[0].classList.add("activeFade")
    //         cards[0].classList.add("activeFade")
    //     }
    
    //     if (!settings.fadeOut) {
    //         createClone()
    //         shuffleCard()
    //     }
    
    //     function createClone() {
    //         let counter = 1
    //         do {
    //             cloneCard = cards[cards.length - counter].cloneNode(true)
    //             cloneCard.classList.add("clone")
    //             cloneCard.style.transition = "none"
    //             sliderCard.insertAdjacentElement("afterbegin", cloneCard)
    //             realCardsLenth = cards.length - slider.querySelectorAll(".clone").length
    //             counter++
    //         } while (counter <= realCardsLenth && settings.slideToScrollAll)
    
    //         if (settings.slideToScrollAll) {
    //             counter = 0
    //             while (counter < realCardsLenth) {
    //                 cloneCard = cards[counter].cloneNode(true)
    //                 cloneCard.classList.add("clone")
    //                 cloneCard.style.transition = "none"
    //                 sliderCard.insertAdjacentElement("beforeend", cloneCard)
    //                 counter++
    //             }
    //         }
    //     }
    
    //     cards = sliderCard.children
    
    //     for (let i = 0; i < cards.length; i++) {
    //         cards[i].style.width = widthCards + 'px'
    //         cards[i].style.position = "absolute"
    //         maxHeight = cards[i].getBoundingClientRect().height
    //         if (maxHeight > heightCards) {
    //             heightCards = maxHeight
    //         }
    
    //         setTimeout(() => {
    //             cards[i].style.transition = settings.transitionslider
    //         }, 1300);
    
    //     }
    
    //     sliderCard.style.height = heightCards + 'px'
    
    //     function createArrows() {
    //         const arrowsExist = slider.querySelectorAll(".cards-slider").length
    
    //         if (arrowsExist < 1) {
    //             let clickAllowed = true 
    //             btnLeft = document.createElement("span")
    //             btnRight = document.createElement("span")
    //             btnLeft.className = "cards-slider left"
    //             btnRight.className = "cards-slider right"
    //             slider.insertAdjacentElement("afterbegin", btnLeft)
    //             slider.insertAdjacentElement("beforeend", btnRight)
                
    //             btnLeft.onclick = function () {
    //                 if(clickAllowed){
    //                     changeSlide("left")
    //                     clickAllowed = false
    //                     console.log(parseFloat(cards[0].style.transitionDuration) * 1000)
    //                     setTimeout(() => {
    //                         clickAllowed = true
    //                     },parseFloat(cards[0].style.transitionDuration) * 1000);
    //                 }
    //             }
    //             btnRight.onclick = function () {
    //                 if(clickAllowed){
    //                     changeSlide("right")
    //                     clickAllowed = false
    //                     console.log(parseFloat(cards[0].style.transitionDuration) * 1000)
    //                     setTimeout(() => {
    //                         clickAllowed = true
    //                     },parseFloat(cards[0].style.transitionDuration) * 1000);
    //                 }
    //             }
    //         }
    //     }
    
        
    //     function createDots() {
    //         const dotsExist = slider.querySelectorAll(".dot-container").length
    //         if (dotsExist < 1) {
    //             sliderDots = document.createElement("div")
    //             sliderDots.className = "dot-container"
    //             sliderDots.style.position = "absolute"
    //             slider.insertAdjacentElement("beforeend", sliderDots)
    //             for (let i = 0; i < realCardsLenth; i++) {
    //                 const dot = document.createElement("span")
    //                 dot.className = "dot"
    //                 dot.dataset.order = i
    //                 sliderDots.insertAdjacentElement("beforeend", dot)
    //             }
    //         }
    //     }
    
    //     // if (settings.dots) {
    //     //     createDots()
    //     // }
    
    //     function shuffleCard() {
    //         positionCards = 0 - (distanceCards + widthCards)
    //         cards = sliderCard.children
    //         if (settings.slideToScrollAll) {
    //             positionCards = 0 - (distanceCards + widthCards) * realCardsLenth
    //         }
    //         for (let i = 0; i < cards.length; i++) {
    //             cards[i].style.left = positionCards + 'px'
    //             positionCards += (distanceCards + widthCards)
    //         }
    //     }
    
    //     function changeSlide(direction) {
    //         sliderWidth = sliderCard.getBoundingClientRect().width
    //         cardsCount = Math.floor(sliderWidth / (parseInt(settings.baseCardWidth) + settings.gap))
    //         widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
    //         cards = sliderCard.children
    
    //         let numGuote = 0
    //         for (let i = 0; i < cards.length; i++) {
    //             if (cards[i].classList.contains("activeFade")) {
    //                 numGuote = i
    //             }
    //         }
    //         if (direction == "left") {
    //             if (settings.slideToScrollAll) {
    //                 for (let i = 0; i < cardsCount; i++) {
    //                     sliderCard.insertAdjacentElement("afterbegin", cards[cards.length - 1])
    //                 }
    
    //             } else if (settings.fadeOut) {
    //                 setTimeout(() => cards[numGuote].classList.add("activeFade"), 1000)
    //                 setTimeout(() => dot[numGuote].classList.add("activeFade"), 1000)
    //                 cards[numGuote].classList.remove("activeFade")
    //                 dot[numGuote].classList.remove("activeFade")
    //                 if (cards[numGuote - 1]) {
    //                     numGuote--
    //                 } else {
    //                     numGuote = cards.length - 1
    //                 }
                    
    //             } else {
    //                 cards[cards.length - 1].remove()
    //                 let preLastEl = cards[cards.length - 1].cloneNode(true)
    //                 preLastEl.classList.add("clone")
    //                 sliderCard.insertAdjacentElement("afterbegin", preLastEl)
    //                 cards[1].classList.remove("clone")
                    
    //             }
    //         } else if (direction == "right") {
    //             if (settings.slideToScrollAll) {
    //                 for (let i = 0; i < cardsCount; i++) {
    //                     sliderCard.insertAdjacentElement("beforeend", cards[0])
    //                 }
    
    //             } else if (settings.fadeOut) {
    //                 setTimeout(() => cards[numGuote].classList.add("activeFade"), 1000)
    //                 setTimeout(() => dot[numGuote].classList.add("activeFade"), 1000)
    //                 cards[numGuote].classList.remove("activeFade")
    //                 dot[numGuote].classList.remove("activeFade")
    //                 if (cards[numGuote + 1]) {
    //                     numGuote++
    //                 } else {
    //                     numGuote = 0
    //                 }
                    
    //             } else {
    //                 cards[0].remove()
    //                 let preFirstEl = cards[0].cloneNode(true)
    //                 preFirstEl.classList.add("clone")
    //                 sliderCard.insertAdjacentElement("beforeend", preFirstEl)
    //                 cards[cards.length - 2].classList.remove("clone")
    //             }
    //         }
    //         if (!settings.fadeOut) {
    //             shuffleCard()
    //         }
    //     }
    
    //     function autoPlaySlider() {
    //         clearInterval(localStorage[slider.id + "interval"])
    //         if (settings.fadeOut) {
    //             let numGuote = 0
    //             for (let i = 0; i < cards.length; i++) {
    //                 if (cards[i].classList.contains("activeFade")) {
    //                     numGuote = i
    //                 }
    //             }
    //             const setActive = (index) => {
    //                 setTimeout(() => cards[index].classList.add("activeFade"), 1000)
    //                 setTimeout(() => dot[index].classList.add("activeFade"), 1000)
    //             }
    //             sliderInterval = setInterval(() => {
    //                 cards[numGuote].classList.remove("activeFade")
    //                 dot[numGuote].classList.remove("activeFade")
    //                 if (cards[numGuote + 1]) {
    //                     numGuote++
    //                 } else {
    //                     numGuote = 0
    //                 }
    //                 setActive(numGuote)
    //             }, settings.autoplayspeed)
    //         } else {
    //             sliderInterval = setInterval(() => {
    //                 changeSlide("right")
    //                 console.log("next slide")
    //             }, settings.autoplayspeed)
    //         }
    //         localStorage[slider.id + "interval"] = sliderInterval
    //     }
    //     if (settings.autoplay && realCardsLenth > cardsCount) {
    //         autoPlaySlider()
    //     }
    
    //     dot = document.querySelectorAll('.dot')
    //     dot.forEach(element => {
    //         element.onclick = function () {
    //             clearInterval(localStorage[slider.id + "interval"])
    //             for (let i = 0; i < realCardsLenth; i++) {
    //                 dot[i].classList.remove("activeFade")
    //                 cards[i].classList.remove("activeFade")
    //             }
    //             cards[element.dataset.order].classList.add("activeFade")
    //             element.classList.add("activeFade")
    //         }
    //     })
    
    //     if (settings.autoplay && realCardsLenth > cardsCount) {
    //         autoPlaySlider()
    //     }
    
    //     function touchSlider (e) {
    //         if ((touchPoint + 20) < e.touches[0].pageX ) {
    //             changeSlide('left')
    //             this.removeEventListener('touchmove', touchSlider)
    
    //         } else if ((touchPoint - 20) > e.touches[0].pageX ) {
    //             changeSlide('right')
    //             this.removeEventListener('touchmove', touchSlider)
    //         }
    //     }
    
    //     slider.addEventListener('touchend', function () {
    //         if (settings.autoplay && realCardsLenth > cardsCount) {
    //             autoPlaySlider()
    //         }
    //     })
        
    //     slider.addEventListener('touchstart', function(e){
    //     console.log(e)
    //     touchPoint = e.touches[0].pageX
    //     this.addEventListener('touchmove', touchSlider)
    //     clearInterval(localStorage[slider.id + "interval"])
    //     })

    //     // window.onscroll = () => {
    //     //     clearInterval(localStorage[slider.id + "interval"])
    //     //     if (slider.classList.contains("_active-anim")) {
    //     //         autoPlaySlider()
    //     //     }
    //     // }
    
    //     slider.onmouseenter = () => {
    //         clearInterval(localStorage[slider.id + "interval"])
    //     }
    //     slider.onmouseleave = () => {
    //         if (settings.autoplay && realCardsLenth > cardsCount) {
    //             autoPlaySlider()
    //         }
    //     }
    
    
    // }
    
    // //ontouchmove
    // //onwhill
    // //onscroll
    
// /**
//  * .slider -           обов'язковий клас для слайдера
// * id -                 обов'язково задати id
// * .slider-card -       обов'язковий клас для контейнера слайдів
// * .cards-slider -      клас стилів css для кнопок .left . right
//  * const sliderProps = {
//         slideToScrollAll: true,     скролити одразу всі видимі слайди
//         gap: 20,                    відстань між слайдами
//         autoplay: true,             автоскрол
//         arrows: false,              наявність стрілочок
//         autoplayspeed: 3000         швидкість автоскролу
//     } 
//     infinitySlider(selector, settings) selector шлях до слайдера а settings не стандартні налаштування sliderProps

//  */


//     // window.onscroll = () => {
//     //     clearInterval(localStorage[slider.id + "interval"])
//     //     if (slider.classList.contains("_active-anim")) {
//     //         autoPlaySlider()
//     //     }
//     // }

// //ontouchmove
// //onwhill
// //onscroll



class InfinitySlider {
    constructor(selector, settings = {}) {
        this.settings = {
            ...InfinitySlider.defoltSettings,
            ...settings
        }
        this.positionCards = 0
        this.slider = document.querySelector(selector)
        this.sliderCard = this.slider.querySelector(".slider-card")
        this.cards = this.sliderCard.children
        this.sliderWidth
        this.heightCards
        this.realCardsLenth = this.cards.length
        this.widthCards
        this.btnLeft
        this.btnRight
        this.distanceCards
        this.cloneCard
        this.cardsCount
        this.sliderInterval
        this.maxHeight
        this.sliderDots
        this.touchPoint
        this.dot
    }
    static defoltSettings = {
        slideToScrollAll: false,
        dots: false,
        distanceDots: 0,
        fadeOut: false,
        gap: 0,
        autoplay: false,
        arrows: false,
        autoplayspeed: 3000,
        baseCardWidth: null,
        transitionslider: "all 1.3s cubic-bezier(.44,-0.13,.43,1.13)"
    }


    init() {
        this.sliderWidth = this.sliderCard.getBoundingClientRect().width
        if (this.settings.baseCardWidth == null) {
            this.settings.baseCardWidth = this.sliderWidth + 'px'
        }

        this.slider.querySelectorAll(".clone").forEach(clone => {
            clone.remove()
        })

        if ((localStorage[this.slider.id + "interval"])) {
            clearInterval(localStorage[this.slider.id + "interval"])
        }

        this.slider.style.position = "relative"
        this.sliderCard.style.position = "relative"
        this.sliderCard.style.width = "100%"
        this.sliderCard.style.overflow = "hidden"
        this.cardsCount = Math.floor(this.sliderWidth / (parseInt(this.settings.baseCardWidth) + this.settings.gap))
        if (this.cardsCount == 0) this.cardsCount = 1
        this.distanceCards = this.settings.gap
        this.widthCards = (this.sliderWidth - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount
        this.positionCards = 0 - (this.distanceCards + this.widthCards)
        
        if (this.settings.arrows) this.createArrows()
        this.btnLeft = this.slider.querySelector(".left")
        this.btnRight = this.slider.querySelector(".right")

        if (this.settings.arrows && this.cards.length <= this.cardsCount) {
            this.btnLeft.style.display = "none"
            this.btnRight.style.display = "none"
        } else if (this.settings.arrows) {
            this.btnLeft.style.display = "block"
            this.btnRight.style.display = "block"
        }

        if (this.settings.dots && this.realCardsLenth > 1) {
            this.createDots()
            this.dot = this.slider.querySelectorAll('.dot')
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].classList.contains("activeFade")) {
                    this.dot[i].classList.remove("activeFade")
                    this.cards[i].classList.remove("activeFade")
                }
            }
            this.dot[0].classList.add("activeFade")
            this.cards[0].classList.add("activeFade")
        }

        if (!this.settings.fadeOut) {
            this.createClone()
            this.shuffleCard()
        }
        this.cards = this.sliderCard.children
        
        this.heightCards = 0
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].style.width = this.widthCards + 'px'
            this.cards[i].style.position = "absolute"
            this.maxHeight = this.cards[i].getBoundingClientRect().height
            if (this.maxHeight > this.heightCards) {
                this.heightCards = this.maxHeight
            }

            this.cards[i].style.transition = 'none'
            setTimeout(() => {
                this.cards[i].style.transition = this.settings.transitionslider
            }, 1);
        }

        this.sliderCard.style.height = this.heightCards + 'px'

        if (this.settings.dots) {
            this.createDots()
        }

        this.dot = this.slider.querySelectorAll('.dot')

        this.dot.forEach(element => {
            element.onclick = () => {
                clearInterval(localStorage[this.slider.id + "interval"])
                for (let i = 0; i < this.realCardsLenth; i++) {
                    this.dot[i].classList.remove("activeFade")
                    this.cards[i].classList.remove("activeFade")
                }
                this.cards[element.dataset.order].classList.add("activeFade")
                element.classList.add("activeFade")
            }
        })

        if (this.settings.autoplay && this.realCardsLenth > this.cardsCount) {
            this.autoPlaySlider()
        }

        this.slider.addEventListener('touchend', () => {
            if (this.settings.autoplay && this.realCardsLenth > this.cardsCount) {
                this.autoPlaySlider()
            }
        })

        this.touchSlider = this.touchSlider.bind(this)

        this.slider.addEventListener('touchstart', (e) => {
            this.touchPoint = e.touches[0].pageX
            this.slider.addEventListener('touchmove', this.touchSlider)
            clearInterval(localStorage[this.slider.id + "interval"])
        })

        this.slider.onmouseenter = () => {
            clearInterval(localStorage[this.slider.id + "interval"])
        }
        this.slider.onmouseleave = () => {
            if (this.settings.autoplay && this.realCardsLenth > this.cardsCount) {
                this.autoPlaySlider()
            }
        }  
    }

    createArrows() {
        const arrowsExist = this.slider.querySelectorAll(".cards-slider").length

        if (arrowsExist < 1) {
            let clickAllowed = true
            this.btnLeft = document.createElement("span")
            this.btnRight = document.createElement("span")
            this.btnLeft.className = "cards-slider left"
            this.btnRight.className = "cards-slider right"
            this.slider.insertAdjacentElement("afterbegin", this.btnLeft)
            this.slider.insertAdjacentElement("beforeend", this.btnRight)

            this.btnLeft.onclick = () => {

                if (clickAllowed) {

                    this.changeSlide('left')
                    clickAllowed = false

                    setTimeout(() => {
                        clickAllowed = true
                    }, parseFloat(this.cards[0].style.transitionDuration) * 1000);
                }
            }

            this.btnRight.onclick = () => {
                if (clickAllowed) {
                    this.changeSlide("right")

                    clickAllowed = false
                    setTimeout(() => {
                        clickAllowed = true
                    }, parseFloat(this.cards[0].style.transitionDuration) * 1000);
                }
            }
        }
    }

    createClone() {
        let counter = 1
        do {
            this.cloneCard = this.cards[this.cards.length - counter].cloneNode(true)
            this.cloneCard.classList.add("clone")
            this.cloneCard.style.transition = "none"
            this.sliderCard.insertAdjacentElement("afterbegin", this.cloneCard)
            this.realCardsLenth = this.cards.length - this.slider.querySelectorAll(".clone").length
            counter++
        } while (counter <= this.realCardsLenth && this.settings.slideToScrollAll)

        if (this.settings.slideToScrollAll) {
            counter = 0
            while (counter < this.realCardsLenth) {
                this.cloneCard = this.cards[counter].cloneNode(true)
                this.cloneCard.classList.add("clone")
                this.cloneCard.style.transition = "none"
                this.sliderCard.insertAdjacentElement("beforeend", this.cloneCard)
                counter++
            }
        }
    }

    createDots() {
        const dotsExist = this.slider.querySelectorAll(".dot-container").length
        if (dotsExist < 1) {
            this.sliderDots = document.createElement("div")
            this.sliderDots.className = "dot-container"
            this.sliderDots.style.position = "absolute"
            this.slider.insertAdjacentElement("beforeend", this.sliderDots)
            for (let i = 0; i < this.realCardsLenth; i++) {
                const dot = document.createElement("span")
                dot.className = "dot"
                dot.dataset.order = i
                this.sliderDots.insertAdjacentElement("beforeend", dot)
            }
        }
    }
    shuffleCard() {

        this.positionCards = 0 - (this.distanceCards + this.widthCards)
        this.cards = this.sliderCard.children

        if (this.settings.slideToScrollAll) {
            this.positionCards = 0 - (this.distanceCards + this.widthCards) * this.realCardsLenth
        }
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].style.left = this.positionCards + 'px'
            this.positionCards += (this.distanceCards + this.widthCards)
        }
    }

    changeSlide(direction) {
        this.sliderWidth = this.sliderCard.getBoundingClientRect().width

        this.cardsCount = Math.floor(this.sliderWidth / (parseInt(this.settings.baseCardWidth) + this.settings.gap))
        if (this.cardsCount == 0) this.cardsCount = 1
        this.widthCards = (this.sliderWidth - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount
        this.cards = this.sliderCard.children

        let numGuote = 0
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].classList.contains("activeFade")) {
                numGuote = i
            }
        }
        if (direction == "left") {
            if (this.settings.slideToScrollAll) {
                for (let i = 0; i < this.cardsCount; i++) {
                    this.sliderCard.insertAdjacentElement("afterbegin", this.cards[this.cards.length - 1])
                }
            } else if (this.settings.fadeOut) {
                setTimeout(() => this.cards[numGuote].classList.add("activeFade"), 1000)
                setTimeout(() => this.dot[numGuote].classList.add("activeFade"), 1000)
                this.cards[numGuote].classList.remove("activeFade")
                this.dot[numGuote].classList.remove("activeFade")
                if (this.cards[numGuote - 1]) {
                    numGuote--
                } else {
                    numGuote = this.cards.length - 1
                }
            } else {
                this.cards[this.cards.length - 1].remove()
                let preLastEl = this.cards[this.cards.length - 1].cloneNode(true)
                preLastEl.classList.add("clone")
                this.sliderCard.insertAdjacentElement("afterbegin", preLastEl)
                this.cards[1].classList.remove("clone")
            }
        } else if (direction == "right") {
            if (this.settings.slideToScrollAll) {
                for (let i = 0; i < this.cardsCount; i++) {
                    this.sliderCard.insertAdjacentElement("beforeend", this.cards[0])
                }

            } else if (this.settings.fadeOut) {
                setTimeout(() => this.cards[numGuote].classList.add("activeFade"), 1000)
                setTimeout(() => this.dot[numGuote].classList.add("activeFade"), 1000)
                this.cards[numGuote].classList.remove("activeFade")
                this.dot[numGuote].classList.remove("activeFade")
                if (this.cards[numGuote + 1]) {
                    numGuote++
                } else {
                    numGuote = 0
                }

            } else {
                this.cards[0].remove()
                let preFirstEl = this.cards[0].cloneNode(true)
                preFirstEl.classList.add("clone")
                this.sliderCard.insertAdjacentElement("beforeend", preFirstEl)
                this.cards[this.cards.length - 2].classList.remove("clone")
            }
        }
        if (!this.settings.fadeOut) {
            this.shuffleCard()
        }
    }

    autoPlaySlider() {
        clearInterval(localStorage[this.slider.id + "interval"])

        if (this.settings.fadeOut) {
            let numGuote = 0
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].classList.contains("activeFade")) {
                    numGuote = i
                }
            }
            const setActive = (index) => {
                setTimeout(() => this.cards[index].classList.add("activeFade"), 1000)
                setTimeout(() => this.dot[index].classList.add("activeFade"), 1000)
            }
            this.sliderInterval = setInterval(() => {
                this.cards[numGuote].classList.remove("activeFade")
                this.dot[numGuote].classList.remove("activeFade")
                if (this.cards[numGuote + 1]) {
                    numGuote++
                } else {
                    numGuote = 0
                }
                setActive(numGuote)
            }, this.settings.autoplayspeed)
        } else {
            this.sliderInterval = setInterval(() => {
                this.changeSlide("right")
            }, this.settings.autoplayspeed)
        }
        localStorage[this.slider.id + "interval"] = this.sliderInterval
    }

    touchSlider(e) {
        if ((this.touchPoint + 20) < e.touches[0].pageX) {
            this.changeSlide('left')
            this.slider.removeEventListener('touchmove', this.touchSlider)

        } else if ((this.touchPoint - 20) > e.touches[0].pageX) {
            this.changeSlide('right')
            this.slider.removeEventListener('touchmove', this.touchSlider)
        }
    }
}

window.onresize = function (){
    sliderPeople.init()
    sliderBrands.init()
    sliderQuotes.init()
}

let sliderPeople = new InfinitySlider(".slider", {
    arrows: true,
    baseCardWidth: "263rem",
    slideToScrollAll: false,
    autoplay: true,
    gap: 20
})
let sliderBrands = new InfinitySlider(".sliderBrand", {
    gap: 45,
    slideToScrollAll: true,
    baseCardWidth: "127rem",
    autoplay: true,
    arrows: false
})
let sliderQuotes = new InfinitySlider(".sliderQuotes", {
    autoplay: true,
    autoplayspeed: 4000,
    fadeOut: true,
    dots: true,
    distanceDots: 40,
    arrows: false
})

sliderPeople.init()
sliderBrands.init()
sliderQuotes.init()