const Ship = (nbCell, pos, name, direction) => {
  let hits = 0;
  let shipName = name;
  let position = pos;
  function isSunk() {
    return this.hits === this.nbCell;
  }
  return {
    shipName,
    nbCell,
    hits,
    position,
    direction,
    isSunk,
  };
};

const shipManager = () => {
  const placeShip = (board, sizeBoard) => {
    const freeCells = [];
    for (let x = 0; x < sizeBoard; x++) {
      for (let y = 0; y < sizeBoard; y++) {
        freeCells.push(`${x + 1}${y + 1}`);
      }
    }
    for (let i = 0; i < 4; i++) {
      const shipSize = i + 1;
      const ship = createShip(shipSize, freeCells);
      board.placeShip(ship);
    }
  };
  const shipName = (size) => {
    let name;
    switch (size) {
      case 1:
        name = "fishing vessel";
        break;
      case 2:
        name = "destroyer";
        break;
      case 3:
        name = "cruiser";
        break;
      case 4:
        name = "battleship";
        break;
    }
    return name;
  };
  const createShip = (
    size,
    freeCells,
    origin = null,
    coordinate = [],
    direction = "horizontal"
  ) => {
    if (coordinate.length === 0) {
      origin = randomCoordinate(freeCells);
      coordinate.push(origin);
      let index = freeCells.findIndex((el) => el === origin);
      freeCells.splice(index, 1);
      if (Math.random() > 0.5) {
        direction = "horizontal";
      } else {
        direction = "vertical";
      }
    }
    if (coordinate.length === size) {
      for (let i = 0; i < coordinate.length; i++) {
        let element = coordinate[i];
        element = element.toString();
      }
      const name = shipName(size);
      const ship = Ship(size, coordinate, name, direction);
      return ship;
    }
    let nextCell;
    switch (direction) {
      case "horizontal":
        nextCell = parseInt(origin) + 1;
        break;
      case "vertical":
        nextCell = parseInt(origin) + 10;
        break;
    }
    nextCell = nextCell.toString();
    if (freeCells.includes(nextCell)) {
      let index = freeCells.findIndex((el) => el == nextCell);
      freeCells.splice(index, 1);
      coordinate.push(nextCell);
      origin = nextCell;
    } else {
      for (let i = 0; i < coordinate.length; i++) {
        const element = coordinate[i];
        freeCells.push(element);
      }
      coordinate.length = 0;
      origin = null;
    }
    return createShip(size, freeCells, origin, coordinate, direction);
  };
  const randomCoordinate = (freeCells) => {
    return freeCells[Math.floor(Math.random() * freeCells.length)];
  };
  return {
    placeShip,
    createShip,
    shipName,
  };
};

export { Ship, shipManager };
