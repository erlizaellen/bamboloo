import { levels } from "./js/levels.js";
import { renderTubes } from "./js/renderer.js";

let currentLevel = 0;
let gameState = {
  tubes: [],
  moveCount: 0,
  selectedTube: null
};

// Agora esta função está acessível globalmente
function initializeGame(levelIndex) {
  const tubes = JSON.parse(JSON.stringify(levels[levelIndex]));
  gameState = {
    tubes,
    moveCount: 0,
    selectedTube: null
  };
  document.getElementById("level-indicator").textContent = `🎯 Nível ${levelIndex + 1}`;
  renderTubes(tubes, handleTubeClick);
  updateMoveCount(0);
}


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
    gameScreen.style.display = "none";
    levelScreen.style.display = "block";
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
});

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

  renderTubes(gameState.tubes, handleTubeClick, gameState.selectedTube);
}

function movePanda(from, to) {
  const { tubes } = gameState;
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
        showCancelButton: currentLevel < levels.length - 1,
        confirmButtonText: currentLevel < levels.length - 1 ? "➡️ Próximo Nível" : "🔁 Jogar novamente",
        cancelButtonText: "🏠 Voltar ao menu"
      }).then((result) => {
        if (result.isConfirmed) {
          if (currentLevel < levels.length - 1) {
            currentLevel++;
            initializeGame(currentLevel);
          } else {
            initializeGame(currentLevel); // Reinicia mesmo nível se for o último
          }
        } else {
          document.querySelector(".game-screen").style.display = "none";
          document.querySelector(".level-screen").style.display = "block";
        }
      });
    }, 300);
  }
}

