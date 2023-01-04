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
        if (Object.keys(this.basketItems).length) {
            this.counter = Object.keys(this.basketItems).length
            this.basketCounter.style.opacity = '1'
            this.basketCounter.innerText = this.counter
            this.empty.style.display = 'none'
            this.tableBusket.style.display = 'block'
            this.sumaBasket.style.display = 'flex'
        } else {
            this.basketCounter.style.opacity = '0'
            this.empty.style.display = 'block'
            this.tableBusket.style.display = 'none'
            this.sumaBasket.style.display = 'none'
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


