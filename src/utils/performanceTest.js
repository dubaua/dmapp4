export function rollDiceLoop({ count, side, sign }) {
  let results = [];
  for (let i = 0; i < count; i++) {
    results.push(rollDie(side) * sign);
  }
  return results;
}

export const rollDiceArray = ({ count, side, sign }) =>
  Array.from({ length: count }, () => rollDie(side)).map(
    result => result * sign
  );

export const rollDiceTimes = ({ count, side, sign }) =>
  times(() => rollDie(side), count).map(result => result * sign);

const times = (fn, count) => {
  var willReturn = [];
  let step = 0;
  while (step < count) {
    willReturn[step] = fn();
    step++;
  }
  return willReturn;
};

export const rollDieMath = side => Math.floor(Math.random() * side) + 1;

export const rollDieCrypto = side => Math.floor(random() * side) + 1;

const rollDie = rollDieMath;

const powerDivider = Math.pow(2, -32);

const random = () => {
  const _crypto = window.crypto || window.msCrypto;
  let array = new Uint32Array(1);
  _crypto.getRandomValues(array);
  return array[0] * powerDivider;
};
