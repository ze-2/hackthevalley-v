import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { submitTopic } from '../modules/firebase.js'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";

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
const storage = getStorage(app);
const storageRef = ref(storage, 'images');

function splitStr(str){
    str = str.toLowerCase()
    console.log(str)
    let arr = str.split(" ");
    console.log(arr)
    return arr;
}


const fileSelect = document.querySelector(".file-select");
if (fileSelect) {
    fileSelect.addEventListener('change', handleFileUploadChange);
}

let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}

function sub(){
    let prodName = document.querySelector(".prod-name").value
    let prodDesc = document.querySelector(".prod-desc").value
    let prodPrice = document.querySelector(".prod-price").value
    let storeName = document.querySelector(".store-name").value
    let storeLocation = document.querySelector(".store-location").value
    let tags = document.querySelector(".tags").value

    if (prodDesc == "" || prodName == "" || prodPrice == "" || storeName == "" ||
    storeLocation == "") {
        alert("All fields must be filled!");
        return false;
    } else {
        if (selectedFile === undefined) {
            var imageURL = '';
            submitTopic(prodName, prodDesc, prodPrice, storeName, storeLocation, tags, imageURL);
            console.log("submitted topic to firebase")
        } else {
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            },
            (error) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    var imageURL = downloadURL;
                    console.log(imageURL)
                    submitTopic(prodName, prodDesc, prodPrice, storeName, storeLocation, tags, imageURL);
                    console.log("submitted topic to firebase")
                });
            }
            );
        }
    }
}

export {sub, splitStr}