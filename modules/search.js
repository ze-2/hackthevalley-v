import { search } from "./firebase.js";

const searchButton = document.querySelector('.search');
function searchQ(){
    let q = document.querySelector('.searchbar').value;
    search(q)
}
searchButton.addEventListener('click', searchQ)