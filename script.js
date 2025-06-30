// js/script.js

import { levels } from "./js/levels.js";
import { renderTubes } from "./js/renderer.js";

let currentLevel = 0;
let gameState = {
  tubes: [],
  moveCount: 0,
  selectedTube: null
};

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startScreen = document.querySelector(".start-screen");
  const levelScreen = document.querySelector(".level-screen");
  const gameScreen = document.querySelector(".game-screen");

  startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    levelScreen.style.display = "block";
  });

  window.backToLevelScreen = () => {
  document.querySelector(".game-screen").style.display = "none";
  document.querySelector(".level-screen").style.display = "block";
};

  window.startGameWithLevel = (levelIndex) => {
    levelScreen.style.display = "none";
    gameScreen.style.display = "block";
    currentLevel = levelIndex;
    initializeGame(currentLevel);
  };

  window.resetGame = () => {
    initializeGame(currentLevel);
  };

  function initializeGame(levelIndex) {
    const tubes = JSON.parse(JSON.stringify(levels[levelIndex]));
    gameState = {
      tubes,
      moveCount: 0,
      selectedTube: null
    };
    renderTubes(tubes, handleTubeClick);
    updateMoveCount(0);
  }

  function handleTubeClick(index) {
    const { tubes, selectedTube } = gameState;

    if (selectedTube === null) {
      gameState.selectedTube = index;
    } else {
      if (selectedTube !== index) {
        movePanda(selectedTube, index);
      }
      gameState.selectedTube = null;
    }
    renderTubes(tubes, handleTubeClick, gameState.selectedTube);
  }

function movePanda(from, to) {
  const tubes = gameState.tubes;
  const fromTube = tubes[from];
  const toTube = tubes[to];

  if (fromTube.length === 0 || toTube.length >= 4) return;

  const panda = fromTube[fromTube.length - 1];

  if (
    toTube.length === 0 ||
    toTube[toTube.length - 1] === panda
  ) {
    toTube.push(fromTube.pop());
    gameState.moveCount++;
    updateMoveCount(gameState.moveCount);
    checkWinCondition(); 
  }


  }

  function updateMoveCount(count) {
    document.getElementById("move-count").textContent = count;
  }
  function checkWinCondition() {
  const { tubes } = gameState;
  const isWin = tubes.every(tube => {
    return (
      tube.length === 0 ||
      (tube.length === 4 && tube.every(color => color === tube[0]))
    );
  });

  if (isWin) {
    setTimeout(() => {
      Swal.fire({
        title: "🎉 Você venceu!",
        text: `Movimentos: ${gameState.moveCount}`,
        icon: "success",
        confirmButtonText: "Jogar novamente",
      }).then(() => {
        document.querySelector(".game-screen").style.display = "none";
        document.querySelector(".level-screen").style.display = "block";
      });
    }, 300);
  }
}

});
