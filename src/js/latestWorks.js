const cardsFilter = document.querySelectorAll(".worksCards")
function app () {
    const btnFilter = document.querySelectorAll(".filterCategory")

    function filter (category, items) {
        items.forEach((item) => {
            const isItemFilter = !item.classList.contains(category)
            const isShowAll = category.toLowerCase() === 'all'
            if(isItemFilter && !isShowAll) {
                item.classList.add('anim-worksCards')
            } else {
                item.classList.remove('anim-worksCards')
            }
        })

    }

    btnFilter.forEach((e) => {
        e.addEventListener("click", (el) => {
            const currentCategory = e.dataset.filter
            filter(currentCategory, cardsFilter)
    
            el.preventDefault()
        })
    })
}
app()
// class Shop {
//     constructor(product = {}) {
//         this.product = product
//     }
// }

// const shop = new Shop()
// console.log(shop)
// if (localStorage["shopProd"] ) {
//     cardsFilter.product = JSON.parse(localStorage["shopProd"])
// }

// class Shop {
//     constructor(product = {}) {
//         this.product = product;
//     }

//     addProduct(name, price, amount) { // поставка продуктов в магазин
//         this.product[name] = {"price": price, "amount": amount};
//     }

//     productList(obj) { // вывод списка продуктов на экран
//         const products = document.querySelector('#products');
//         for (const [key, value] of Object.entries(obj)) { 
//             const product = document.createElement("a");
//             product.href = "#";
//             products.appendChild(product);
//             product.innerHTML = `${key} price ${value.price} uah (available ${value.amount})`;
//         }
//     }
// };

// function rand(min,max){
//     return Math.floor(Math.random()*(max-min+1))+min
// }

// class Shop {
//     constructor(){
//         this.product = []

//     //addGoods (name, cost, count){//
//         this.creatProd = function (name, cost, count){
//         this.product[name] = {"cost": cost, "count": count}
//         // let arr = [name, cost, count]//
//         // this.product.push(arr)//
//         // return arr//
//         }
//     }
// }

// // class Shop extends Product{//
// //     constructor(){//
// //         super()//
// //         this.product = new Product ()//
// //     }//
// // }//
// var shop = new Shop()
// shop.creatProd("cucumber", 20, 100)
// shop.creatProd("apple", 10, 100)
// shop.creatProd("tomato", 23, 23)//
// shop.creatProd("banana", 23, 4)//
// shop.creatProd("pineapple", 23, 2)//
// shop.creatProd("strabwery", 23, 4)//
// console.log(shop)
// class Customer {
//     constructor(name, age){
//         this.name = name
//         this.age = age
//         this.cash = rand(20,200)   
//         this.busket = new Busket () 
//     }

// }

// class Busket  {
//     constructor () {
//         this.myBusket = []

//     }
//     creatProd (name, count){
//         this.myBusket[name] = {"price": shop.product[name].cost, "count": count}
//     }
//     delProd(name){
//         delete this.myBusket[name]

//         //this.myBusket[name] = {"price": shop.product[name].cost, "count": count}
//     }
//     // delBusProd(name, count){
//     //     delete this.myBusket[name]
//     //     this.myBusket[name] = {"price": shop.product[name].cost, "count": count}

//     // }

// }

// let customer = new Customer ("Nata", 20)
// //customer.busket.creatProd("apple",20)
// let customer2 = new Customer ("Yarik", 20)
// //customer2.busket.creatProd("apple",22)
// console.log(customer)
// console.log(customer2)

// let product = document.querySelectorAll('.worksCards')
// btnAddToProduct = document.querySelectorAll('.view')

// function addToBasket() {
//     card = getCartData()

// }
// // addToBasket()

// function getCartData() {
//     return JSON.parse(localStorage.getItem(product));
// }
// // Записываем данные в LocalStorage
// function setCartData(o) {
//     localStorage.setItem(product, JSON.stringify(o));
//     return false;
// }






// var session = {
//     'screens': [],
//     'state': true
// };
// session.screens.push({
//     'name': 'экранА',
//     'width': 450,
//     'height': 250
// });
// session.screens.push({
//     'name': 'экранБ',
//     'width': 650,
//     'height': 350
// });
// session.screens.push({
//     'name': 'экранВ',
//     'width': 750,
//     'height': 120
// });
// session.screens.push({
//     'name': 'экранГ',
//     'width': 250,
//     'height': 60
// });
// session.screens.push({
//     'name': 'экранД',
//     'width': 390,
//     'height': 120
// });
// session.screens.push({
//     'name': 'экранЕ',
//     'width': 1240,
//     'height': 650
// });

// // Преобразуем его в строку JSON с помощью метода JSON.stringify(),
// // затем сохраняем его в localStorage под именем session
// localStorage.setItem('session', JSON.stringify(session));

// // Пример того, как можно преобразовать строку, полученную с помощью метода
// // JSON.stringify() и сохранённую в localStorage обратно в объект
// var restoredSession = JSON.parse(localStorage.getItem('session'));

// // Переменная restoredSession содержит объект, который был сохранён
// // в localStorage
// console.log(restoredSession);