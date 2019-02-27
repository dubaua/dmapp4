import { flatten, sum, castToNumber, getRandomInt } from "@/utils/";

const DICE_EXPRESSION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;
const SINGLE_DICE_REGEXP = /^-?(\d+|\d*d\d+)$/;

/**
 * Returns same expression and throw an error if given expression isn't valid
 * @param {string} expression
 * @returns {string} same expression
 */
const validate = function(expression) {
  if (
    typeof expression === "string" &&
    !DICE_EXPRESSION_REGEXP.test(expression)
  ) {
    throw new Error("Given dice expression isn't valid");
  }
  return expression;
};

/**
  @typedef {Object} Dice
  @property {number} count roll repeat, positive int.
  @property {number} side random range, positive int.
  @property {number} sign represent sign, 1 or -1.
 */

/**
 * Convert single dice expression to Dice declaration
 *
 * @param {string} expression
 * @returns {Dice}
 */
const getDice = function(expression) {
  if (!SINGLE_DICE_REGEXP.test(expression)) {
    throw new Error("Given single dice expression isn't valid");
  }
  const [_count, _side] = expression.split("d").map(castToNumber);
  const count = Math.abs(_count) || 1;
  const side = _side || 1;
  const sign = _count < 0 ? -1 : 1;
  return { count, side, sign };
};

/**
 * Parse dice expression to Dice array
 *
 * @param {string} expression
 * @returns {Array.<Dice>}
 */
const parse = expression =>
  validate(expression)
    .replace(/-/g, "+-")
    .split("+")
    .map(getDice);

/**
 * Roll Dice object, returns array of numbers for every die rolled
 *
 * @param {Dice}
 * @returns {Array.<number>}
 */
const rollDie = function({ count, side, sign }) {
  let results = [];
  // no need to roll d1
  if (side === 1) {
    results.push(count * sign);
  } else {
    for (let i = 0; i < count; i++) {
      results.push(getRandomInt(side) * sign);
    }
  }
  return results;
};

/**
 * Returns minimum possible result for Dice
 *
 * @param {Dice}
 * @returns {number}
 */
const minimize = function({ count, side, sign }) {
  // maximize in case of negative roll
  const _side = sign === -1 ? side : 1;
  return count * sign * _side;
};

/**
 * Returns maximum possible result for Dice
 *
 * @param {Dice}
 * @returns {number}
 */
const maximize = function({ count, side, sign }) {
  // minimize in case of negative roll
  const _side = sign === -1 ? 1 : side;
  return count * sign * _side;
};

/**
  @typedef {Object} DetailedResults
  @property {number} result sum of rolls
  @property {Array.<number>} rolls array of results for every roll
 */

/**
 * Collects all results in flat array and sum it. Return detailed result if detailed flag given
 *
 * @param {Array.<number|Array.<number>>} results Array of numbers or arrays of numbers
 * @param {Boolean} detailed flag if need result for every roll
 * @returns {number|DetailedResults}
 */
const collect = function(results, detailed) {
  const rolls = results.reduce(flatten, []);
  const result = rolls.reduce(sum, 0);
  if (detailed) {
    return { result, rolls };
  }
  return result;
};

/**
 * Roll Dice array. Return detailed result if detailed flag given
 *
 * @param {Array.<Dice>} dice
 * @param {Boolean} detailed
 * @returns {Number|DetailedResults}
 */
const rollDice = (dice, detailed) => collect(dice.map(rollDie), detailed);

/**
 * Returns minimum possible result for Dice array. Return detailed result if detailed flag given
 *
 * @param {Array.<Dice>} dice
 * @param {Boolean} detailed
 * @returns {Number|DetailedResults}
 */
const minDice = (dice, detailed) => collect(dice.map(minimize), detailed);

/**
 * Returns maximum possible result for Dice array. Return detailed result if detailed flag given
 *
 * @param {Array.<Dice>} dice
 * @param {Boolean} detailed
 * @returns {Number|DetailedResults}
 */
const maxDice = (dice, detailed) => collect(dice.map(maximize), detailed);

/**
 * Roll dice expression. Return detailed result if detailed flag given
 *
 * @param {string} expression
 * @param {Boolean} detailed
 * @returns {Number|DetailedResults}
 */
const roll = (expression, detailed) => rollDice(parse(expression), detailed);

/**
 * Returns minimum possible result for dice expression. Return detailed result if detailed flag given
 *
 * @param {string} expression
 * @param {Boolean} detailed
 * @returns {Number|DetailedResults}
 */
const min = (expression, detailed) => minDice(parse(expression), detailed);

/**
 * Returns maximum possible result for dice expression. Return detailed result if detailed flag given
 *
 * @param {string} expression
 * @param {Boolean} detailed
 * @returns {Number|DetailedResults}
 */
const max = (expression, detailed) => maxDice(parse(expression), detailed);

export { parse, rollDice, minDice, maxDice, roll, min, max };
