const main = document.querySelector("main"),
  voicesSelect = document.getElementById("voices"),
  textarea = document.getElementById("text"),
  readBtn = document.getElementById("read"),
  toggleBtn = document.getElementById("toggle"),
  languajeBtn = document.getElementById("languaje"),
  genderBtn = document.getElementById("gender-btn"),
  closeBtn = document.getElementById("close"),
  data = [
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

let lang = "eng",
  gender = "m";

function createData() {
  data.forEach(createBox);
}

// Create speech boxes
function createBox(el) {
  const box = document.createElement("div");

  const { image, english, espanol } = el;

  let text = english;

  if (lang === "esp") {
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

// Set Languaje
function setLanguaje() {
  clearMain();

  if (lang === "eng") {
    lang = "esp";
    languajeBtn.innerText = "Español 🇪🇸";
    toggleBtn.innerText = "leer 🗣️";
    if (gender === "f") {
      genderBtn.innerText = "mujer 👩‍🔬";
      message.voice = voices.find((voice) => voice.name === "Monica");
    } else {
      genderBtn.innerText = "hombre 👨‍🚀";
      message.voice = voices.find((voice) => voice.name === "Diego");
    }
  } else {
    lang = "eng";
    languajeBtn.innerText = "English 🇬🇧";
    toggleBtn.innerText = "read 🗣️";
    if (gender === "f") {
      genderBtn.innerText = "female 👩‍🔬";
      message.voice = voices.find((voice) => voice.name === "Samantha");
    } else {
      genderBtn.innerText = "male 👨‍🚀";
      message.voice = voices.find((voice) => voice.name === "Alex");
    }
  }
  createData();
}

// Set gender
function setGender() {
  if (gender === "f") {
    gender = "m";
    if (lang === "eng") {
      genderBtn.innerText = "male 👨‍🚀";
      message.voice = voices.find((voice) => voice.name === "Alex");
    } else {
      genderBtn.innerText = "hombre 👨‍🚀";
      message.voice = voices.find((voice) => voice.name === "Diego");
    }
  } else {
    gender = "f";
    if (lang === "eng") {
      genderBtn.innerText = "female 👩‍🔬";
      message.voice = voices.find((voice) => voice.name === "Samantha");
    } else {
      genderBtn.innerText = "mujer 👩‍🔬";
      message.voice = voices.find((voice) => voice.name === "Monica");
    }
  }
  console.log(gender);
}

// Event Listeners
languajeBtn.addEventListener("click", () => {
  setLanguaje();
});

genderBtn.addEventListener("click", () => {
  setGender();
});

getVoices();
