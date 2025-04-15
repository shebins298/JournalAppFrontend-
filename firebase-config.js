import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrty5gafWohRkG496ho9RuBqwU35fZBcA",
  authDomain: "journalapp-5fbc2.firebaseapp.com",
  projectId: "journalapp-5fbc2",
  appId: "1:195163469513:web:6a8275c048675c25a43f18",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Set Firebase authentication persistence to Local (session persists even after page reload)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Authentication persistence set to local.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, provider, signInWithPopup };
