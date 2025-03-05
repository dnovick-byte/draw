const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const sizeSlider = document.getElementById("sizeSlider");
const sizeLabel = document.getElementById("sizeLabel");
const backgroundPicker = document.getElementById("backgroundPicker");
const resetButton = document.getElementById("resetButton");


let gridSize = 24;

function createGrid(size, bgColor) {
    grid.innerHTML = ""; // clear previous grid
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.backgroundColor = bgColor; // background color


        // Change color on click
        cell.addEventListener("mousedown", () => {
            cell.style.backgroundColor = colorPicker.value;
            isDrawing = true; // Start drawing mode
        });

        // Change color when dragging
        cell.addEventListener("mouseover", () => {
            if (isDrawing) {
            cell.style.backgroundColor = colorPicker.value;
            }
        });

        grid.appendChild(cell);
    }
}

// Stop drawing when the mouse is released
document.addEventListener("mouseup", () => {
    isDrawing = false;
});

sizeSlider.addEventListener("input", (event) => { //  when new grid size, reset to new size
    gridSize = event.target.value;
    sizeLabel.textContent = `Grid Size ${gridSize} x ${gridSize}`;
    const bgColor = backgroundPicker.value;
    createGrid(gridSize, bgColor);
})



function resetBoard() {
    console.log('reset');
    const bgColor = backgroundPicker.value;
    createGrid(gridSize, bgColor);
}

resetButton.addEventListener("click", resetBoard);



createGrid(gridSize);

