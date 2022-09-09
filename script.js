const main = document.querySelector("main"),
  voicesSelect = document.getElementById("voices"),
  textarea = document.getElementById("text"),
  readBtn = document.getElementById("read"),
  toggleBtn = document.getElementById("toggle"),
  languajeBtn = document.getElementById("languaje"),
  closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpeg",
    english: "I'm Thirsty",
    espanol: "Tengo sed",
  },
  {
    image: "./img/food.jpeg",
    english: "I'm Hungry",
    espanol: "tengo hambre",
  },
  {
    image: "./img/sleep.jpg",
    english: "I'm Tired",
    espanol: "Estoy cansado",
  },
  {
    image: "./img/hurt.jpeg",
    english: "I'm Hurt",
    espanol: "Estoy lastimado",
  },
  {
    image: "./img/happy.jpeg",
    english: "I'm Happy",
    espanol: "Estoy feliz",
  },
  {
    image: "./img/angry.jpeg",
    english: "I'm Angry",
    espanol: "Estoy enojado",
  },
  {
    image: "./img/sad.jpg",
    english: "I'm Sad",
    espanol: "Estoy triste",
  },
  {
    image: "./img/scared.jpeg",
    english: "I'm Scared",
    espanol: "Tengo miedo",
  },
  {
    image: "./img/outside.jpeg",
    english: "I Want To Go Outside",
    espanol: "Quiero salir",
  },
  {
    image: "./img/home.jpeg",
    english: "I Want To Go Home",
    espanol: "Quiero ir a casa",
  },
  {
    image: "./img/school.jpeg",
    english: "I Want To Go To School",
    espanol: "Quiero ir a la escuela",
  },
  {
    image: "./img/grandma.jpeg",
    english: "I Want To Go To Grandmas",
    espanol: "Quiero ir a la casa de la abuela",
  },
];

let setLang = "eng";

function createData() {
  data.forEach(createBox);
}

// Create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, english, espanol } = item;

  let text = english;

  if (setLang === "esp") {
    text = espanol;
  }

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

createData();

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// Close button
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

// Clear Main
function clearMain() {
  main.innerHTML = "";
}

languajeBtn.addEventListener("click", () => {
  clearMain();
  languajeBtn.innerText = "";

  if (setLang === "eng") {
    setLang = "esp";
    message.voice = voices.find((voice) => voice.name === "Diego");
    languajeBtn.innerText = "Español";
  } else {
    setLang = "eng";
    message.voice = voices.find((voice) => voice.name === "Alex");
    languajeBtn.innerText = "English";
  }

  createData();
});

getVoices();
