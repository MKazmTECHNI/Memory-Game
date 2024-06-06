const resetButton = document.querySelector("button.reset");
const wholeGameContainer = document.querySelector("div.game-container");
const gameContainer = document.querySelector("div.game");
const spanMoves = document.querySelector("span.moves");
const spanPairs = document.querySelector("span.pairs");
const message = document.querySelector("p.result-message");
const tiles = document.querySelectorAll(".tile");
const tableSize = document.querySelector("span.table-size");

let movesMade = 0;
let tilesMatched = 0;
let tileSelected = false;
let istileSelected = false;
message.innerHTML = "";
let inMove = false;

const emojis = [
  "🙉",
  "🙉",
  "💖",
  "💖",
  "🐶",
  "🐶",
  "🍔",
  "🍔",
  "🏆",
  "🏆",
  "🎁",
  "🎁",
  "💀",
  "💀",
  "😄",
  "😄",
  "🤣",
  "🤣",
  "🥰",
  "🥰",
  "😘",
  "😘",
  "😉",
  "😉",
  "😊",
  "😊",
  "🥳",
  "🥳",
  "🥵",
  "🥵",
  "🥶",
  "🥶",
  "🐢",
  "🐢",
  "🦔",
  "🦔",
  "🐳",
  "🐳",
  "🍄",
  "🍄",
  "🍎",
  "🍎",
  "🍫",
  "🍫",
  "⚽",
  "⚽",
];

tableSize.innerHTML = emojis.length;

wholeGameContainer.style.display = "none";
// TILE AMOUNT SELECT
const tilesAmountButton = document.querySelector("button.tiles-amount-button");
const tilesAmountInput = document.querySelector("input.tiles-amount-input");

function handleSubmitTilesAmountButtonClick() {
  const inputValue = tilesAmountInput.value;
  if (inputValue % 2 != 0) {
    message.innerHTML = "Insert odd number";
    return;
  } else if (inputValue < 1) {
    message.innerHTML = "Insert positive number";
    return;
  }
  if (inputValue <= emojis.length) {
    generateBoard(inputValue);
    wholeGameContainer.style.display = "flex";
  }
}

tilesAmountButton.addEventListener("click", handleSubmitTilesAmountButtonClick);
// back to the normal code

function generateBoard(amount) {
  gameContainer.innerHTML = "";
  movesMade = 0;
  tilesMatched = 0;
  spanMoves.innerHTML = movesMade;
  spanPairs.innerHTML = tilesMatched;
  let shuf_emoji = emojis
    .slice(0, amount)
    .sort(() => (Math.random() > 0.5 ? 2 : -1));
  for (let i = 0; i < amount; i++) {
    let tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML = shuf_emoji[i];

    gameContainer.appendChild(tile);
    tile.addEventListener("click", handleTileClick);
  }
}

function handleTileClick(event) {
  if (inMove) {
    return;
  }
  if (event.target.classList.contains("shown")) {
    return;
  }
  spanMoves.innerHTML = movesMade;
  message.innerHTML = "";
  if (tileSelected === event.target) {
    message.innerHTML = "Click on diffrent button!";
    return;
  }
  if (tileSelected !== false) {
    if (tileSelected.innerHTML === event.target.innerHTML) {
      tileSelected.classList.add("shown");
      event.target.classList.add("shown");
      tilesMatched += 1;
      spanPairs.innerHTML = tilesMatched;
    }
    event.target.classList.add("selected");
    inMove = true;
    setTimeout(() => {
      console.log(tileSelected);
      tileSelected.classList.remove("selected");
      event.target.classList.remove("selected");
      tileSelected = false;
      inMove = false;
    }, 1000);
    movesMade += 1;
    return;
  }
  event.target.classList.add("selected");

  tileSelected = event.target;
}
generateBoard();

resetButton.addEventListener("click", generateBoard);
