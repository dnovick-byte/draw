
const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const sizeSlider = document.getElementById("sizeSlider");
const sizeLabel = document.getElementById("sizeLabel");
const backgroundPicker = document.getElementById("backgroundPicker");
const resetButton = document.getElementById("resetButton");


let gridSize = 24;
let isDrawing = false;


function createGrid(size, bgColor="rgb(245, 241, 227)") { // draws new grid
    gridSize = size;
    grid.innerHTML = ""; // clear previous grid
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // draws columns
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // draws rows

    for (let i = 0; i < size * size; i++) { // for each cell
        const cell = document.createElement("div"); // create a div for each cell
        cell.classList.add("cell"); 
        cell.style.backgroundColor = bgColor; // background color
        grid.appendChild(cell); // add cell to grid
    }
    listen();
}

function listen() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        // Change color on click
        cell.addEventListener("mousedown", drawClick);
                
        // Change color when dragging
        cell.addEventListener("mouseover", drawClickHover);
    });

}

// Stop drawing when the mouse is released
document.addEventListener("mouseup", () => {
    isDrawing = false;
});

sizeSlider.addEventListener("input", (event) => { //  when new grid size, reset to new size
    gridSize = event.target.value;
    sizeLabel.textContent = `Grid Size ${gridSize} x ${gridSize}`;
    const bgColor = hexToRGB(backgroundPicker.value);
    createGrid(gridSize, bgColor);
})



function resetBoard() {
    console.log('reset');
    const bgColor = backgroundPicker.value;
    createGrid(gridSize, bgColor);
}

resetButton.addEventListener("click", resetBoard); // when reset button is clicked, called resetBoard function


// toggle grid lines
const gridButton = document.getElementById("grid-btn");
gridButton.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    let togGrid = (cells[0].style.border === "none" ? ".5px solid #ddd" : "none")
    cells.forEach(cell => {
        cell.style.border = togGrid;
    });
});

// shading tool
const shadeButton = document.getElementById("shade-btn");
let shade = false;
shadeButton.addEventListener('click', () => {
    shade = !shade;
});

function shaded(color) {
    // Parse RGB values
    const values = color.match(/\d+/g);
    let r = parseInt(values[0]);
    let g = parseInt(values[1]);
    let b = parseInt(values[2]);

    // Adjust each color channel
    r = Math.min(255, Math.max(0, r * (1 -10/100)));
    g = Math.min(255, Math.max(0, g * (1 -10/100)));
    b = Math.min(255, Math.max(0, b * (1 -10/100)));

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function drawClick(e) {
    isDrawing = true; // Start drawing mode
    if (shade) {
        e.target.style.backgroundColor = shaded(e.target.style.backgroundColor);
    } else {
        e.target.style.backgroundColor = colorPicker.value;
    }
}

function drawClickHover(e) {
    if (isDrawing) {
        if (shade) {
            e.target.style.backgroundColor = shaded(e.target.style.backgroundColor);
        }
        else {
            e.target.style.backgroundColor = colorPicker.value;
        }
    }

}

function hexToRGB(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}


createGrid(gridSize);
