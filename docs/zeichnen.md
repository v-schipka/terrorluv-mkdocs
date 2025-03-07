---
icon: material/draw-pen
---

<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>

# Zeichnen

<div>
<button class="button" id="generate-btn">Gib uns ein Thema!</button>
<button class="button" id="challenge-btn">Gib mir eine Herausforderung!</button>
<button class="button" id="reset-btn">Thema zurücksetzen!</button>
<p id="prompt-display">Thema #1: </p>
<p id="prompt-display2">Thema #2: </p> 
<p id="challenge-display">Deine Herausforderung: </p>
<hr>
</div>


#### Wie funktioniert die Künstler-Challenge?

Einmal im Monat werden 2 zufällige Themen aus einem Themen-Pool gezogen. 
Um ein Thema in den Pool einzukippen, poste das Thema einfach in dem #zeichnen-tipps-und-tricks Kanal in Discord.

Sobald die Themen verfügbar sind, suche dir eines aus und klicke auf **[Gib mir eine Herausforderung!]**, um eine zufällige Technik für dein Bild zu erhalten.
Am Ende des Monats werden die fertigen Bilder im #zeichnen-challenge-bilder Kanal gepostet.

<script>
const prompts = [
  "Girlpower",
  "Frühlingserwachen",
  "Janosch",
  "Frühblüher",
  "Vogelkonzert",
  "Hotarubi",
  "Mortkranken",
  "Disney",
  "One Piece"
];

const challenges = [
  "schwarz/weiß",
  "Bleistift",
  "Bunt(stift)"
];

// Firebase Configuration
const firebaseConfig = {
apiKey: "AIzaSyDNSlPCgxiA7l95236N6blyIUjcpx9rsnM",
authDomain: "terrorluv-15727.firebaseapp.com",
databaseURL: "https://terrorluv-15727-default-rtdb.firebaseio.com",
projectId: "terrorluv-15727",
storageBucket: "terrorluv-15727.firebasestorage.app",
messagingSenderId: "252619984030",
appId: "1:252619984030:web:dfd02eede70cfada68bf8f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const promptRef = db.ref("currentPrompt");

// Get elements
const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("reset-btn");
const challengeBtn = document.getElementById("challenge-btn");
const promptDisplay = document.getElementById("prompt-display");
const promptDisplay2 = document.getElementById("prompt-display2");
const challengeDisplay = document.getElementById("challenge-display");

// Display the current prompts from Firebase
promptRef.on("value", (snapshot) => {
const promptsData = snapshot.val();

if (promptsData && promptsData.prompt1 && promptsData.prompt2) {
    promptDisplay.textContent = "Thema #1: " + promptsData.prompt1;
    promptDisplay2.textContent = "Thema #2: " + promptsData.prompt2;
    generateBtn.disabled = true;
} else {
    promptDisplay.textContent = "Thema #1: ";
    promptDisplay2.textContent = "Thema #2: ";
    generateBtn.disabled = false;
}
});

// Check localStorage for a saved challenge
const savedChallenge = localStorage.getItem("currentChallenge");
if (savedChallenge) {
challengeDisplay.textContent = `Deine Herausforderung: ${savedChallenge}`;
}

// Event listener for "Get A Prompt" button
generateBtn.addEventListener("click", () => {
if (prompts.length < 2) {
    alert("Not enough prompts to select two different ones!");
    return;
}

let index1 = Math.floor(Math.random() * prompts.length);
let index2;
do {
    index2 = Math.floor(Math.random() * prompts.length);
} while (index1 === index2); // Ensure different prompts

const selectedPrompt1 = prompts[index1];
const selectedPrompt2 = prompts[index2];

// Save both prompts to Firebase
promptRef.set({
    prompt1: selectedPrompt1,
    prompt2: selectedPrompt2
});
});

// Event listener for "Reset" button
resetBtn.addEventListener("click", () => {
promptRef.remove(); // Clear the prompts from Firebase
promptDisplay.textContent = "Thema #1: ";
promptDisplay2.textContent = "Thema #2: ";
challengeDisplay.textContent = "Deine Herausforderung: ";
generateBtn.disabled = false;
});

// Event listener for "Get A Challenge" button
challengeBtn.addEventListener("click", () => {
const randomIndex = Math.floor(Math.random() * challenges.length);
const selectedChallenge = challenges[randomIndex];

challengeDisplay.textContent = `Deine Herausforderung: ${selectedChallenge}`;
localStorage.setItem("currentChallenge", selectedChallenge); // Save the challenge to localStorage
});
</script>