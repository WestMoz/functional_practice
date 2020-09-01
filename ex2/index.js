const { map, toUpper, filter, equals } = require('../ex1');
const compose = require('../utils/compose');
const buzzwords = require('./buzzwords.json');
/**
 * Take a list of buzz words
 * convert them to uppercase
 * filter all buzzwords with
 * two words
 *
 * using the identity type
 */
const Id = (x) => ({
  map: (f) => Id(f(x)),
  chain: (f) => f(x),
  option: () => x,
});

const wordCount = (s) => s.split(' ').length;

const wordCountEq = (v) => compose(equals(v), wordCount);

//console.log(Id.toString());
// console.log(
//   Id(buzzwords)
//     .map((words) => map(toUpper, words))
//     .map(filter(wordCountEq(2)))
//     .option(),
// );
console.log(
  Id(buzzwords)
    .map(map(toUpper))
    .map(filter(wordCountEq(2)))
    .option(),
);
