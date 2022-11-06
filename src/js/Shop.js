class Shop {
    constructor (selector){
        this.shopBlock = document.querySelector(selector)
        this.shop = this.shopBlock.querySelector(".shopBlock")
        this.cardsShop = this.shopBlock.children
    }
    initShop(){
        for (let i=0; i<this.cardsShop.length; i++) {
            console.log(this.cardsShop[i]);
            
        }
    }

    addProduct(){
        
    }

    delProduct(){

    }

}
new Shop ('.shopBlock').initShop()

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
    // delBusProd(name, count){
    //     delete this.myBusket[name]
    //     this.myBusket[name] = {"price": shop.product[name].cost, "count": count}

    // }

// }