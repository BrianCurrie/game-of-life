// Conway's Game of Life

// Plan
// Represent the grid as a two dimentional array
// Use two arrays, one for the current state, one for the next state
// Once the state changes, swap the arrays. The former "current state" will now be repopulated

//To avoid decisions and branches in the counting loop, the rules can be rearranged from an egocentric approach of the inner field regarding its neighbours to a scientific observer's viewpoint: if the sum of all nine fields in a given neighbourhood is three, the inner field state for the next generation will be life; if the all-field sum is four, the inner field retains its current state; and every other sum sets the inner field to death.

const gridSize = 60; //gridSize hardcoded, allow user to choose size?

let currentArray = createArr(gridSize); //2d array
let newArray = createArr(gridSize);
createGrid(gridSize);

let simRunning;
document.getElementById("nextStep").addEventListener("click", runSim);
document.getElementById("play").addEventListener("click", () => {
    simRunning = setInterval(runSim, 500);
    document.getElementById("play").disabled = true;
});
document.getElementById("pause").addEventListener("click", () => {
    clearInterval(simRunning);
    document.getElementById("play").disabled = false;
});

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
    currentArray = newArray;
    newArray = createArr(gridSize);
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

function createArr(size) {
    let currentArray = [];

    for (let i = 0; i < size; i++) {
        currentArray[i] = new Array(size).fill(0);
    }

    return currentArray;
}

function createGrid(size) {
    const container = document.getElementById("container");

    for (let r = 0; r < size; r++) {
        let row = document.createElement("div");

        for (let c = 0; c < size; c++) {
            let cell = document.createElement("div");
            cell["location"] = [r, c];
            row.appendChild(cell).className = "cell";
        }

        container.appendChild(row).className = "gridRow";
    }

    const rows = Array.from(document.getElementsByClassName("gridRow"));

    for (let i = 0; i < currentArray.length; i++) {
        for (let j = 0; j < currentArray[i].length; j++) {
            rows[i].childNodes[j].addEventListener("click", (e) => {
                let row = e.target["location"][0];
                let cell = e.target["location"][1];
                if (e.target.classList.contains("alive")) {
                    e.target.classList.remove("alive");
                    currentArray[row][cell] = 0;
                } else {
                    e.target.classList.add("alive");
                    currentArray[row][cell] = 1;
                }
            });
        }
    }
}

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
