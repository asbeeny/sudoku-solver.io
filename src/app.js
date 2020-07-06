// deselect cells
deselectAll = () => {
  const cells = [
    ...document.getElementById('sudokuBoard').getElementsByClassName('highlight'),
    ...document.getElementById('sudokuBoard').getElementsByClassName('active')
  ];
  
  cells.forEach(element => {
    element.className = element.className.replace('highlight','');
    element.className = element.className.replace('active','');
  });
}

highlightCells = (e) => {
  // get clicked cell
  const activeCell = e.target;
  
  // get cell position
  const rowPos = activeCell.parentElement.rowIndex;
  const colPos = activeCell.cellIndex;
  
  // get row
  const rowCells = [...activeCell.parentElement.cells];
  
  // get column
  const colCells = [...tdCells].filter(cell => {
    return cell.cellIndex == colPos;
  })
  
  // get block index
  const rowStart = rowPos - rowPos % 3;
  const colStart = colPos - colPos % 3;
  const blockPos = [
    [rowStart, rowStart + 1, rowStart + 2],
    [colStart, colStart + 1, colStart + 2]
  ];
  
  // get block cells
  const blockCells = [...tdCells].filter(cell => {
    const isInBlockRow = blockPos[0].includes(cell.parentElement.rowIndex);
    const isInBlockCol = blockPos[1].includes(cell.cellIndex);
    return isInBlockRow & isInBlockCol
  })
  
  // highlight cell groups
  const associatedCells = [...rowCells,...colCells,...blockCells];
  [...new Set(associatedCells)].forEach(element => {
    let tempString = element.className;
    tempString = tempString.concat(' highlight');
    tempString = tempString.replace(/\s+/g,' ');
    tempString = tempString.trim();
    element.className = tempString;
  })

  // remove highlight class from active cell and add active class
  let tempString = activeCell.className;
  tempString = tempString.replace('highlight', '');
  tempString = tempString.concat(' active');
  tempString = tempString.replace(/\s+/g,' ');
  tempString = tempString.trim();
  activeCell.className = tempString;
}

// handle cell clicked event
handleCellClick = (e) => {
  deselectAll();
  highlightCells(e);
}

// add click event to all cells
const tdCells = document.getElementById('sudokuBoard').getElementsByTagName('td');
[...tdCells].forEach(element => {
  element.addEventListener('click', handleCellClick);
});

// handle body click event
handleBodyClick = (e) => {
  const sudokuTable = document.getElementById('sudokuBoard');
  let target = e.target;

  do {
    if (target == sudokuTable) {
      // clicked inside, do nothing
      return;
    }
    // go up in the DOM
    target = target.parentElement;
  } while (target);

  // do-while finishes without returning
  // => clicked outside sudoku table
  deselectAll();
}

// add click event to body to deselect cells
document.body.addEventListener('click', handleBodyClick);

// handle key press
handleKeyPress = (e) => {
  if (document.getElementsByClassName('active')[0]) {
    const activeCell = document.getElementsByClassName('active')[0];
    const keyIsNum = '123456789'.includes(e.key);
    const isClue = activeCell.className.includes('clue');
    if (!isClue) { 
      if (keyIsNum) {
        activeCell.innerHTML = e.key;
      } else if (e.key == '0' || ' ' || 'Backspace') {
        activeCell.innerHTML = '';
      }
    }
  }
}

// add key press event to document
document.addEventListener('keyup', handleKeyPress);