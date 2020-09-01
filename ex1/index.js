// ------------ support functions ----------------------
const compose = require('../utils/compose');
const curry = require('../utils/curry');
/**
 * Functional JS Exercises
 *
 *
 *
 */
/**
 * create a map function that
 * transforms values by mapping
 * over each item in an array
 *
 * HINT: use curry
 *
 * @param {function} f
 * @param {array} items
 * @returns {array}
 */
const map = curry((f, items) => {
  let result = [];
  for (let i = 0; i < items.length; i++) {
    result.push(f(items[i]));
  }
  return result;
});

/**
 * create a filter function that
 * limits the list of items using
 * a predicate function
 *
 * @param {function} f
 * @param {array} items
 * @returns {array}
 */
const filter = curry((f, items) => items.filter(f));

/**
 * create a reduce funtion
 *
 * @param {function} reducer
 * @param {any} initialValue
 * @param {array} items
 * @returns {any}
 */
const reduce = curry((reducer, initialValue, items) => {
  let result = reducer(initialValue, items[0]);
  for (let i = 1; i < items.length; i++) {
    result = reducer(result, items[i]);
  }
  return result;
});

/**
 * create a function
 * that converts string
 * to uppercase
 */
const toUpper = curry((s) => s.toUpperCase());
//console.log(toUpper()('hello'));

/**
 * create a function
 * that converts string
 * to lowercase
 */
const toLower = curry((s) => s.toLowerCase());
//console.log(toLower()('HELLO'));

/**
 * create a prop function
 * that will return the
 * value of a key of an object
 *
 * @param {string} key
 * @param {object} obj
 * @returns {any}
 *
 */
const prop = curry((key, obj) => obj[key]);
let testObj = {
  a: 'aVal',
};
//console.log(prop('a')(testObj));

/**
 * create a equals function
 * that will return true if
 * both values are equal
 * or false if both are not
 * equal
 *
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
const equals = curry((a, b) => a === b);
//console.log(equals(2)(2));

/**
 * create a propEq function
 * which takes a key, value
 * and object and returns
 * true if key of object value
 * equals the passed in value
 *
 * @param {string} key
 * @param {any} value
 * @param {object} obj
 * @returns {boolean}
 */
// const propEq = curry((key, value, obj) => obj[key] === value);
const propEq = curry((key, value, obj) =>
  compose(equals(value), prop(key))(obj),
);
//console.log(propEq('a', 'aVal', testObj));

/**
 * create a function called
 * path that takes an
 * array of keys and
 * an object that
 * this function tries to
 * extract the value of the
 * nested object
 *
 * path(['a','b','c'],{a:{b:{c: "hello"}}}) === "hello"
 *
 * @param {array} keys
 * @param {object} obj
 * @returns {any}
 *
 */
const group = {
  dogs: [
    {
      name: 'ribbons',
    },
  ],
};
const path = curry((keys, obj) =>
  reduce((o, value) => prop(value, o), obj, keys),
);

//console.log(path(['dogs', 0, 'name'], group));

/**
 * create pathEq
 *
 * @param {array} keys
 * @param {any} value
 * @param {object} obj
 * @returns {boolean}
 */
const pathEq = curry((keys, value, obj) =>
  compose(equals(value), path(keys))(obj),
);

//console.log(pathEq(['dogs', '0', 'name'], 'ribbons', group));

module.exports = {
  map,
  filter,
  reduce,
  toUpper,
  toLower,
  prop,
  equals,
  propEq,
  path,
};
