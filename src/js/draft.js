// let sliders = document.querySelector(".slider-card"),
//     cards = document.querySelectorAll(".ap"),
//     btnLeft = document.querySelector(".cards-slider.left"),
//     btnRight = document.querySelector(".cards-slider.right"),
//     offs = 0,
//     step = 0,
//     heightCards = cards[0].getBoundingClientRect().height,
//     widthCards = cards[0].getBoundingClientRect().width,
//     sliderWidth = sliders.getBoundingClientRect().width,
//     cardsCount = Math.floor(sliderWidth / widthCards),
//     distanceCards = (widthCards * cardsCount) / (cardsCount - 1),
//     sliderCard = [],
//     cardsLength = cards.length

// console.log(cards)

// for (let i = 0; i<cardsLength; i++) {
//   sliderCard[i] = cards[i]
//   //cards[i]
//   //console.log(sliderCard[i]);
// }

// function draw(){
//     let div = document.createElement('div');
//     div = sliderCard[sliderCard.length-1];
//     div.classList.add('.slider-card');
//     div.style.left = 263 + 'px';
//     // console.log(div);
//     sliders.appendChild(div); 
//     if (step + 1 == sliderCard.length){
//         step = 0
//     } else {
//         step ++
//     }
//     offs = 1
// }
// draw()
// draw()



// function left() {
//     document.onclick = null;
//     // 
//     let slider2 = document.querySelectorAll('.slider-card')
//     let offset2 = -1;
//     // console.log(slider2.length);
//     for (let i = 0; i<slider2.length; i++) {
//       slider2[i].style.left = offset2*263 - 263 + 'px'
//       offset2 ++;
//     }
//     setTimeout(function() {
//       slider2[0]
//       draw()
//       document.onclick = left
//     }, 1000)
    
// }

// document.onclick = left



// let items = document.querySelector(".items"),
//     item = document.querySelectorAll(".item"),
//     leftArrow = document.querySelector(".cards-slider.left"),
//     rightArrow = document.querySelector(".cards-slider.right"),
//     offs = 0,
//     step = 0,
//     // heightCards = cards[0].getBoundingClientRect().height,
//     // widthCards = cards[0].getBoundingClientRect().width,
//     // sliderWidth = sliders.getBoundingClientRect().width,
//     // cardsCount = Math.floor(sliderWidth / widthCards),
//     // distanceCards = (widthCards * cardsCount) / (cardsCount - 1),
//     // sliderCard = [],
//     //cardsLength = cards.length,
//     itemLength = item.length,
//     slider = []
//     for (let i = 0; i<itemLength; i++) {
//       slider[i] = item[i];
//       // console.log(slider[i]);
//       //item[i].remove();
//     }
    
    
//     function burgerSlider() {
//       let div = document.createElement('div');
//       div = slider[slider.length-1];
//       div.classList.add('item');
//       div.style.left = -263 + 'px';
//       // console.log(div);
//       document.querySelector('.items').appendChild(div); 
      
      
//       div = slider[step];
//       div.classList.add('item');
//       div.style.left = offs*100 + 'px';
//       // console.log(div);
//       document.querySelector('.items').appendChild(div); 
//       div = slider[step+1];
//       div.classList.add('item');
//       div.style.left = offs*263 + 263 + 'px';
//       // console.log(div);
//       document.querySelector('.items').appendChild(div); 
//       offs = 1;
      
//     }
//     function burgerSliderL() {
//       console.log(step);
//       if (step == (slider.length-4)) {
//         step = 1;
//       } else {
//         if (step == (slider.length-4)) {
//           step = 0;
//         } else {
//           step = (step +3);
//         }
//       }
//       console.log(step);
//       let div = document.createElement('div');
//       div = slider[step];
//       div.classList.add('item');
//       div.style.left = offs*100 + 'px';
//       // console.log(div);
//       document.querySelector('.items').appendChild(div); 
        
//       if (step == 0) {
//         step = (slider.length-4);
//       } else {
//         step = (step - 4);
//       }
//       console.log(step);
//       offs = 1;
//     }
    
