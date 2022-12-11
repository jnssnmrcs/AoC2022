import { open } from 'node:fs/promises';

let scoreMap = {
    rock: 1,
    paper: 2,
    scissors: 3,
    loss: 0,
    draw: 3,
    win: 6,
};

let selectionMap = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors",
}

const file = await open('./day2_input.txt');
let score = 0;

for await (const line of file.readLines()) {
    const [player1, player2] = line.split(" ");
}