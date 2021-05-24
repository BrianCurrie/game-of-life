// Conway's Game of Life

// Plan
// Represent the grid as a two dimentional array
// Use two arrays, one for the current state, one for the next state
// Once the state changes, swap the arrays. The former "current state" will now be repopulated

//To avoid decisions and branches in the counting loop, the rules can be rearranged from an egocentric approach of the inner field regarding its neighbours to a scientific observer's viewpoint: if the sum of all nine fields in a given neighbourhood is three, the inner field state for the next generation will be life; if the all-field sum is four, the inner field retains its current state; and every other sum sets the inner field to death.

let arr = createArr(30); //2d array

createGrid(30);

function createArr(size) {
    let arr = [];

    for (let i = 0; i < size; i++) {
        arr[i] = new Array(size).fill(0);
    }

    return arr;
}

function createGrid(size) {
    const container = document.getElementById("container");

    for (let r = 0; r < size; r++) {
        let row = document.createElement("div");

        for (let c = 0; c < size; c++) {
            let column = document.createElement("div");
            row.appendChild(column).className = "cell";
        }

        container.appendChild(row).className = "gridRow";
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

function living(sum) {
    if (sum == 3) {
        return "Alive";
    } else if (sum == 4) {
        return "No change";
    } else {
        return "Dead";
    }
}
