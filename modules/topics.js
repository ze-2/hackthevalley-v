import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { submitTopic } from '../modules/firebase.js'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";

const firebaseConfig = {
  no
};

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage, uuidv4());

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
    let contact = document.querySelector(".contact").value
    let storeLocation = document.querySelector(".store-location").value
    let tags = document.querySelector(".tags").value

    if (prodName == "" || prodPrice == "" || storeName == "" || contact == "") {
        alert("All fields must be filled!");
        return false;
    } else {
        if (selectedFile === undefined) {
            var imageURL = '';
            submitTopic(prodName, prodDesc, prodPrice, storeName, storeLocation, tags, imageURL, contact);
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
                    console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    var imageURL = downloadURL;
                    console.log(imageURL)
                    submitTopic(prodName, prodDesc, prodPrice, storeName, storeLocation, tags, imageURL, contact);
                    console.log("submitted topic to firebase")
                });
            }
            );
        }
    }
}

export {sub, splitStr}