//     function left() {
//       leftArrow.onclick = null;
//       // 
//       let slider2 = document.querySelectorAll('.item');
//       let offs2 = -1;
//       // console.log(slider2.length);
//       for (let i = 0; i<slider2.length; i++) {
//         slider2[i].style.left = offs2*263 - 263 + 'px';
//         offs2 ++;
//       }
//       setTimeout(function() {
//         slider2[0];
//         burgerSliderL();
//         leftArrow.onclick = left;
//       }, 1000);
      
//     }
    
//     function burgerSliderR() {
//       console.log(step);
//       if (step == 0) {
//         step = (slider.length-2);
//       } else {
//         if (step == 1) {
//           step = (slider.length-4);
//         } else {
//           step = (step -2);
//         }
//       }
//       console.log(step);
//       let offs = -1;
//       let div = document.createElement('div');
//       div = slider[step];
//       div.classList.add('item');
//       div.style.left = offs*263 + 'px';
//       // console.log(div);
//       document.querySelector('.items').insertBefore(div, items.firstElementChild);
//       if (step == (slider.length-4)) {
//           step = 0;
//        } else {
//          step = (step+1);
//        }
//       console.log(step);
//       offs = 1;
//     }
    
//     function right() {
//       rightArrow.onclick = null;
      
//       let slider2 = document.querySelectorAll('.item');
//       let offs2 = (slider2.length-4);
     
//       for (let i = (slider2.length-4); i>=0; i--) {
//         slider2[i].style.left = offs2*263 + 'px';
//         offs2 --;
//       }
//       setTimeout(function() {
//         slider2[(slider2.length-4)];
//          burgerSliderR();
//         rightArrow.onclick = right;
//       }, 1000);
//     }
    
    
//     burgerSlider();
//     step = 0;
    
//     leftArrow.onclick = left;
//     rightArrow.onclick = right;




// let offs = 0,
//     step = 0
//     slider = document.querySelector(".slider-card"),
//     btnLeft = document.querySelector(".slider-card.left"),
//     btnRight = document.querySelector(".slider-card.right"),
//     cards = document.querySelectorAll(".ap")
//     sliderCard = []
//     //cardsLength = cards.length


// for (let i = 0; i<cards.length; i++) {
//     sliderCard[i] = cards[i]
//     //cards[i].remove()
//     //console.log(sliderCard[i])
//     }
    
// function draw(){
//     let div = document.createElement('div')
//     div = sliderCard[sliderCard.length - 1]
//     div.classList.add('.slider-card')
//     div.style.left = 263 + 'px'
//     // console.log(div);
//     slider.appendChild(div)
//     if (step + 1 == sliderCard.length){
//         step = 0
//     } else {
//         step++
//     }
//     offs = 1
// }
// draw()
// draw()
// function left() {
//     //document.onclick = null
    
//     let slider2 = document.querySelectorAll('.slider-card')
//     let offset2 = -1
//     console.log(slider2)
//     for (let i = 0; i < slider2.length; i++) {
//         slider2[i].style.left = offset2 * 263 - 263 + 'px'
//         offset2++;
//     }
//     setTimeout(function() {
//         slider2[0].remove()
//         draw()
//         document.onclick = left
//     }, 1000)
    
// }

// document.onclick = left





// let viewport = document.querySelector(".slider-card").offsetWidth;
// let btnLeft = document.querySelector(".cards-slider.left")
// let btnRight = document.querySelector(".cards-slider.right")

// let slides = document.querySelectorAll(".ap")
// let sliders = []


// for (let i = 0; i < slides.length; ++i) {
//     sliders[i] = slides[i]
//     slides[i]
// }


// let step = 0
// let offs = 0
 
// function drowL() {
//     let slide = document.createElement("div");
//     slide.classList.add("ap")
//     slide.appendChild(sliders[step])
//     slide.style.left = offs * viewport + "px"
//     document.querySelector(".slider-card").appendChild(slide)
//     if (step + 1 == slides.length) {
//         step = 0
//     } else { 
//         step++
//     }
//     offs = 1
// }

// drowL()

