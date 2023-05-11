import Player from "./players";
import Gameboard from "./gameboards";
import { shipManager } from "./ships";
import DomManip from "./domManip";
import dragController from "./dragController";

(function newGame() {
  const sizeBoard = 8;
  const humanBoard = Gameboard();
  humanBoard.createBoard(sizeBoard, true);
  const human = Player(true, humanBoard);
  const drag = dragController();
  drag.drag();
  customStart(drag, human, sizeBoard, humanBoard);
  randomStart(human, sizeBoard, humanBoard);
})();

function randomStart(human, sizeBoard, humanBoard) {
  const randomStartButton = document.getElementById("randomStartButton");
  randomStartButton.addEventListener("click", () => {
    DomManip().startGame();
    const humanShipManager = shipManager();
    humanShipManager.placeShip(humanBoard, sizeBoard);
    game(sizeBoard, human, humanBoard);
  });
}
function customStart(drag, human, sizeBoard, humanBoard) {
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    DomManip().startGame();
    const dragFleet = drag.fleet;
    for (const item of dragFleet) {
      humanBoard.fleet.push(item);
    }
    game(sizeBoard, human, humanBoard);
  });
}

function game(sizeBoard, human, humanBoard) {
  DomManip().boardCreation();
  const aiBoard = Gameboard();
  aiBoard.createBoard(sizeBoard, false);
  const computer = Player(false, aiBoard);

  const aiShipManager = shipManager();
  aiShipManager.placeShip(aiBoard, sizeBoard);
  human.setOpponent(computer, aiBoard);
  computer.setOpponent(human, humanBoard);
  changeTurn(human, computer);
  playAgain();
}
function changeTurn(human, computer) {
  const humanTurn = Math.random();
  if (computer.opponent === 1 && human.opponent === 1);
  {
    humanTurn > 0.5 ? human.isStandby(false) : computer.isStandby(false);
  }
}
function playAgain() {
  const playAgain = document.querySelector(".play-again");
  playAgain.addEventListener("click", () => {
    window.location.reload(false);
    DomManip().blur(false);
  });
}
