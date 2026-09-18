import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDH2CSOcc8fzjGxynIDJwEMGTm3EK_MHqk",
    authDomain: "mural-75435.firebaseapp.com",
    projectId: "mural-75435",
    storageBucket: "mural-75435.firebasestorage.app",
    messagingSenderId: "26321529041",
    appId: "1:26321529041:web:78bd46a278fc7825477df0",
    measurementId: "G-1N2SM2LEQ7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
