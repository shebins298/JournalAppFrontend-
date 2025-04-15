
import { auth, provider, signInWithPopup } from './firebase-config.js';

const loginBtn = document.getElementById('login-btn');
const journalSection = document.getElementById('journal-section');
const submitBtn = document.getElementById('submit-entry');
const responseBox = document.getElementById('response-box');

let userEmail = null;

loginBtn.addEventListener('click', async () => {
  try {
    console.log("Attempting login...");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    userEmail = user.email;
    console.log("Logged in as:", userEmail);

    document.getElementById('login-section').classList.add('hidden');
    journalSection.classList.remove('hidden');
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Check console for details.");
  }
});

submitBtn.addEventListener('click', async () => {
  const entry = document.getElementById('journal-text').value;
  if (!entry) {
    alert("Please write something first.");
    return;
  }

  responseBox.textContent = "Processing...";
  console.log("Submitting journal entry:", entry);

  try {
    const res = await fetch('https://journalgemini-989444157242.us-central1.run.app/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry, email: userEmail })
    });

    const data = await res.json();
    console.log("Response from server:", data);
    responseBox.textContent = data.advice || "No advice returned.";
  } catch (err) {
    console.error("Error contacting backend:", err);
    responseBox.textContent = "Error processing request.";
  }
});
