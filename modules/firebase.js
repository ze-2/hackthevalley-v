import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";
import { deleteAllCookies, setCookie } from "./cookies.js";
import { splitStr } from "./topics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2QJoM4F3HWT5gVmzd_VkHr9TGQmh9JQI",
  authDomain: "hackthevalley-17a91.firebaseapp.com",
  databaseURL: "https://hackthevalley-17a91-default-rtdb.firebaseio.com",
  projectId: "hackthevalley-17a91",
  storageBucket: "hackthevalley-17a91.appspot.com",
  messagingSenderId: "713963780165",
  appId: "1:713963780165:web:d185056016530d2131cb2c"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app)

function signUp(){
    console.log('signing up')
    var email = document.querySelector(".su-email").value;
    var password = document.querySelector(".su-password").value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode)
        console.log(errorMessage)
      });
}

function signIn(){
  const auth = getAuth();
  keepAuth()
  var email = document.querySelector(".si-email").value;
  var password = document.querySelector(".si-password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("signed in")
      console.log(user)
      console.log(auth)
      // ...
      document.cookie = "user_email=" + email + "; path=./index.html";
      document.cookie = "password=" + password + "; path=./index.html";
      setCookie("user_email", email, "10")
      setCookie("paddword", password, "10")
      window.location.href='/pages/home.html'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });

}

function autoSignIn(auth, email, password){
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("auto signed in")
      console.log(user)
      console.log(auth)
      // ...
      console.log("logged in as " + email)
      var logged = document.querySelector('.logged-in')
      logged.innerHTML = "logging you in!"
      setTimeout(() => {window.location.href='/pages/home.html'}, 1000);

    })
    .catch((error) => {
      console.log('cannot autosignin')
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
}

function keepAuth(){
  const auth = getAuth();
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function logout(){
  const auth = getAuth();
  signOut(auth).then(() => {
      console.log('logging out')
      deleteAllCookies()
      setTimeout(() => {window.location.href='../index.html'}, 1000);

    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

var selectedTopic = "";

function updateTopics(){
  const topRef = ref(db, "topics/");
  onValue(topRef,(topics)=>{
    var itemsContainer = document.querySelector(".items-container")

    topics.forEach(topic=>{
      var div = document.createElement("div");
        var prodPrice = document.createElement("h1");
        var prodName = document.createElement("h2");
        var prodDesc = document.createElement("p");
        var storeName = document.createElement("h4");
        var storeLocation = document.createElement("h3");
        var country = document.createElement("h5");
        var city = document.createElement("h5");

      prodPrice.innerHTML = topic.val().prodPrice;
      prodName.innerHTML = topic.val().prodName;
      prodDesc.innerHTML = topic.val().prodDesc;
      storeName.innerHTML = topic.val().storeName;
      storeLocation.innerHTML = topic.val().storeLocation;
      country.innerHTML = topic.val().country;
      city.innerHTML = topic.val().city;

      div.appendChild(prodPrice);
      div.appendChild(prodName);
      div.appendChild(prodDesc);
      div.appendChild(storeName);
      div.appendChild(storeLocation);
      div.appendChild(country);
      div.appendChild(city);

      itemsContainer.appendChild(div)
    })

  })
}

function submitTopic(prodName, prodDesc, prodPrice, storeName, storeLocation, country, city, tags){
  set(ref(db, "topics/" + prodName),{
    prodName: prodName,
    prodDesc: prodDesc,
    prodPrice: prodPrice,
    storeName: storeName,
    storeLocation: storeLocation,
    country: country,
    city: city,
    tags: splitStr(tags)
  })
}

function createDiv(prodName, prodDesc, prodPrice, storeName, storeLocation, country, city){
  var itemsContainer = document.querySelector("items-container")
  var div = document.createElement("div");
      var prodPrice = document.createElement("h1");
      var prodName = document.createElement("h2");
      var prodDesc = document.createElement("p");
      var storeName = document.createElement("h4");
      var storeLocation = document.createElement("h3");
      var country = document.createElement("h5");
      var city = document.createElement("h5");

      prodPrice.innerHTML = prodPrice;
      prodName.innerHTML = prodName;
      prodDesc.innerHTML = prodDesc;
      storeName.innerHTML = storeName;
      storeLocation.innerHTML = storeLocation;
      country.innerHTML = country;
      city.innerHTML = city;


      div.appendChild(prodPrice);
      div.appendChild(prodName);
      div.appendChild(prodDesc);
      div.appendChild(storeName);
      div.appendChild(storeLocation);
      div.appendChild(country);
      div.appendChild(city);

      // to add css classes
      // h2.classList.add('class-name')

      div.addEventListener('click',(e)=>{
        localStorage.setItem("selectedTopic", prodName);
        console.log(selectedTopic + " is selected")
        setTimeout(() => {window.location.href='/pages/topic.html'}, 500);
      })
      itemsContainer.appendChild(div)
}

function search(tag){
  tag = tag.toLowerCase()
  console.log('searching for topics with tag ' + tag)
  get(ref(db), `topics/`).then((topics) => {
    if (topics.exists()) {
      topics.forEach(topic=>{
        topic.forEach(topMeta=>{
          console.log(topMeta.val().tags)
          if(topMeta.val().tags.includes(tag)){
            console.log("adding div")
            createDiv(topMeta.val().prodName, topMeta.val().prodDesc, topMeta.val().prodPrice, topMeta.val().storeName, topMeta.val().storeLocation, topMeta.val().country, topMeta.val().city);
          }
        })
      })
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export { signUp, signIn, autoSignIn, logout, submitTopic, updateTopics, search}