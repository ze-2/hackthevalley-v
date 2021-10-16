import { signUp, signIn, autoSignIn } from '/modules/firebase.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { getCookie } from './modules/cookies.js';

import {deleteAllCookies} from './modules/cookies.js'

const signup = document.querySelector(".signup");
signup.addEventListener('click', signUp)

const signin = document.querySelector(".signin");
signin.addEventListener('click', signIn)

let email = getCookie("user_email")
let password = getCookie("password")

if(email && password){
  console.log("Signing in...")
  console.log(email)
  setTimeout(autoSignIn(getAuth(),email,password),1000);
}
