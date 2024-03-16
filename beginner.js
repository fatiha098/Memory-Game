var content_game = document.querySelector(".content");
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

var addedItemsCount = {};

function isMaxItemCountReached(itemName, maxCount) {
  return addedItemsCount[itemName] >= maxCount;
}


for (i = 0 ; i < 24 ; i++){

  let randomItem ;
  
  randomItem = items[Math.floor(Math.random() * items.length)];
  while(isMaxItemCountReached(randomItem.name, 2)){
    randomItem = items[Math.floor(Math.random() * items.length)];
  };
  
    content_game.innerHTML += `
    <div class="tile" data-tile-name="${randomItem.name}">
      <div class="front">
      <img  src="images/cookie.png" class="front-image"/></div>
      <div class="back">
      <img  src="${randomItem.image}" class="image"/></div>
    </div>
    `
    addedItemsCount[randomItem.name] = (addedItemsCount[randomItem.name] || 0) + 1;
}

content_game.innerHTML += `
    <div class="tile flipped" data-tile-name="angel">
      <div class="front">
      <img  src="images/cookie.png" class="front-image"/>
      </div>
      <div class="back">
      <img  src="../memoryGame/images/angel.jpg" class="image"/></div>
    </div>
    `


const tiles = document.querySelectorAll(".tile");

    tiles.forEach(tile => {
      // Handle hover events for flipping
      tile.addEventListener('click', () => {
        tile.classList.add('flipped'); 
        tile.style.transform = "rotateY(-180deg)";// Show backface on click
        

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
            for (i = 0 ; i < 2 ; i++){
              flippedTiles[i].style.transform = "rotateY(50deg)";
            }
          }
          flippedTiles.forEach(flippedTile => flippedTile.classList.remove('flipped'));
          
        }
      });
    });






















    
// let back = document.querySelector(".back");
// let tile = document.querySelector(".tile");
// let front = document.querySelector(".front");
// let firstTile = false;
// let secondCard = false;

// let tiles = document.querySelectorAll(".content");


// let firstCardFlipped = null; // Keeps track of the first card flipped
// let cardsFlippedCount = 0; // Tracks the number of cards currently flipped

// const cardBackImage = 'images/angel.jpg'; // Replace with your backface image path

// function flipCard(tile) {
//   const tileFront = card.querySelector('.front');
//   const tileBack = card.querySelector('.back');

//   if (!tile.classList.contains('flipped') && cardsFlippedCount < 2) { // Only flip if not already flipped and less than 2 flipped
//     tile.classList.toggle('flipped'); // Toggle flipped class
//     tileFront.style.backgroundImage = `url(${cardBackImage})`; // Set backface image on front

//     if (firstCardFlipped === null) {
//       firstCardFlipped = tile;
//     } else {
//       cardsFlippedCount++;

//       if (!checkForMatch(firstCardFlipped, tile)) { // If not a match, flip back after delay
//         setTimeout(() => {
//           flipCard(firstCardFlipped);
//           flipCard(tile);
//           firstCardFlipped = null;
//           cardsFlippedCount = 0;
//         }, 1000); // Adjust delay as needed (1 second in this example)
//       } else {
//         // Handle match scenario (optional: add visual feedback, disable flipping, etc.)
//         cardsFlippedCount = 0; // Reset flipped count even on match
//       }
//     }
//   }
// }

// function checkForMatch(card1, card2) {
//   // Implement your logic to compare card faces (e.g., data attributes, CSS classes)
//   // This example assumes a "data-face" attribute on the card-face element
//   return card1.querySelector('.tileFront').dataset.front === card2.querySelector('.tileFront').dataset.front;
// }

// content.addEventListener('click', (event) => {
//   // Handle clicks for potential game logic (e.g., scoring, game reset)
// });

// content.querySelectorAll('.tile').forEach(tile => {
//   tile.addEventListener('mouseover', () => flipCard(tile));
// });




















