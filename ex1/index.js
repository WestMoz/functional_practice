// ------------ support functions ----------------------
const compose = require('../utils/compose')
const curry = require('../utils/curry')
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
const map = null

/**
 * create a filter function that
 * limits the list of items using
 * a predicate function
 *
 * @param {function} f
 * @param {array} items
 * @returns {array}
 */
const filter = null

/**
 * create a reduce funtion
 *
 * @param {function} reducer
 * @param {any} initialValue
 * @param {array} items
 * @returns {any}
 */
const reduce = null

/**
 * create a function
 * that converts string
 * to uppercase
 */
const toUpper = null

/**
 * create a function
 * that converts string
 * to lowercase
 */
const toLower = null

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
const prop = null

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
const equals = null

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
const propEq = null


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
const path = null

/**
 * create pathEq 
 *
 * @param {array} keys
 * @param {any} value
 * @param {object} obj
 * @returns {boolean}
 */
const pathEq = null

module.exports = {map, filter, reduce, toUpper, toLower, prop, equals, propEq, path}
