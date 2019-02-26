export const castToNumber = string => Number(string);

export const sum = (accumulator, current) => accumulator + current;

export const flatten = (accumulator, current) =>
  Array.isArray(current)
    ? accumulator.concat(current.reduce(flatten, []))
    : accumulator.concat(current);

export const rollDie = side => Math.floor(Math.random() * side) + 1;

export function rollDice({ count, side, sign }) {
  let results = [];
  for (let i = 0; i < count; i++) {
    results.push(rollDie(side) * sign);
  }
  return results;
}

export function minDice({ count, side, sign }) {
  const _side = sign === -1 ? side : 1;
  return count * sign * _side;
}

export function maxDice({ count, side, sign }) {
  const _side = sign === -1 ? 1 : side;
  return count * sign * _side;
}
