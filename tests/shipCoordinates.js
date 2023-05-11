const shipCoordinates = () => {
  const coordinator = (size, freeCells, origin = null, coordinate = []) => {
    if (coordinate.length === 0) {
      origin = randomCoordinate(freeCells);
      coordinate.push(origin);
      let index = freeCells.findIndex((el) => el === origin);
      freeCells.splice(index, 1);
    }
    if (coordinate.length === size) {
      console.log("freecells in fine " + freeCells);
      console.log("final coordinate : " + coordinate);
      return coordinate.length;
    }
    console.log(origin);
    let nextCell = parseInt(origin) + 1;
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
    return coordinator(size, freeCells, origin, coordinate);
  };
  const randomCoordinate = (freeCells) => {
    return freeCells[Math.floor(Math.random() * freeCells.length)];
  };
  return {
    coordinator,
  };
};

export default shipCoordinates;
