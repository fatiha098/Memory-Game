var content_game = document.querySelector(".content");

var  moves = 0 ;
var countFlip = 0 ;
const size = 4;


//items 
const items = [
  { name: "monkeyDora", image: "images/monkeyDora.png" },
  { name: "simpson", image: "images/simpson.png" },
  { name: "panda", image: "images/panda.png" },
  { name: "gumball", image: "images/gumball.png" },
  { name: "jaguar", image: "images/jaguar.png" },
  { name: "ktkouta", image: "images/ktkouta.png" },
  { name: "mickyMouse", image: "images/mickyMouse.png" },
  { name: "monkey", image: "images/monkey.png" },
  { name: "pokemon", image: "images/pokemon.png" },
  { name: "rabbit", image: "images/rabbit.png" },
  { name: "scoobydo", image: "images/scoobydo.png" },
  { name: "veemon", image: "images/veemon.png" },
  { name: "woody", image: "images/woody.png" }
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
  return cardValues;
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

const cardValues = generateRandom(4);
boardGameGenerator(cardValues,size) 



// start game ==> count moves , flip tiles

const tiles = document.querySelectorAll(".tile");



document.body.insertAdjacentHTML('beforeend', `
  <div class="popUp">
    <div class="popUpWin">
      <p>YOUPI!  YOU WON</p>
      <p>YOU MADE ${moves} MOVES </p>
      <p>IN 00:00 </p>
    </div>
    <div class="popUpLoose">
      <p>OOPS! TIME OVER TRY AGAIN</p>
      <p>YOU MADE ${moves} MOVES </p>
    </div>
  </div>
`);

var popUpWin = document.querySelector(".popUpWin");
var popUpLoose = document.querySelector(".popUpLoose");
var popUp = document.querySelector(".popUp");

tiles.forEach(tile => {
  // Handle hover events for flipping
  tile.addEventListener('click', () => {
    tile.classList.add('flipped');
    tile.style.transform = "rotateY(-180deg)";// Show backface on click
    moves += 1;
    
  });
    
  
  // Handle mouseleave events to hide both flipped tiles if necessary
  tile.addEventListener('mouseleave', () => {
    const flippedTiles = document.querySelectorAll('.tile.flipped');

    if (flippedTiles.length === 2) {
      // Hide both flipped tiles if there are exactly two flipped
      if (flippedTiles[0].getAttribute("data-tile-name") !== flippedTiles[1].getAttribute("data-tile-name") ){
        for (i = 0 ; i < 2 ; i++){
          flippedTiles[i].style.transform = "rotateY(0deg)";
          
        }
        
      }
      
      else {
        // when two tiles turned ae similar
        for (i = 0 ; i < 2 ; i++){
          flippedTiles[i].style.transform = "rotateY(0deg)";
          let frontImage = flippedTiles[i].querySelector(".front img");
          frontImage.setAttribute("src","images/checked.png");
          
        }
        countFlip++;
        console.log(countFlip);
        //show pop up win
        if (countFlip === size / 2){
          document.querySelector(".popUpWin p:nth-child(2)").textContent = `YOU MADE ${moves} MOVES`;
          popUpWin.style.display = "block";
        }
        //show pop up loose
        // else( if time is finished and the user not yet completed ){
        //   popUpLoose.style.display = "block";
        // }
        // else if (countFlip !== 8 and time over){
        //             document.querySelector(".popUpLoose p:nth-child(2)").textContent = `YOU MADE ${moves} MOVES`;
        //   popUpLoose.style.display = "block";
        // }
      }
      flippedTiles.forEach(flippedTile => flippedTile.classList.remove('flipped'));
      
    }
  });
});





















    


