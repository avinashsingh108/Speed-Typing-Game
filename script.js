let easyTime = 5;
let mediumTime = 3;
let hardTime = 2;
let score = 0;
let isPlaying;
let level; 
let time;
let time2; 
let yourScore;


const userInput = document.querySelector("#input");
const currentWord = document.querySelector("#current");
const livescore = document.querySelector("#score");
const remTime = document.querySelector("#time");
const message = document.querySelector("#message");
const highScore = document.querySelector("#hscore");
const overlay = document.querySelector(".overlay");
const gameOver = document.querySelector(".final-message");
const finalScore = document.querySelector("#finalScore");
let btns = document.querySelectorAll("#btn");
let highScoreValue = localStorage.getItem('highscore') || 0;
highScore.innerHTML = highScoreValue;


const wordArray = [
    "apple", "banana", "orange", "grape", "kiwi",
    "carrot", "broccoli", "tomato", "potato", "cucumber",
    "elephant", "giraffe", "lion", "zebra", "tiger",
    "ocean", "mountain", "forest", "desert", "island",
    "computer", "keyboard", "mouse", "monitor", "printer",
    "guitar", "piano", "violin", "drum", "trumpet",
    "sunflower", "rose", "tulip", "daisy", "lily",
    "book", "magazine", "newspaper", "journal", "novel",
    "bicycle", "motorcycle", "car", "bus", "train",
    "happy", "sad", "excited", "bored", "surprised",
    "coffee", "tea", "juice", "water", "soda",
    "football", "soccer", "basketball", "tennis", "baseball",
    "star", "moon", "sun", "planet", "galaxy",
    "umbrella", "raincoat", "boots", "hat", "gloves",
    "pizza", "hamburger", "sushi", "pasta", "salad",
    "unicorn", "dragon", "mermaid", "wizard", "fairy",
    "camera", "photo", "video", "film", "director",
    "candle", "lamp", "flashlight", "fireplace", "lantern"
  ];
  

function startGame(lvl) {
    level = lvl;
    time = getTimeForLevel(level);
    time2 = time;
    showWord(wordArray);
    isPlaying = true;
    userInput.addEventListener("input", check)
    setInterval(checkStatus, 50);
    userInput.disabled = false;
    for (let index = 0; index < btns.length; index++) {
        btns[index].disabled = true;
    }
}
function getTimeForLevel(level) {
    const timeValues = {
        easy: easyTime,
        medium: mediumTime,
        hard: hardTime
    };

    return timeValues[level];
}
function showWord(wordArray)
{
    const randWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    currentWord.innerHTML = randWord;
}
let intervalSet = false;
userInput.addEventListener("input", function() {
    if (!intervalSet) {
      setInterval(countdown, 1000);
      intervalSet = true;
    }
  });


function check() {
    if(wordMatch())
    {
        time = time2;
        remTime.innerHTML = time;
        score++;
        livescore.innerHTML = score;
        userInput.value = '';
        showWord(wordArray);
    }
    
}
function wordMatch() {
    if(userInput.value === currentWord.innerHTML)
    {
        message.innerHTML = "CORRECT✅";
        return true;
    }
    else
    {
        return false;
    }
}


function countdown()
{
    if (time>0) {
        time--;
    }
    else if (time === 0) {
        isPlaying = false;
    }
    remTime.innerHTML = time;
}

function checkStatus() {
    if(!isPlaying && time === 0)
    {
        message.innerHTML = '';
        yourScore = score;
        userInput.disabled = true;
        console.log('Initial High Score:', highScore);

        if(yourScore > highScoreValue){
            highScoreValue = yourScore;
            localStorage.setItem('highscore', highScoreValue);
            highScore.innerHTML = highScoreValue;
        }
        livescore.innerHTML = 0;
        overlay.style.display = "block";
        gameOver.style.display = "block";
    }
    finalScore.innerHTML = yourScore;
}



function restart() {
    location.reload();
}