// function left() {
//     btnLeft.removeEventListener('click', left)
//     let slides2 = document.querySelectorAll(".ap")
//     let offset2 = 0
//     for (let i = 0; i < slides2.length; i++) {
//         slides2[i].style.left = offset2 * viewport - viewport + "px"
//         offset2++
//     } 
//     setTimeout(function () {
//         slides2[0].remove()
//         drowL()
//         btnLeft.addEventListener("click", left)

//     }, 1000)
// }





// function drowR() {
//     let slide = document.createElement("div");
//     slide.classList.add("ap")
//     slide.appendChild(sliders[step])
//     slide.style.right = offs * viewport + "px"
//     document.querySelector(".slider-card").appendChild(slide)
//     if (step + 1 == slides.length) {
//         step = 0
//     } else { // Иначе
//         step--
//     }
//     offs = 1
// }

// drowR()


// function right() {
//     btnRight.addEventListener("click", right)
//     let slides2 = document.querySelectorAll(".ap")
//     let offset2 = slides2.length-1
//     for (let i = 0; i < slides2.length; i++) {
//         slides2[i].style.right = offset2 * viewport + "px"
//         offset2--
//     } 
//     setTimeout(function () {
//         slides2[0].remove()
//         drowR()
//         btnRight.addEventListener("click", right)
        
//     }, 1000)
// }


// btnLeft.addEventListener("click", left)
// btnRight.addEventListener("click", right)



//Slider Top My

// let positionCards = 0,
//     cards = document.querySelectorAll(".ap"),
//     slider = document.querySelector(".slider-card"),
//     sliderWidth = slider.getBoundingClientRect().width,
//     widthCards = cards[0].getBoundingClientRect().width,
//     constCardWh = widthCards,
//     btnLeft = document.querySelector(".left"),
//     btnRight = document.querySelector(".right"),
//     cardsCount = Math.floor(sliderWidth / constCardWh),
//     distanceCards = cardsCount == 1 ? 20 : (sliderWidth - (widthCards * cardsCount)) / (cardsCount - 1)
//     firstClone = cards[cards.length - 1].cloneNode(true)
//     console.log(constCardWh)
// slider.insertAdjacentElement("afterbegin", firstClone)

// // if (cards.length > cardsCount){
// //     positionCards -= (distanceCards + widthCards)
// //     let firstEl = cards[cards.length - 1].cloneNode(true)
// //     slider.insertAdjacentElement("afterbegin", firstEl)
// // }
// function infinitySlider() {
// let cards = document.querySelectorAll(".ap")
//     sliderWidth = slider.getBoundingClientRect().width
//     cardsCount = Math.floor(sliderWidth / constCardWh)
//     positionCards -= (distanceCards + widthCards)
//     cards.forEach(card => {
//         if (cardsCount == 1){
//             card.style.width = 100 + "%"
//         } else if (cardsCount == 2){
//             card.style.width = 45 + "%"
//         } else if (cardsCount == 3){
//             card.style.width = 31 + "%"
//         } else {
//             card.style.width = "auto"
//         }
//     })
//     let heightCards = cards[0].getBoundingClientRect().height
//     widthCards = cards[0].getBoundingClientRect().width
//     slider.style.height = heightCards + "px"

//     distanceCards = cardsCount == 1 ? 20 : (sliderWidth - (widthCards * cardsCount)) / (cardsCount - 1)

//     function shuffleCard() {
//         positionCards = 0 
//         if (cards.length -1 > cardsCount){
//             positionCards -= (distanceCards + widthCards)
//             btnLeft.style.display = "block"
//             btnRight.style.display = "block"

//         } else {
//             btnLeft.style.display = "none"
//             btnRight.style.display = "none"
//         }
//         cards = document.querySelectorAll(".ap")
//         cards.forEach(card => {
//             card.style.left = positionCards + 'px'
//             positionCards += distanceCards + widthCards
            
//         })
//     }
//     shuffleCard()
//     function changeSlide(direction){
//         if (direction == "left"){
//             cards[cards.length -1].remove()
//             let prelastEl = cards[cards.length - 2].cloneNode(true) // bo pislya remove lenght ne obnovilca
//             slider.insertAdjacentElement("afterbegin", prelastEl)
            
