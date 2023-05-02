const Ship = (length) => {
  let hits = 0;
  let shipName = "A";
  const isSunk = () => {
    return hits === length ? true : false;
  };
  return {
    shipName: shipName,
    length: length,
    hits: hits,
    sunk: isSunk(),
  };
};

const Gameboard = () => {
  let missedShot = [];
  const board = [];
  const createBoard = () => {
    for (let i = 0; i < 4; i++) {
      board.push([]);
      for (let j = 0; j < 4; j++) {
        board[i].push("[ ]");
      }
    }
  };
  const afficherBoard = () => {
    //Pour la science
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        process.stdout.write(board[i][j] + " ");
      }
      console.log();
    }
  };
  const placeShip = (x, y) => {
    const ship = Ship(2);
    for (let i = 0; i < ship.length; i++) {
      board[x][y + i] = `[${ship.shipName}]`;
    }
    afficherBoard();
  };
  const receiveAttack = (x, y) => {};
  const reports = () => {};
  return {
    createBoard: createBoard(),
    placeShip: placeShip,
  };
};

const Player = (human) => {};

const Computer = () => {};

const gameLoop = (function Game() {
  let playerTurn = true;
  const aiBoard = Gameboard();
  aiBoard.placeShip(0, 0);
})();
