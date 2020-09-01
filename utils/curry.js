const curry = (f, arity = f.length, ...args) => 
  arity <= args.length 
    ? f(...args)
    : (...argz) => curry(f, arity, ...args, ...argz) 



module.exports = curry
