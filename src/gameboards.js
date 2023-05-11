import DomManip from "./domManip";
import report from "./report";

const Gameboard = () => {
  const coordinateShoot = [];
  const fleet = [];
  let isHuman = false;
  let gameOver = false;
  const createBoard = (size, human) => {
    isHuman = human;
    DomManip().cellCreation(size, human);
  };
  const placeShip = (ship) => {
    fleet.push(ship);
    console.log(ship);
    DomManip().fleetCreation(fleet, isHuman);
  };
  const isDefeated = () => {
    const sunkShips = fleet.filter((ship) => ship.isSunk());
    return sunkShips.length === fleet.length;
  };
  const testShoot = (cell) => {
    for (let i = 0; i < coordinateShoot.length; i++) {
      const element = coordinateShoot[i];
      if (cell === element) {
        report("Déjà attaquée, choisissez une autre case");
        return false;
      }
    }
    return true;
  };
  const receiveAttack = (cell, human) => {
    console.log(fleet);
    console.log(fleet.length);
    const onlyDigits = /\d/g;
    console.log(`cell ${cell.id}`);
    for (let i = 0; i < fleet.length; i++) {
      const ship = fleet[i];
      console.log(ship);
      for (let j = 0; j < ship.position.length; j++) {
        const shipCoordinate = ship.position[j].match(onlyDigits).toString();
        if (
          shipCoordinate.match(onlyDigits).toString() ===
          cell.id.match(onlyDigits).toString()
        ) {
          ship.hits += 1;
          if (ship.isSunk() === false) {
            human
              ? report(`You damaged one of your opponent ship!`)
              : report(`Your ${ship.shipName} is damaged!`);
            DomManip().shipDamaged(cell, "damaged", isHuman);
          } else {
            if (isDefeated()) {
              report("Game over!");
              DomManip().shipDamaged(cell, "victory", isHuman);
              gameOver = true;
            } else {
              human
                ? report(`Computer's ${ship.shipName} has sunk!`)
                : report(`Your ${ship.shipName} is destroyed!`);
              DomManip().shipDamaged(cell, "sunk", isHuman);
            }
          }
          coordinateShoot.push(cell);
          return;
        }
      }
    }
    coordinateShoot.push(cell);
    report("Aucune cible");
    return DomManip().miss(cell);
  };

  return {
    createBoard,
    receiveAttack,
    testShoot,
    placeShip,
    coordinateShoot: coordinateShoot,
    fleet: fleet,
    gameOver: gameOver,
  };
};

export default Gameboard;
