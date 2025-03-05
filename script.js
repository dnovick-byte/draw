const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const sizeSlider = document.getElementById("sizeSlider");
const sizeLabel = document.getElementById("sizeLabel");
const backgroundPicker = document.getElementById("backgroundPicker");
const resetButton = document.getElementById("resetButton");


let gridSize = 24;


function createGrid(size, bgColor) { // draws new grid
    gridSize = size;
    grid.innerHTML = ""; // clear previous grid
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // draws columns
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // draws rows

    for (let i = 0; i < size * size; i++) { // for each cell
        const cell = document.createElement("div"); // create a div for each cell
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

        grid.appendChild(cell); // add cell to grid
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


// toggle grid lines
const gridButton = document.getElementById("grid-btn");
gridButton.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    let togGrid = (cells[0].style.border === "none" ? ".5px solid #ddd" : "none")
    cells.forEach(cell => {
        cell.style.border = togGrid;
    });
});


createGrid(gridSize);

