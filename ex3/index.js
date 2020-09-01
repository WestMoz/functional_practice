/**
 * In this folder is a plain text
 * file containing the adventures
 * of sherlock homes.
 *
 * Use the Either Monad
 * to read the file in to memory
 * using fs.readFileSync
 * then count all of the lines
 * in the file
 * and all of the occurences of
 * the word `?`.
 *
 *
 */

const Either = (() => {
  const Right = (x) => ({
    map: (f) => Right(f(x)),
    chain: (f) => f(x),
    fold: (_, g) => g(x),
  });

  const Left = (x) => ({
    map: (_) => Left(x),
    chain: (_) => Left(x),
    fold: (f, _) => f(x),
  });

  const of = Right;

  return { Right, Left, of };
})();

const fs = require('fs');
const { filter, reduce, equals } = require('../ex1');

const tryCatch = (f) => {
  try {
    return Either.Right(f());
  } catch (e) {
    return Either.Left(e);
  }
};

const wc = (w) => (acc, value) => {
  return equals(w, value) ? acc + 1 : acc;
};

Either.of('./advs.txt')
  .chain((fileName) => tryCatch(() => fs.readFileSync(fileName, 'utf-8')))
  .map((book) => book.split(' '))
  .map((words) => reduce(wc('with'), 0, words))
  .fold((e) => console.log('ERROR: ', e.message), console.log);

//Either is passed filename
//chain is called and passed the file name then filename is passed to try catch method
//try catch method reads the file and and returns right or catches an error and returns left
//the book is split into individual words
//reduce is called and counts the occurences of width
//fold is called and passed either the result of reduce or the error caught by the catch
//fold either calls left or right and logs in this example
