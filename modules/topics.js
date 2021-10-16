import { submitTopic } from '../modules/firebase.js'
function splitStr(str){
    str = str.toLowerCase()
    console.log(str)
    let arr = str.split(" ");
    console.log(arr)
    return arr;
}

function sub(){
    let prodName = document.querySelector(".prod-name").value
    let prodDesc = document.querySelector(".prod-desc").value
    let prodPrice = document.querySelector(".prod-price").value
    let storeName = document.querySelector(".store-name").value
    let storeLocation = document.querySelector(".store-location").value
    let country = document.querySelector(".country").value
    let city = document.querySelector(".city").value
    let tags = document.querySelector(".tags").value
    if (prodDesc == "" || prodName == "" || prodPrice == "" || storeName == "" ||
    storeLocation == "" || country == "" || city == "") {
        alert("All fields must be filled!");
        return false;
    } else {
        submitTopic(prodName, prodDesc, prodPrice, storeName, storeLocation, country, city, tags);
        console.log("submitted topic to firebase")
        setTimeout(() => {window.location.href='../home.html'}, 1000);
    }
}

export {sub, splitStr}