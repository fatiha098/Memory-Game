var content_game = document.querySelector(".content");

var countFlip = 0 ;
const size = 4;

const sound_click = new Audio('audio/click.mpeg');
const sound_clickk = new Audio('audio/clickk.mpeg');
const sound_blurp = new Audio('audio/blurp.aac');
const sound_clock = new Audio('audio/clock.aac');
const sound_eye = new Audio('audio/eye.mpeg');
const sound_win = new Audio('audio/win.mpeg');
const sound_win2 = new Audio('audio/win2.mpeg');
const sound_fail = new Audio('audio/fail.mpeg');
const sound_match = new Audio('audio/match.mpeg');
const sound_unmatch = new Audio('audio/unmatch.mpeg');
const sound_show = new Audio('audio/show.mpeg');

const items = [
  { name: "monkeyDora", image: "images/monkeyDora.png" },
  { name: "ktkouta", image: "images/ktkouta.png" },
  { name: "pokemon", image: "images/pokemon.png" },
  { name: "rabbit", image: "images/rabbit.png" },
  { name: "scoobydo", image: "images/scoobydo.png" },
  { name: "veemon", image: "images/veemon.png" },
  { name: "woody", image: "images/woody.png" },
  { name: "chillywilly", image: "images/chillywilly.png" },
  { name: "cat", image: "images/cat.png" },
  { name: "duck", image: "images/duck.png" },
  { name: "jocker", image: "images/jocker.png" },
  { name: "jerry", image: "images/jerry.png" },
  { name: "smurf", image: "images/smurf.png" },
  { name: "yogiBear", image: "images/yogiBear.png" },
  { name: "clock", image: "images/clock.png" },
];



const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = Array.from(items);
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues; // its length is 8
};



const boardGameGenerator = (cardValues, size = 4) => {
  content_game.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];

  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);

  for (let i = 0; i < size * size; i++) {
    content_game.innerHTML += `
    <div class="tile" data-tile-name="${cardValues[i].name}">
      <div class="front">
        <img src="images/cookie.png" class="front-image"/>
      </div>
      <div class="back">
        <img src="${cardValues[i].image}" class="image"/>
      </div>
    </div>
  `;
  }
}

const cardValues = generateRandom(size);
boardGameGenerator(cardValues,size) 




const tiles = document.querySelectorAll(".tile");

// granpa signs

document.body.insertAdjacentHTML('beforeend', `
  <div class="signs">
    <i class="fa-solid fa-xmark xmark"></i>
    <div class="paragraphe">
      <h2>How To Play</h2>
      <p>Hello Ready to play Memory Game ?
          In this game you'll need your memory skills.
          Click on any2 tiles to turn them over. 
          If the pictures on the tiles match,
          you have a pair!</p>
    </div>
    <div class="image">
      <img class="man-image" src="../memory-Game/images/grandpa.png">
    </div>
  </div>`);

var signs = document.querySelector(".signs");
var xmark = document.querySelector(".xmark");

function showSigns(signs) {
  signs.style.opacity = "1";
  signs.style.right = "10%";
}

function hiddenSigns(signs) {
  signs.style.opacity = "0";
  signs.style.right = "0%";
}

function closeSigns(signs){
  xmark.addEventListener("click",function(){
  hiddenSigns(signs);
  })
}

setTimeout(function() {
  showSigns(signs);
}, 1000);

closeSigns(signs);

setTimeout(function() {
  hiddenSigns(signs);
}, 30000);


document.body.insertAdjacentHTML('beforeend', `
  <div class="time">
    <p></p>
  </div>`);


// pop up 
document.body.insertAdjacentHTML('beforeend', `
  <div class="popUp">
    <div class="popUpWin">
      <p>Congratulations!</p>
      <p>You've completed the challenge successfully.</p>
      <p> Well done!"</p>

      <button type="submit" class="playBtn" >Play Again</button>
    </div>
    <div class="popUpLoose">
      <p>Oops! Time's up. </p>
      <p>You didn't manage to complete the challenge in time. Better luck next time!</p>
      <button type="submit" class="playBtn1" >Play Again</button>
    </div>
  </div>
`);

var popUpWin = document.querySelector(".popUpWin");
var popUpLoose = document.querySelector(".popUpLoose");
var popUp = document.querySelector(".popUp");
var playBtn = document.querySelector(".playBtn");
var playBtn1 = document.querySelector(".playBtn1");

playBtn.addEventListener("click", function(){
  sound_blurp.play();
  window.open("../memory-Game/beginner.html",target="_self");
  
})

playBtn1.addEventListener("click", function(){
  window.open("../memory-Game/beginner.html",target="_self");
  sound_fail.play()
})


//Initial Time
let seconds = 0, minutes = 0;
let timerInterval;

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    seconds++;
    updateTime();
  }, 1000); // Update time every second (1000 milliseconds)
}

function updateTime() {
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  // Format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  let timeString = `${minutesValue}:${secondsValue}`;

  if (minutes < 1) {
    // Update time display
    time = document.querySelector(".time p").textContent = `${timeString}`;
    // Check if all tiles are flipped
    if (countFlip === tiles.length / 2) {      
      popUpWin.style.display = "block";
      popUp.style.left = "50%";
      clearInterval(timerInterval); // Stop the timer when the player wins
      sound_win.play(); // Play win sound
    }
  } else {
    // Display the popUpLoose if time exceeds 2 minutes
    popUpLoose.style.display = "block";
    popUp.style.left = "50%";
    clearInterval(timerInterval); // Stop the timer when the time exceeds 2 minutes
    sound_fail.play(); // Play fail sound
  }

}



//back to menu 
document.body.insertAdjacentHTML('beforeend', `
  <div class="back">
    <img class="back-to-menu" src="images/arrow-back.png">
  </div>
  `);

var arrow_back = document.querySelector(".back-to-menu");

arrow_back.addEventListener("click", function(){
  window.open("index.html", "_self");
});



tiles.forEach(tile => {
    // Handle hover events for flipping
    tile.addEventListener('click', () => {
    sound_click.play();
    tile.classList.add('flipped');
    tile.style.transform = "rotateY(-180deg)";// Show backface on click
  });

  
  // Handle mouseleave events to hide both flipped tiles if necessary
  tile.addEventListener('mouseleave', () => {
    const flippedTiles = document.querySelectorAll('.tile.flipped');

    if (flippedTiles.length === 2) {
      // Hide both flipped tiles if there are exactly two flipped
      if (flippedTiles[0].getAttribute("data-tile-name") !== flippedTiles[1].getAttribute("data-tile-name") ){
        sound_unmatch.play();
        for (i = 0 ; i < 2 ; i++){
          flippedTiles[i].style.transform = "rotateY(0deg)";
          
        }
        
      }
      
      else {
        // when two tiles turned ae similar
        sound_match.play();
        countFlip++;
      }
      flippedTiles.forEach(flippedTile => flippedTile.classList.remove('flipped'));
      
    }
  });
});


// Start timer
startTimer();


















    


