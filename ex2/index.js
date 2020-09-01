const buzzwords = require('./buzzwords.json')
/**
 * Take a list of buzz words
 * convert them to uppercase
 * filter all buzzwords with 
 * two words
 *
 * using the identity type
 */
const Id = x => 
({
  map: f => Id(f(x)),
  chain: f => f(x),
  option: () => x
})


