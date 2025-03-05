
const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const sizeSlider = document.getElementById("sizeSlider");
const sizeLabel = document.getElementById("sizeLabel");
const backgroundPicker = document.getElementById("backgroundPicker");


document.getElementById("reset-btn").addEventListener("click", resetBoard); // reset button -> reset function
document.getElementById('screenshot-btn').addEventListener("click", screenShot); // screenshot button -> screenshot function


let gridSize = 24;
let isDrawing = false;
let bgColor = "#FFFFFF";

function createGrid(size, bgColor="rgb(255, 255, 255)") { // draws new grid
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
    bgColor = hexToRGB(backgroundPicker.value);
    createGrid(gridSize, bgColor);
})



function resetBoard() {
    console.log('reset');
    bgColor = backgroundPicker.value;
    createGrid(gridSize, bgColor);
}

function screenShot() {
    console.log('screenshot');
    html2canvas(document.getElementById("grid")).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "screenshot.png";
        link.click();
    });
};



// toggle grid lines
const gridButton = document.getElementById("grid-btn");
gridButton.classList.toggle('active');
gridButton.addEventListener('click', () => {
    gridButton.classList.toggle('active');

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
    if (shade) {
        shade = false;
        shadeButton.classList.remove('active');
    } else {
        shade = true;
        shadeButton.classList.toggle('active');
        lighten = false;
        lightenButton.classList.remove('active');
        erase=false;
        eraseButton.classList.remove('active');
    }
});

// lighten tool
const lightenButton = document.getElementById("lighten-btn");
let lighten = false;
lightenButton.addEventListener('click', () => {
    if (lighten) {
        lighten = false;
        lightenButton.classList.remove('active');
    } else {
        lighten = true;
        lightenButton.classList.toggle('active');
        shade = false;
        shadeButton.classList.remove('active');
        erase=false;
        eraseButton.classList.remove('active');

    }
});

// erase tool
const eraseButton = document.getElementById("erase-btn");
let erase = false;
eraseButton.addEventListener('click', () => {
    if (erase) {
        erase = false;
        eraseButton.classList.remove('active');
    } else {
        erase = true;
        eraseButton.classList.toggle('active');
        shade = false;
        shadeButton.classList.remove('active');
        lighten = false;
        lightenButton.classList.remove('active');

    }
});

function shaded(color, percent) {
    // Parse RGB values
    const values = color.match(/\d+/g);
    let r = parseInt(values[0]);
    let g = parseInt(values[1]);
    let b = parseInt(values[2]);

    // Adjust each color channel
    const change = Math.floor(255 * (percent/100));
    r = Math.min(255, Math.max(0, r + change));
    g = Math.min(255, Math.max(0, g + change));
    b = Math.min(255, Math.max(0, b + change));

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function drawClick(e) {
    isDrawing = true; // Start drawing mode
    if (shade) {
        e.target.style.backgroundColor = shaded(e.target.style.backgroundColor, -5); // shade down 10%
    } else if (lighten) {
        e.target.style.backgroundColor = shaded(e.target.style.backgroundColor, 5); // lighten up 10%
    } else if (erase) {
        e.target.style.backgroundColor = bgColor;
    } else {
        e.target.style.backgroundColor = colorPicker.value;
    }
}

function drawClickHover(e) {
    if (isDrawing) {
        if (shade) {
            e.target.style.backgroundColor = shaded(e.target.style.backgroundColor, -5); // shade down 10%
        } else if (lighten) {
            e.target.style.backgroundColor = shaded(e.target.style.backgroundColor, 5); // lighten up 10%
        } else if (erase) {
            e.target.style.backgroundColor = bgColor;
        } else {
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
