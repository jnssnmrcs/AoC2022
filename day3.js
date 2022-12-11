import { open } from 'node:fs/promises';

function getPriority(letter) {
  const code = letter.charCodeAt(0);

  if (code <= 122 && code >= 97) {
    return code - 96; 
  }

  if (code <= 90 && code >= 65) {
    return code - 38; 
  }
}

const file = await open('./day3_input.txt');
const rucksacks = [];

// Part1
let sum = 0;

for await (const line of file.readLines()) {
  const first = line.substring(0, line.length / 2)
  const second = line.substring(line.length / 2, line.length)

  rucksacks.push(line);

  for (const letter of first) {
    if (second.includes(letter)) {
      sum += getPriority(letter);
      break;
    }
  }
}

console.log("part 1:", sum)

//Part 2
sum = 0;

outer: for (let i = 0; i < rucksacks.length - 2; i += 3) {
  const first = new Set(rucksacks[i])
  const second = new Set(rucksacks[i + 1])
  const third = new Set(rucksacks[i + 2])
  const itemsFound = {};

  const checkItem = (item) => {
    if (itemsFound[item] === 2) {
      return true;
    } else if (!itemsFound[item]) {
      itemsFound[item] = 1;
    } else {
      itemsFound[item] += 1;
    }

    return false;
  }

  first.forEach(checkItem)
  second.forEach(checkItem)

  for (const item of third) {
    if (checkItem(item)) {
      sum += getPriority(item);
      continue outer;
    }
  }
}

console.log("part 2:", sum)