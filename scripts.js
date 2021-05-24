// Conway's Game of Life

// Plan
// Represent the grid as a two dimentional array
// Use two arrays, one for the current state, one for the next state
// Once the state changes, swap the arrays. The former "current state" will now be repopulated

//To avoid decisions and branches in the counting loop, the rules can be rearranged from an egocentric approach of the inner field regarding its neighbours to a scientific observer's viewpoint: if the sum of all nine fields in a given neighbourhood is three, the inner field state for the next generation will be life; if the all-field sum is four, the inner field retains its current state; and every other sum sets the inner field to death.

let state = [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
];

let newState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

function adjacentSum(state, row, column) {
    let sum = 0;
    if (state[row - 1] != undefined) {
        for (let i = column - 1; i <= column + 1; i++) {
            if (state[row - 1][i]) {
                sum += state[row - 1][i];
            }
        }
    }

    if (state[row] != undefined) {
        for (let i = column - 1; i <= column + 1; i++) {
            if (state[row][i]) {
                if (i != column) {
                    sum += state[row][i];
                }
            }
        }
    }

    if (state[row + 1] != undefined) {
        for (let i = column - 1; i <= column + 1; i++) {
            if (state[row + 1][i]) {
                sum += state[row + 1][i];
            }
        }
    }

    console.log("Sum of adjacent cells", sum);

    return sum;
}

adjacentSum(state, 0, 0);
