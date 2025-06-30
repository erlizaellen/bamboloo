// js/renderer.js

export function renderTubes(tubes, onClick, selectedIndex = null) {
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  tubes.forEach((tube, index) => {
    const col = document.createElement("div");
    col.className = "col-3 col-sm-2 mx-1 mb-4";

    const tubeDiv = document.createElement("div");
    tubeDiv.className = `tube p-2 border rounded bg-white shadow-sm ${
      selectedIndex === index ? "border-primary border-3" : ""
    }`;
    tubeDiv.style.minHeight = "160px";
    tubeDiv.style.cursor = "pointer";
    tubeDiv.addEventListener("click", () => onClick(index));

    // Renderiza os pandas de baixo para cima
    for (let i = 3; i >= 0; i--) {
      const pandaColor = tube[i];
      const panda = document.createElement("div");
      panda.className = `panda-slot text-white d-flex align-items-center justify-content-center mb-1 ${pandaColor || "empty"}`;
      panda.style.height = "30px";
      panda.style.fontSize = "1.2rem";
      panda.style.backgroundColor = pandaColor || "#e9ecef";
      panda.textContent = pandaColor ? "🐼" : "";
      tubeDiv.appendChild(panda);
    }

    col.appendChild(tubeDiv);
    board.appendChild(col);
  });
}
