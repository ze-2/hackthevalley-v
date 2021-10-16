
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { logout, updateTopics } from "./firebase.js";
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener('click',logout)
console.log(getAuth())



updateTopics();
