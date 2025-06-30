let tubes = [];

export function resetState(levelData) {
  tubes = levelData.map(tube => [...tube]);
}

export function getTubes() {
  return tubes.map(tube => [...tube]);
}

export function movePanda(fromIndex, toIndex) {
  const fromTube = tubes[fromIndex];
  const toTube = tubes[toIndex];

  if (!fromTube.length || toTube.length >= 4) return false;

  const panda = fromTube[fromTube.length - 1];

  if (!toTube.length || toTube[toTube.length - 1] === panda) {
    toTube.push(fromTube.pop());
    return true;
  }

  return false;
}

export function checkWin(moveCount, onWin) {
  const isSolved = tubes.every(tube =>
    tube.length === 0 ||
    (tube.length === 4 && tube.every(color => color === tube[0]))
  );

  if (isSolved) {
    setTimeout(() => {
      Swal.fire({
        title: '🎉 Você venceu!',
        text: `Você ganhou com ${moveCount} movimentos!`,
        icon: 'success',
        confirmButtonText: 'Jogar Novamente'
      }).then(() => {
        onWin();
      });
    }, 300);
  }
}
