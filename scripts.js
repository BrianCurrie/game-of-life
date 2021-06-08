/***************************

    Conway's Game of Life 

****************************/

/* 
To avoid decisions and branches in the counting loop, 
the rules can be rearranged from an egocentric approach 
of the inner field regarding its neighbours to a scientific observer's viewpoint: 
if the sum of all nine fields in a given neighbourhood is three, the inner 
field state for the next generation will be life; if the all-field sum is four, 
the inner field retains its current state; and every other sum sets the inner 
field to death.
*/
const gridSize = 50; //gridSize hardcoded, allow user to choose size?

let currentArray = createArr(gridSize); //2d array
let newArray = createArr(gridSize);

let simRunning; // Interval for calling runSim
let simSpeed = 500; // Default sim speed
let generationCounter = 0;

let slider = (document.getElementById("speed").value = 500);

let isDrawing = false;

createGrid(gridSize);
createPresetListeners();

/***************************

    Vh on mobile fix

****************************/

function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("resize", () => {
    setVh();
});

setVh();

/***************************

    Button Event Listeners

****************************/

document.getElementById("nextStep").addEventListener("click", runSim);
document.getElementById("play").addEventListener("click", () => {
    simRunning = setInterval(runSim, simSpeed);
    document.getElementById("play").disabled = true;
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(simRunning);
    document.getElementById("play").disabled = false;
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(simRunning);
    document.getElementById("play").disabled = false;
    currentArray = createArr(gridSize);
    newArray = createArr(gridSize);
    displayGrid();
    generationCounter = 0;
    document.getElementById(
        "generations"
    ).innerHTML = `Generation ${generationCounter}`;
});

document.getElementById("presetsButton").addEventListener("click", () => {
    let dropdown = document.getElementById("dropdown");
    let title = document.getElementById("presetTitle");
    let presetButtonContainer = document.getElementById(
        "dropdownButtonContainer"
    );
    let infoButton = document.getElementById("infoButton");

    if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");
        title.classList.remove("hidden");
        presetButtonContainer.classList.add("justifyFlexEnd");
    } else {
        dropdown.classList.add("hidden");
        title.classList.add("hidden");
        presetButtonContainer.classList.remove("justifyFlexEnd");
    }

    if (infoButton.classList.contains("hidden")) {
        infoButton.classList.remove("hidden");
    } else {
        infoButton.classList.add("hidden");
    }
});

document.getElementById("infoButton").addEventListener("click", () => {
    let info = document.getElementById("infoContainer");
    let infoTitle = document.getElementById("intoTitle");
    let presetButton = document.getElementById("presetsButton");

    if (info.classList.contains("hidden")) {
        info.classList.remove("hidden");
        infoTitle.classList.remove("hidden");
    } else {
        info.classList.add("hidden");
        infoTitle.classList.add("hidden");
    }

    if (presetButton.classList.contains("hidden")) {
        presetButton.classList.remove("hidden");
    } else {
        presetButton.classList.add("hidden");
    }
});

// Set speed between one generation every 1100ms -> every 100ms
document.getElementById("speed").addEventListener("input", () => {
    clearInterval(simRunning);
    simSpeed = Math.round(1100 - document.getElementById("speed").value);
    document.getElementById("play").disabled = false;
});

/***************

    Presets

****************/

function presetListener(preset) {
    document.getElementById(preset).addEventListener("click", () => {
        clearInterval(simRunning);
        document.getElementById("play").disabled = false;

        // Using JSON parse and stringify to dupicate arrays instead of passing pointers arround
        currentArray = JSON.parse(JSON.stringify(presets[preset]));
        newArray = JSON.parse(JSON.stringify(presets[preset]));
        displayGrid();

        generationCounter = 0;
        document.getElementById(
            "generations"
        ).innerHTML = `Generation ${generationCounter}`;

        document.getElementById("dropdown").classList.add("hidden");
        document.getElementById("presetTitle").classList.add("hidden");
        document.getElementById("infoButton").classList.remove("hidden");
        document
            .getElementById("dropdownButtonContainer")
            .classList.remove("justifyFlexEnd");
    });
}

function createPresetListeners() {
    for (let preset in presets) {
        presetListener(preset);
    }
}

/*****************

    Presets End

******************/

function runSim() {
    for (let i = 0; i < currentArray.length; i++) {
        for (let j = 0; j < currentArray[i].length; j++) {
            if (adjacentSum(currentArray, i, j) == 3) {
                newArray[i][j] = 1;
            } else if (adjacentSum(currentArray, i, j) == 4) {
                newArray[i][j] = currentArray[i][j];
            } else {
                newArray[i][j] = 0;
            }
        }
    }
    displayGrid();
    currentArray = JSON.parse(JSON.stringify(newArray));
    newArray = createArr(gridSize);
    generationCounter++;
    document.getElementById(
        "generations"
    ).innerHTML = `Generation ${generationCounter}`;
}

function displayGrid() {
    const rows = Array.from(document.getElementsByClassName("gridRow"));

    for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray[i].length; j++) {
            if (newArray[i][j] == 1) {
                rows[i].childNodes[j].classList.add("alive");
            } else {
                rows[i].childNodes[j].classList.remove("alive");
            }
        }
    }
}

// Create 2d array filled with 0s
function createArr(size) {
    let currentArray = [];

    for (let i = 0; i < size; i++) {
        currentArray[i] = new Array(size).fill(0);
    }

    return currentArray;
}

function createGrid(size) {
    const container = document.getElementById("container");
    let row;
    let cell;

    for (let r = 0; r < size; r++) {
        row = document.createElement("div");

        for (let c = 0; c < size; c++) {
            cell = document.createElement("div");
            cell["location"] = [r, c];
            row.appendChild(cell).className = "cell noSelect";
        }

        container.appendChild(row).className = "gridRow";
    }

    function draw(e) {
        isDrawing = true;
        if (e.target["location"] != undefined) {
            row = e.target["location"][0];
            cell = e.target["location"][1];
            if (e.target.classList.contains("alive")) {
                e.target.classList.remove("alive");
                currentArray[row][cell] = 0;
            } else {
                e.target.classList.add("alive");
                currentArray[row][cell] = 1;
            }
        }
    }

    function drawStop(e) {
        isDrawing = false;
    }

    function drawMove(e) {
        let hasPosition = false;
        if (e.target["location"] != undefined) {
            row = e.target["location"][0];
            cell = e.target["location"][1];
            hasPosition = true;
        }
        if (isDrawing && hasPosition) {
            if (e.target.classList.contains("alive")) {
                e.target.classList.remove("alive");
                currentArray[row][cell] = 0;
            } else {
                e.target.classList.add("alive");
                currentArray[row][cell] = 1;
            }
        }
    }

    container.addEventListener("mousedown", draw);
    container.addEventListener("mouseup", drawStop);
    container.addEventListener("mouseover", drawMove);
}

/* adjacentSum takes the sum of any 9 cell group, row+column corresponding to the center of this 3x3 grid  */
function adjacentSum(grid, row, column) {
    let sum = 0;

    for (let x = -1; x < 2; x++) {
        if (grid[row + x] != undefined) {
            for (let i = column - 1; i <= column + 1; i++) {
                if (grid[row + x][i]) {
                    sum += grid[row + x][i];
                }
            }
        }
    }

    return sum;
}
