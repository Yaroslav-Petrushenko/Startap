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
