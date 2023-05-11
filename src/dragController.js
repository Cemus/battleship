import { Ship, shipManager } from "./ships";

const dragController = () => {
  const fleet = [];
  let selected = [];
  const spaceTook = [];
  const shipSelector = document.getElementById("shipSelector");
  const shipOrderer = document.getElementById("shipOrderer");
  const draggables = document.querySelectorAll(".draggableShip");
  const cells = document.querySelectorAll(".humanCell");
  let ship = null;
  let direction = "horizontal";
  const drag = () => {
    rotation();
    draggables.forEach((draggable) => {
      draggable.removeEventListener("dragstart", (e) => dragStart(e));
      draggable.removeEventListener("dragend", (e) => dragEnd(e));
      draggable.addEventListener("dragstart", (e) => {
        draggable.addEventListener("dragend", (e) => dragEnd(e));
        dragStart(e);
      });
    });
  };
  const rotation = () => {
    const button = document.getElementById("rotateShip");
    button.addEventListener("click", () => {
      switch (direction) {
        case "horizontal":
          draggables.forEach((draggable) => {
            draggable.style.flexDirection = "row";
          });
          shipOrderer.style.flexDirection = "column";
          shipSelector.style.flexDirection = "column";
          direction = "vertical";
          break;

        case "vertical":
          draggables.forEach((draggable) => {
            draggable.style.flexDirection = "column";
          });
          shipOrderer.style.flexDirection = "row";
          shipSelector.style.flexDirection = "row";
          direction = "horizontal";
          break;
      }
    });
  };
  const dragStart = (e) => {
    ship = e.target;
    e.target.classList.add("dragging");
    dragOver();
    ship.style.position = "relative";
  };
  const shipCreator = (currentShip) => {
    const size = currentShip.childElementCount;
    const name = shipManager().shipName(size);
    let coordinate = [];
    for (let item of selected) {
      const onlyDigits = /\d{2,}/g;
      item = item.id;
      item = item.match(onlyDigits);
      coordinate.push(item);
    }

    if (coordinate.length !== 0) {
      coordinate = coordinate.flat();
      const exportedShip = Ship(size, coordinate, name, direction);
      fleet.push(exportedShip);
    }
    return;
  };
  const dragOver = () => {
    cells.forEach((cell) => {
      cell.addEventListener("dragover", (e) => {
        dragging(e, cell);
        e.preventDefault();
      });
      cell.removeEventListener("dragover", (e) => {
        dragging(e, cell);
        e.preventDefault();
      });
    });
  };
  const isThePositionCorrect = (cell) => {
    let check = false;
    const draggable = document.querySelector(".dragging");
    if (draggable !== null) {
      const size = draggable.childElementCount;
      let originalCell = cell;
      let nextCell = cell;
      let befCell = cell;
      for (let i = 0; i < size; i++) {
        if (checkPosition(nextCell, befCell)) {
          nextCell.style.backgroundColor = "green";
          nextCell.style.opacity = ".5";
          selected.push(nextCell);
          check = true;
        } else {
          check = false;
          originalCell.style.backgroundColor = "red";
          if (nextCell !== null) {
            nextCell.style.backgroundColor = "red";
            befCell.style.backgroundColor = "red";
            nextCell.style.opacity = ".5";
          }
          selected.length = 0;
        }
        befCell = nextCell;
        if (nextCell !== null) {
          switch (direction) {
            case "horizontal":
              const onlyDigits = /\d{2,}/g;
              nextCell = parseInt(nextCell.id.match(onlyDigits)) + 10;
              nextCell = document.getElementById(`h${nextCell}`);
              break;

            case "vertical":
              nextCell = nextCell.nextSibling;
              break;
          }
        }
      }
    }

    return check;
  };
  const dragging = (e, cell) => {
    e.preventDefault();
    selected.length = 0;
    const correctPos = isThePositionCorrect(cell);
    dragDrop(cell, correctPos);
    dragLeave(cell);
  };
  const dragLeave = (cell) => {
    cell.addEventListener("dragleave", (e) => {
      e.preventDefault();
      selected.length = 0;
      markCells();
      return;
    });
  };
  const dragDrop = (cell) => {
    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      let correctPos = isThePositionCorrect(cell);
      if (correctPos === true) {
        positionnement(e);
        cell.removeEventListener("drop", (e) => {
          let correctPos = isThePositionCorrect(cell);
          if (correctPos === true) {
            positionnement();
            return;
          }
          markCells();
          selected.length = 0;
        });
        return;
      }
      markCells();
      selected.length = 0;
    });
  };
  const positionnement = (e) => {
    shipCreator(ship);
    shipRemove(ship);
    dragEnd(e, selected);
    selected.length = 0;
    if (
      shipOrderer.childElementCount === 0 &&
      shipSelector.childElementCount === 1
    ) {
      const startButton = document.getElementById("startButton");
      startButton.style.display = "block";
    }
  };
  const dragEnd = (e) => {
    for (let element of selected) {
      spaceTook.push(element);
    }
    for (let element of spaceTook) {
      element.style.backgroundColor = "green";
      element.style.opacity = "1";
    }
    e.target.classList.remove("dragging");
  };
  const shipRemove = () => {
    if (ship !== null) {
      ship.remove();
    }
  };
  const checkPosition = (nextCell, befCell) => {
    const onlyDigits = /\d{2,}/g;
    let nextCellId = null;
    if (nextCell !== null) {
      nextCellId = parseInt(nextCell.id.match(onlyDigits));
    } else {
      nextCellId = null;
      return false;
    }
    const befCellId = parseInt(befCell.id.match(onlyDigits));
    for (const item of spaceTook) {
      if (item == befCell || item == nextCell) {
        return false;
      }
    }
    if (
      (nextCellId === befCellId ||
        nextCellId === befCellId + 1 ||
        nextCellId === befCellId + 10) &&
      befCell.style.backgroundColor !== "red"
    ) {
      return true;
    }
    return false;
  };
  const markCells = () => {
    for (let cell of cells) {
      cell.style.backgroundColor = "black";
      cell.style.opacity = "1";
    }
    for (let element of spaceTook) {
      element.style.backgroundColor = "green";
      element.style.opacity = "1";
    }
  };
  return {
    drag,
    fleet: fleet,
  };
};

export default dragController;
