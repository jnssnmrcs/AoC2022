import { open } from 'node:fs/promises';

const file = await open('./day1_input.txt');
const calories = []
let i = 0;

for await (const line of file.readLines()) {
    if (!line) {
        i++;
    } else if (!calories[i]) {
        calories[i] = parseInt(line);
    } else {
        calories[i] += parseInt(line);
    }
}

calories.sort((a, b) => b - a);

console.log("part 1:", calories[0])
console.log("part 2:", calories[0] + calories[1] + calories[2])