//         } else if (direction == "right"){
//             cards[0].remove()
//             let preFirstEl = cards[1].cloneNode(true)
//             slider.insertAdjacentElement("beforeend", preFirstEl)
//         }
//         shuffleCard()
//     }
    
//     btnLeft.onclick = function (){
//         changeSlide ("left")
//     }
//     btnRight.onclick = function (){
//         changeSlide ("right")
//     }
// }
// window.onresize = infinitySlider
// infinitySlider()

//Olya Slider
// const prevBtnSlider = document.querySelector("#left");
// const nextBtnSlider = document.querySelector("#right");
// let sliderCards = document.querySelectorAll(".ap"),
//     sliderContainer = document.querySelector(".slider-card"),
//     widthSliderContainer = sliderContainer.getBoundingClientRect().width,
//     widthCards = sliderCards[0].getBoundingClientRect().width,
//     constCardWidth = widthCards,
//     cardsCount = Math.floor(widthSliderContainer / constCardWidth),
//     distanceCards = (cardsCount == 1) ? 20 : (widthSliderContainer - (widthCards * cardsCount)) / (cardsCount - 1),
//     positionCards = 0 - (distanceCards + widthCards),    
//     firstEl = sliderCards[sliderCards.length - 1].cloneNode(true);

// console.log(distanceCards);
// sliderContainer.insertAdjacentElement("afterbegin", firstEl);

// function infinitySlider () {
//     sliderCards = document.querySelectorAll(".ap");
//     widthSliderContainer = sliderContainer.getBoundingClientRect().width;
//     cardsCount = Math.floor(widthSliderContainer / constCardWidth);
    
//     sliderCards.forEach(card => {
//         if (cardsCount == 1) {
//             card.style.width = 100 + "%";
//         } else if (cardsCount == 2) {
//             card.style.width = 47 + "%";
//         } else if (cardsCount == 3) {
//             card.style.width = 31 + "%";
//         } else {
//             card.style.width = "auto";
//         }
//     });
//     let heightCards = sliderCards[0].getBoundingClientRect().height;
//     widthCards = sliderCards[0].getBoundingClientRect().width;
//     sliderContainer.style.height = heightCards + 'px';

    
//     distanceCards = (cardsCount == 1) ? 20 : (widthSliderContainer - (widthCards * cardsCount)) / (cardsCount - 1);
    
//     function shuffleCard () {
//         positionCards = 0 - (distanceCards + widthCards);
//         if (sliderCards.length - 1 > cardsCount) {
//             prevBtnSlider.style.display = "block";
//             nextBtnSlider.style.display = "block";
//         } else {
//             prevBtnSlider.style.display = "none";
//             nextBtnSlider.style.display = "none";
//         }

//         sliderCards = document.querySelectorAll(".ap");
//         sliderCards.forEach(card => {
//             card.style.left = positionCards + 'px';
//             positionCards += (distanceCards + widthCards);
//         });
//     }
//     shuffleCard();

//     function changeSlide (direction) {
//         if (direction == "left") {
//             sliderCards[sliderCards.length - 1].remove();
//             let preLastEl = sliderCards[sliderCards.length - 2].cloneNode(true);
//             sliderContainer.insertAdjacentElement("afterbegin", preLastEl);
//         } else if (direction == "right") {
//             sliderCards[0].remove();
//             let preFirstEl = sliderCards[1].cloneNode(true);
//             sliderContainer.insertAdjacentElement("beforeend", preFirstEl);
//         }
//         shuffleCard();
//     }
//     prevBtnSlider.onclick = function () {
//         changeSlide("left");
//     }
//     nextBtnSlider.onclick = function () {
//         changeSlide("right");
//     }
// }

// window.onresize = infinitySlider ;
// infinitySlider ();



// jQuery slider slick
// function $(select) {
//     let elem = document.querySelectorAll(select)
//     if(elem.length == 1){
//         return elem[0]
//     }
//     return elem
// }
// $('.slider')forEach