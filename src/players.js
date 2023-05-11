import report from "./report";

const Player = (human, board) => {
  let standby = null;
  let opponent;
  let opponentsBoard;
  let aiHuntingState;
  let aiTargetCell;
  const setOpponent = (newOpponent, board) => {
    opponent = newOpponent;
    opponentsBoard = board;
  };
  const getOpponent = () => {
    return opponent;
  };
  const setHuntMode = (boolean, cell = null) => {
    aiHuntingState = boolean;
    aiTargetCell = cell;
    console.log(cell);
  };
  const isStandby = (boolean) => {
    if (boolean === false) {
      standby = false;
      turn();
    } else if (boolean === false) {
      standby = true;
    }
  };
  const turn = () => {
    if (board.gameOver !== true && opponentsBoard.gameOver !== true) {
      if (human) {
        console.log(board);
        report(`Your turn`);
        setTimeout(() => {
          humanAttack();
        }, 1000);
      } else {
        report(`Computer's turn`);
        setTimeout(() => {
          aiAttack();
        }, 1000);
      }
    }
  };
  const humanAttack = () => {
    const cells = document.querySelectorAll(".aiCell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (standby === false) {
          if (opponentsBoard.testShoot(cell)) {
            opponentsBoard.receiveAttack(cell, human);
            standby = true;
            setTimeout(() => {
              opponent.isStandby(false);
            }, 1000);
          }
        }
      });
    });
  };
  const aiAttack = () => {
    aiHuntingState === true ? aiHuntingAttack() : aiRandomAttack();
  };
  const aiRandomAttack = () => {
    const arrayShots = possibleShots();
    const randomCell = Math.floor(Math.random() * arrayShots.length);
    const cell = arrayShots[randomCell];
    opponentsBoard.receiveAttack(cell, human);
    standby = true;
    setTimeout(() => {
      if (cell.classList.contains("damaged")) {
        setHuntMode(true, cell);
      } else {
        if (cell.classList.contains("sunk")) {
          setHuntMode(false);
        }
      }
      opponent.isStandby(false);
    }, 1000);
  };
  const aiHuntingAttack = () => {
    const arrayShots = possibleShots();
    let cell = null;
    for (let i = 0; i < arrayShots.length; i++) {
      if (cell === null) {
        const onlyDigits = /\d{2,}/g;
        let element = arrayShots[i].id.match(onlyDigits).toString();
        element = parseInt(element);
        let targetCell = aiTargetCell.id.match(onlyDigits).toString();
        targetCell = parseInt(targetCell);
        console.log(targetCell);
        console.log(element);
        if (
          targetCell + 1 === element ||
          targetCell - 1 === element ||
          targetCell + 10 === element ||
          targetCell - 10 === element ||
          targetCell + 2 === element ||
          targetCell - 2 === element ||
          targetCell + 20 === element ||
          targetCell - 20 === element
        ) {
          cell = arrayShots[i];
        }
      }
    }
    console.log("cell" + cell);
    opponentsBoard.receiveAttack(cell, human);
    standby = true;
    setTimeout(() => {
      if (cell.classList.contains("damaged")) {
        setHuntMode(true, cell);
      } else {
        if (cell.classList.contains("sunk")) {
          setHuntMode(false);
        }
      }
      opponent.isStandby(false);
    }, 1000);
  };
  const possibleShots = () => {
    const humanBoard = document.getElementById("humanBoard");
    let shots = [];
    for (let i = 0; i < humanBoard.children.length; i++) {
      const element = humanBoard.children[i];
      shots.push(element);
    }
    for (let j = 0; j < opponentsBoard.coordinateShoot.length; j++) {
      const element = opponentsBoard.coordinateShoot[j];
      shots = shots.filter((shot) => shot !== element);
    }
    return shots;
  };
  return {
    board,
    opponent,
    standby,
    isStandby,
    setOpponent,
    getOpponent,
  };
};

export default Player;
