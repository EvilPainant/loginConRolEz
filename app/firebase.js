import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyA5jzbTJ_PrP0Rl1SFanZFNnmvpFo8euG4",
  authDomain: "mondongo-41fa9.firebaseapp.com",
  projectId: "mondongo-41fa9",
  storageBucket: "mondongo-41fa9.firebasestorage.app",
  messagingSenderId: "395024642416",
  appId: "1:395024642416:web:f10a7c1cc2280384d51fb5",
  measurementId: "G-45BX6TMW02"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)