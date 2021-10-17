import { search } from "./firebase.js";

const searchButton = document.querySelector('.search');
const searchBar = document.querySelector('.searchbar')
function searchQ() {
    let q = document.querySelector('.searchbar').value;
    search(q)
}
function reset() {
    var elem = document.querySelector(".items-container");
    elem.innerHTML = '';
    console.log('done');
}
searchButton.addEventListener('click', searchQ)
searchBar.addEventListener('click', reset)