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
      var storeLocation = document.createElement("h3");
      var image = document.createElement("img");

      prodPrice.innerHTML = topic.val().prodPrice;
      prodName.innerHTML = topic.val().prodName;
      prodDesc.innerHTML = topic.val().prodDesc;
      storeName.innerHTML = topic.val().storeName;
      storeLocation.innerHTML = topic.val().storeLocation;

      image.src = topic.val().imageURL;

      div.appendChild(prodPrice);
      div.appendChild(prodName);
      div.appendChild(prodDesc);
      div.appendChild(storeName);
      div.appendChild(storeLocation);
      div.appendChild(image);

      itemsContainer.appendChild(div)
    });

  });
}

function submitTopic(prodName, prodDesc, prodPrice, storeName, storeLocation, tags, imageURL) {
  const postListRef = ref(db, 'topics');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    prodName: prodName,
    prodDesc: prodDesc,
    prodPrice: prodPrice,
    storeName: storeName,
    storeLocation: storeLocation,
    imageURL: imageURL,
    tags: splitStr(tags)
  });
}

function createDiv(prodName, prodDesc, prodPrice, storeName, storeLocation, imageURL){
  var itemsContainer = document.querySelector(".items-container")
  var div = document.createElement("div");
      var prodPriceEle = document.createElement("h1");
      var prodNameEle = document.createElement("h2");
      var prodDescEle = document.createElement("p");
      var storeNameEle = document.createElement("h4");
      var storeLocationEle = document.createElement("h3");
      var image = document.createElement("img");


      prodPriceEle.innerHTML = prodPrice;
      prodNameEle.innerHTML = prodName;
      prodDescEle.innerHTML = prodDesc;
      storeNameEle.innerHTML = storeName;
      storeLocationEle.innerHTML = storeLocation;

      image.src = imageURL;

      div.appendChild(prodPriceEle);
      div.appendChild(prodNameEle);
      div.appendChild(prodDescEle);
      div.appendChild(storeNameEle);
      div.appendChild(storeLocationEle);
      div.appendChild(image);

      // to add css classes
      // h2.classList.add('class-name')
    itemsContainer.appendChild(div);
}

function search(search){
  search = search.toLowerCase()
  get(ref(db), `topics/`).then((topics) => {
    if (topics.exists()) {
      topics.forEach(topic => {
        topic.forEach(topMeta => {
          console.log(topMeta.val().tags)
          if (topMeta.val().tags.includes(search)){
            console.log("trying to add div")
            console.log(topMeta.val().prodName, topMeta.val().prodDesc, topMeta.val().prodPrice, topMeta.val().storeName, topMeta.val().storeLocation, topMeta.val().imageURL);
            createDiv(topMeta.val().prodName, topMeta.val().prodDesc, topMeta.val().prodPrice, topMeta.val().storeName, topMeta.val().storeLocation, topMeta.val().imageURL);
          };
          if (topMeta.val().prodName.toLowerCase() == search){
            console.log("trying to add div")
            createDiv(topMeta.val().prodName, topMeta.val().prodDesc, topMeta.val().prodPrice, topMeta.val().storeName, topMeta.val().storeLocation, topMeta.val().imageURL);
          };
        });
      });
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export {submitTopic, updateTopics, search}