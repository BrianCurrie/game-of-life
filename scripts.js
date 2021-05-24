// Conway's Game of Life

// Plan
// Represent the grid as a two dimentional array
// Use two arrays, one for the current state, one for the next state
// Once the state changes, swap the arrays. The former "current state" will now be repopulated

//To avoid decisions and branches in the counting loop, the rules can be rearranged from an egocentric approach of the inner field regarding its neighbours to a scientific observer's viewpoint: if the sum of all nine fields in a given neighbourhood is three, the inner field state for the next generation will be life; if the all-field sum is four, the inner field retains its current state; and every other sum sets the inner field to death.

let grid = [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
];

let grid2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

function createGrid(size) {
    let grid = [];

    for (let i = 0; i < size; i++) {
        grid[i] = new Array(size).fill(0);
    }

    return grid;
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

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        //console.log(living(adjacentSum(grid, i, j)));
    }
}

testGrid = createGrid(30);
console.log(testGrid);
