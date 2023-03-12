const board = document.getElementById("GameBoard");
const turn = document.getElementById("game-status");
const result = document.getElementById("result");
const restartButton = document.getElementById("restart");
const cells = document.querySelectorAll(".cell");
const intro = document.getElementById("intro");
const endPage = document.getElementById("endPage");
const gameDetails = document.getElementById("game-details");
const startButton = document.getElementById("start");
const newGameButton = document.getElementById("new-game");
const players = function (name, option) {
  this.name = name;
  this.option = option;
  return { name, option };
};
const GameBoard = (function () {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;
  let player1 = players("X", "X");
  let player2 = players("O", "O");
  let win = false;
  let tie = false;
  let currentPlayer = player1;
  turn.textContent = `${currentPlayer.name}'s turn`;
  function buildBoard() {
    cells.forEach((cell) => cell.addEventListener("click", cellClick));
    restartButton.addEventListener("click", () => {
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.addEventListener("click", cellClick);
        currentPlayer = player1;
        turn.textContent = `${currentPlayer.name}'s turn`;
        gameboard = ["", "", "", "", "", "", "", "", ""];
      });
    });
  }
  newGameButton.addEventListener("click", () => {
    intro.style.display = "block";
    gameBeginning.showIntro();
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    gameboard = ["", "", "", "", "", "", "", "", ""];
    result.textContent = "";
    currentPlayer = player1;
    turn.textContent = `${currentPlayer.name}'s turn`;
    tie=false;
    win=false;
  });
  function cellClick(e) {
    console.log(e.target);
    e.target.textContent = currentPlayer.option;
    let o = e.target.getAttribute("cellIndex");
    gameboard[o] = currentPlayer.option;
    switchTurns();
    let gf = GameFlow(gameboard);
    let end = gf.checkResult();
    if (end === true) {
      win = true;
      gameOver = true;
      endGame();
    }
    for (let j = 0; j <= gameboard.length - 1; j++) {
      if (gameboard[j] === "") break;
      if (gameboard[j] !== "" && j === 8 && end === false) {
        gameOver = true;
        tie = true;
        endGame();
        break;
      }
    }
    e.target.removeEventListener("click", cellClick);
  }
  function switchTurns() {
    if (currentPlayer === player1) currentPlayer = player2;
    else currentPlayer = player1;
    turn.textContent = `${currentPlayer.name}'s turn`;
  }
  function endGame() {
    if (gameOver === true) {
      endPage.style.display = "block";
      if (win === true && currentPlayer.name==='X') result.textContent = 'O wins';
      if(win===true && currentPlayer.name==='O')result.textContent='X wins';
      if (tie === true) result.textContent = "Tie";
      turn.textContent = "";
      restartButton.style.display = "none";
    }
  }

  return { gameboard, buildBoard };
})();

const GameFlow = function (gb) {
  const winconditionsIndex = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];
  function checkResult() {
    let result = false; //false means tie,win means true
    for (let i = 0; i <= winconditionsIndex.length - 1; i++) {
      let condition = winconditionsIndex[i];
      let cell1 = gb[condition[0]];
      let cell2 = gb[condition[1]];
      let cell3 = gb[condition[2]];
      if (cell1 === "" || cell2 === "" || cell3 === "") continue;
      else {
        if (cell1 === cell2 && cell1 === cell3 && cell2 === cell3)
          result = true;
      }
    }
    return result;
  }
  return { checkResult };
};

const gameBeginning = (function () {
  function showIntro() {
    board.style.display = "none";
    gameDetails.style.display = "none";
    endPage.style.display = "none";
    startButton.addEventListener("click", start);
  }
  showIntro();
  function start() {
    board.style.display = "grid";
    gameDetails.style.display = "flex";
    intro.style.display = "none";
    restartButton.style.display = "block";

    GameBoard.buildBoard();
  }
  return { showIntro };
})();
