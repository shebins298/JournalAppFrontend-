// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrty5gafWohRkG496ho9RuBqwU35fZBcA",
  authDomain: "journalapp-5fbc2.firebaseapp.com",
  projectId: "journalapp-5fbc2",
  appId: "1:195163469513:web:6a8275c048675c25a43f18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get authentication instance
const auth = getAuth(app);

// Google Authentication Provider
const provider = new GoogleAuthProvider();

// Export Firebase services and auth-related methods
export {
  auth, 
  provider, 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut
};
