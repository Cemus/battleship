const DomManip = () => {
  const humanBoard = document.getElementById("humanBoard");
  const aiBoard = document.getElementById("aiBoard");

  const startGame = () => {
    const shipContainer = document.querySelector(".ship-container");
    const startButton = document.getElementById("randomStartButton");
    const randomStartButton = document.getElementById("randomStartButton");
    shipContainer.remove();
    randomStartButton.remove();
    startButton.remove();
  };
  const boardCreation = () => {
    const parent = document.getElementById("boardContainer");
    const aiBoard = document.createElement("div");
    aiBoard.id = "aiBoard";
    aiBoard.classList.add("ai-board");
    parent.appendChild(aiBoard);
  };
  const cellCreation = (size, human) => {
    switch (human) {
      case true:
        humanBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        for (let x = 0; x < size; x++) {
          for (let y = 0; y < size; y++) {
            const cell = document.createElement("div");
            cell.id = `h${x + 1}${y + 1}`;
            cell.classList.add("humanCell");
            humanBoard.appendChild(cell);
          }
        }
        break;

      case false:
        aiBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        for (let x = 0; x < size; x++) {
          for (let y = 0; y < size; y++) {
            const cell = document.createElement("div");
            cell.id = `ai${x + 1}${y + 1}`;
            cell.classList.add("aiCell");
            aiBoard.appendChild(cell);
          }
        }
    }
  };
  const fleetCreation = (fleet, human) => {
    let board;
    const onlyDigits = /\d/g;
    for (let i = 0; i < fleet.length; i++) {
      const ship = fleet[i];
      for (let j = 0; j < ship.position.length; j++) {
        const shipCoordinate = ship.position[j].match(onlyDigits).toString();
        if (human === false) {
          board = aiBoard;
        } else {
          board = humanBoard;
        }
        for (let k = 0; k < board.children.length; k++) {
          const cell = board.children[k];
          const cellCoordinate = cell.id.match(onlyDigits).toString();
          if (shipCoordinate === cellCoordinate) {
            if (human) {
              cell.style.backgroundColor = "green";
            }
          }
        }
      }
    }
  };
  const shipDamaged = (cell, status, human) => {
    switch (status) {
      case "damaged":
        cell.classList.add("damaged");
        break;

      case "sunk":
        cell.classList.add("sunk");
        break;

      case "victory":
        cell.classList.add("victory");
        endGame(human);
        break;
    }
    cell.style.backgroundColor = "red";
  };
  const miss = (cell) => {
    cell.style.backgroundColor = "yellow";
  };
  const endGame = (human) => {
    const endGameScreen = document.querySelector(".end-game-screen");
    const victoryText = document.querySelector(".victory-text");
    endGameScreen.style.visibility = "visible";
    blur(true);
    switch (human) {
      case false:
        victoryText.innerHTML =
          "Congratulations! You have annihilated the enemy fleet.";
        break;
      case true:
        victoryText.innerHTML =
          "Alas, the tides were not in your favor this time... Your fleet has been obliterated, and you are left with nothing but the salty taste of defeat.";
        break;
    }
  };
  const blur = (boolean) => {
    const container = document.querySelector(".container");
    boolean
      ? (container.style.filter = "blur(1rem)")
      : (container.style.filter = "blur(0)");
  };
  return {
    startGame,
    cellCreation,
    fleetCreation,
    shipDamaged,
    miss,
    boardCreation,
    blur,
  };
};

export default DomManip;
