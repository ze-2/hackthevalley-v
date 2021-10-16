import { search } from '../modules/firebase.js'


import { searchName } from '../modules/firebase.js'
let topic = localStorage.getItem("selectedTopic")
console.log(topic);
searchName(topic)