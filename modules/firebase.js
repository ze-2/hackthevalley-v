import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getDatabase, ref, set, push, onValue, get } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";
import { splitStr } from "./topics.js";


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


function updateTopics(){
  const topRef = ref(db, "topics/");
  onValue(topRef, (topics) => {
    var itemsContainer = document.querySelector(".items-container")

    topics.forEach(topic => {
      var div = document.createElement("div");
      var prodPrice = document.createElement("h1");
      var prodName = document.createElement("h2");
      var prodDesc = document.createElement("p");
      var storeName = document.createElement("h4");
      var storeLocation = document.createElement("a");
      var image = document.createElement("img");
      var contact = document.createElement("a");

      prodPrice.innerHTML = "$" + topic.val().prodPrice;
      prodName.innerHTML = topic.val().prodName;
      prodDesc.innerHTML = topic.val().prodDesc;
      storeName.innerHTML = topic.val().storeName;

      var storeLink = document.createTextNode("View on Google Maps");
      storeLocation.appendChild(storeLink);
      storeLocation.title = "View on Google Maps";
      storeLocation.href = "https://www.google.com/maps/place/?q=place_id:" + topic.val().storeLocation;

      var contactLink = document.createTextNode("Contact poster");
      contact.appendChild(contactLink);
      contact.title = "Contact poster";
      contact.href = "mailto:" + topic.val().contact;
      if (topic.val().imageURL == '') {
        image.src = 'https://firebasestorage.googleapis.com/v0/b/hackthevalley-17a91.appspot.com/o/none.png?alt=media&token=4ceca010-db23-4ffa-9789-d4fd728ea100';
      } else {
        image.src = topic.val().imageURL;
      }

      div.appendChild(image);
      div.appendChild(prodPrice);
      div.appendChild(prodName);
      div.appendChild(prodDesc);
      div.appendChild(storeName);
      div.appendChild(storeLocation);
      div.appendChild(contact);

      div.classList.add('card')

      itemsContainer.appendChild(div)
    });

  });
}

function submitTopic(prodName, prodDesc, prodPrice, storeName, storeLocation, tags, imageURL, contact) {
  const postListRef = ref(db, 'topics');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    prodName: prodName,
    prodDesc: prodDesc,
    prodPrice: prodPrice,
    storeName: storeName,
    storeLocation: storeLocation,
    imageURL: imageURL,
    contact: contact,
    tags: splitStr(tags)
  });
  setTimeout(() => {window.location.href='../pages/home.html'}, 1000);
}

function createDiv(prodName, prodDesc, prodPrice, storeName, storeLocation, imageURL, contact){
  var itemsContainer = document.querySelector(".items-container")
  var div = document.createElement("div");
      var prodPriceEle = document.createElement("h1");
      var prodNameEle = document.createElement("h2");
      var prodDescEle = document.createElement("p");
      var storeNameEle = document.createElement("h4");
      var storeLocationEle = document.createElement("a");
      var image = document.createElement("img");
      var contactEle = document.createElement("a");

      prodPriceEle.innerHTML = "$" + prodPrice;
      prodNameEle.innerHTML = prodName;
      prodDescEle.innerHTML = prodDesc;
      storeNameEle.innerHTML = storeName;

      var storeLink = document.createTextNode("View on Google Maps");
      storeLocationEle.appendChild(storeLink);
      storeLocationEle.title = "View on Google Maps";
      storeLocationEle.href = "https://www.google.com/maps/place/?q=place_id:" + storeLocation;

      var contactLink = document.createTextNode("Contact poster");
      contactEle.appendChild(contactLink);
      contactEle.title = "Contact poster";
      console.log(contact)
      contactEle.href = "mailto:" + contact;

      if (imageURL == '') {
        image.src = 'https://firebasestorage.googleapis.com/v0/b/hackthevalley-17a91.appspot.com/o/none.png?alt=media&token=4ceca010-db23-4ffa-9789-d4fd728ea100';
      } else {
        image.src = imageURL;
      }
      div.appendChild(image);
      div.appendChild(prodPriceEle);
      div.appendChild(prodNameEle);
      div.appendChild(prodDescEle);
      div.appendChild(storeNameEle);
      div.appendChild(storeLocationEle);
      div.appendChild(contactEle);

      // to add css classes
      div.classList.add('card')
    itemsContainer.appendChild(div);
}

function search(search) {
  search = search.toLowerCase()
  get(ref(db), `topics/`).then((topics) => {
    if (topics.exists()) {
      var success = false;
      topics.forEach(topic => {
        topic.forEach(topMeta => {
          if (topMeta.val().tags.includes(search) || topMeta.val().storeName.toLowerCase().includes(search.toLowerCase()) || topMeta.val().prodName.toLowerCase().includes(search.toLowerCase()) || topMeta.val().prodDesc.toLowerCase().includes(search.toLowerCase())) {
            success = true;
            console.log("trying to add div")
            createDiv(topMeta.val().prodName, topMeta.val().prodDesc, topMeta.val().prodPrice, topMeta.val().storeName, topMeta.val().storeLocation, topMeta.val().imageURL, topMeta.val().contact);
          }
        });
      });
      if (!success) {
        var itemsContainer = document.querySelector(".items-container")
        var noResult = document.createElement("h3");
        var div = document.createElement("div");
        noResult.innerHTML = 'No results found';
        div.appendChild(noResult);
        itemsContainer.appendChild(div);
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export {submitTopic, updateTopics, search}