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

function getScore(player1, player2) {
  if (player1 === player2) {
    return scoreMap.draw;
  } else if (
    (player1 === 'rock' && player2 === 'scissors') || 
    (player1 === 'paper' && player2 === 'rock') || 
    (player1 === 'scissors' && player2 === 'paper')
  ) {
    return scoreMap.win;
  } else {
    return scoreMap.loss;
  }
}

function getWinning(opponent) {
  switch (opponent) {
    case 'rock': return 'paper';
    case 'paper': return 'scissors';
    case 'scissors': return 'rock';
  }
}

function getLosing(opponent) {
  switch (opponent) {
    case 'rock': return 'scissors';
    case 'paper': return 'rock';
    case 'scissors': return 'paper';
  }
}

const file = await open('./day2_input.txt');
let score1 = 0;
let score2 = 0;

for await (const line of file.readLines()) {
  const [p1, p2] = line.split(" ");
  const p1s = selectionMap[p1];
  const p2s = selectionMap[p2];

  // Part 1
  score1 += scoreMap[p2s];
  score1 += getScore(p2s, p1s);

  // Part 2
  switch (p2) {
    case 'X':
      score2 += scoreMap.loss;
      score2 += scoreMap[getLosing(p1s)];
      break;
    case 'Y':
      score2 += scoreMap.draw;
      score2 += scoreMap[p1s];
      break;
    case 'Z':
      score2 += scoreMap.win;
      score2 += scoreMap[getWinning(p1s)];
      break;
  }
}

console.log("part 1:", score1)
console.log("part 2:", score2)