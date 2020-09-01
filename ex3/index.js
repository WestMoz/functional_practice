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
  const Right = x =>
  ({
    map: f => Right(f(x)),
    chain: f => f(x),
    fold: (_, g) => g(x)
  })

  const Left = x => 
  ({
    map: _ => Left(x),
    chain: _ => Left(x),
    fold: (f, _) => f(x)
  })

  const of = Right

  return { Right, Left, of }
})()
