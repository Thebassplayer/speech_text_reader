const titleEl = document.querySelector("title");
const bodyEl = document.querySelector("body");
const h1El = document.querySelector("h1");
const mainEl = document.querySelector("main");
const voicesMenu = document.getElementById("voices");
const customMsgTextArea = document.getElementById("text");
const readCustomMsgBtn = document.getElementById("read");
const customMessageBtn = document.getElementById("toggle");
const languajeBtn = document.getElementById("languaje");
const genderBtn = document.getElementById("gender-btn");
const closeCustoMsgBtn = document.getElementById("close");
const data = [
  {
    image: "./img/drink.jpeg",
    englishText: "I'm Thirsty",
    espanolText: "Tengo sed",
  },
  {
    image: "./img/food.jpeg",
    englishText: "I'm Hungry",
    espanolText: "tengo hambre",
  },
  {
    image: "./img/sleep.jpg",
    englishText: "I'm Tired",
    espanolText: "Estoy cansado",
  },
  {
    image: "./img/hurt.jpeg",
    englishText: "I'm Hurt",
    espanolText: "Estoy lastimado",
  },
  {
    image: "./img/happy.jpeg",
    englishText: "I'm Happy",
    espanolText: "Estoy feliz",
  },
  {
    image: "./img/angry.jpeg",
    englishText: "I'm Angry",
    espanolText: "Estoy enojado",
  },
  {
    image: "./img/sad.jpg",
    englishText: "I'm Sad",
    espanolText: "Estoy triste",
  },
  {
    image: "./img/scared.jpeg",
    englishText: "I'm Scared",
    espanolText: "Tengo miedo",
  },
  {
    image: "./img/outside.jpeg",
    englishText: "I Want To Go Outside",
    espanolText: "Quiero salir",
  },
  {
    image: "./img/home.jpeg",
    englishText: "I Want To Go Home",
    espanolText: "Quiero ir a casa",
  },
  {
    image: "./img/school.jpeg",
    englishText: "I Want To Go To School",
    espanolText: "Quiero ir a la escuela",
  },
  {
    image: "./img/grandma.jpeg",
    englishText: "I Want To Go To Grandmas",
    espanolText: "Quiero ir a la casa de la abuela",
  },
];

let globalLanguaje = "eng";
let gender = "male";

function generateMainElButtons() {
  data.forEach(createButtons);
}

// Create speech boxes
function createButtons(el) {
  const btnBoxEl = document.createElement("div");

  const { image, englishText, espanolText } = el;

  let buttonsText = englishText;

  if (globalLanguaje === "esp") {
    buttonsText = espanolText;
  }

  btnBoxEl.classList.add("box");

  btnBoxEl.innerHTML = `
    <img src="${image}" alt="${buttonsText}" />
    <p class="info">${buttonsText}</p>
  `;

  btnBoxEl.addEventListener("click", () => {
    setVoiceMessage(buttonsText);
    speakText();

    // Add active effect
    btnBoxEl.classList.add("active");
    setTimeout(() => btnBoxEl.classList.remove("active"), 800);
  });

  mainEl.appendChild(btnBoxEl);
}

generateMainElButtons();

// Init speech synth
const speaker = new SpeechSynthesisUtterance();

// Store voices
let voicesCollection = [];

function initVoices() {
  voicesCollection = speechSynthesis.getVoices();

  voicesCollection.forEach((voice) => {
    const voiceOption = document.createElement("option");

    voiceOption.value = voice.name;
    voiceOption.innerText = `${voice.name} ${voice.lang}`;

    voicesMenu.appendChild(voiceOption);
  });
}

// Set text
function setVoiceMessage(newText) {
  speaker.text = newText;
}

// Speak text
function speakText() {
  speechSynthesis.speak(speaker);
}

// Set voice
function setVoice(name) {
  speaker.voice = voicesCollection.find((voice) => voice.name === name);
}

// Clear Main
function clearMainEl() {
  mainEl.innerHTML = "";
}

// Set Languaje
function toggleGlobalLanguaje() {
  clearMainEl();

  switch (globalLanguaje) {
    case "esp":
      globalLanguaje = "eng";
      languajeBtn.innerText = "🇬🇧";
      if (gender === "female") {
        setVoice("Samantha");
      } else {
        setVoice("Alex");
      }
      break;

    case "eng":
      globalLanguaje = "esp";
      languajeBtn.innerText = "🇪🇸";
      if (gender === "female") {
        setVoice("Monica");
      } else {
        setVoice("Diego");
      }
      break;
  }

  generateMainElButtons();
}

// Set gender
function toggleGender() {
  switch (gender) {
    case "female":
      gender = "male";
      genderBtn.innerText = "👨‍🚀";
      if (globalLanguaje === "eng") {
        setVoice("Alex");
      } else {
        setVoice("Diego");
      }
      break;

    case "male":
      gender = "female";
      genderBtn.innerText = "👩‍🔬";
      if (globalLanguaje === "eng") {
        setVoice("Monica");
      } else {
        setVoice("Samantha");
      }
      break;
  }
}

//! Event Listeners

// Voices changed
speechSynthesis.addEventListener("voiceschanged", initVoices);

// Toggle text box
customMessageBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// Close button
closeCustoMsgBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// Change voice
voicesMenu.addEventListener("change", (e) => {
  setVoice(e.target.value);
});

// Read text button
readCustomMsgBtn.addEventListener("click", () => {
  setVoiceMessage(customMsgTextArea.value);
  speakText();
});

// languaje Button
languajeBtn.addEventListener("click", () => {
  toggleGlobalLanguaje();
});

// Gender Button
genderBtn.addEventListener("click", () => {
  toggleGender();
});

initVoices();
