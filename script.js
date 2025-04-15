// script.js
import {
  auth,
  provider,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from './firebase-config.js';

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const journalSection = document.getElementById('journal-section');
const submitBtn = document.getElementById('submit-entry');
const responseBox = document.getElementById('response-box');

let userEmail = null;

// Set persistent login using local persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Auto login check
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail = user.email;
    document.getElementById('login-section').classList.add('hidden');
    journalSection.classList.remove('hidden');
    console.log("User already logged in as:", userEmail);
  }
});

loginBtn.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    userEmail = user.email;
    document.getElementById('login-section').classList.add('hidden');
    journalSection.classList.remove('hidden');
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Check console for details.");
  }
});

logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    userEmail = null;
    journalSection.classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
    responseBox.innerHTML = "";
    document.getElementById('journal-text').value = "";
    console.log("User logged out.");
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Logout failed. See console for details.");
  }
});

submitBtn.addEventListener('click', async () => {
  const entry = document.getElementById('journal-text').value;
  if (!entry.trim()) {
    alert("Please write something first.");
    return;
  }

  responseBox.innerHTML = "<em>Processing...</em>";
  console.log("Submitting journal entry:", entry);

  try {
    const res = await fetch('https://journalgemini-989444157242.us-central1.run.app/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry, email: userEmail })
    });

    const data = await res.json();
    console.log("Response from server:", data);

    if (data.advice) {
      responseBox.innerHTML = `<div class="advice">${data.advice.replace(/\n/g, '<br>')}</div>`;
    } else {
      responseBox.textContent = "No advice returned.";
    }
  } catch (err) {
    console.error("Error contacting backend:", err);
    responseBox.textContent = "Error processing request.";
  }
});
