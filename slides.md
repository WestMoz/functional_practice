# FPJS 201

---

## Learning Ojectives

In this workshop, you are going to learn

* A different way to think about the flow of your application
* How to avoid the footguns of JS, (this, null, and undefined)
* How to dotChain a value from a to b?
* How to write async code in a lazy style?
* How to make writing tests a breeze?

---

### Agenda

* Review Functional JS
* Shipping analogy
* What is a functor?
* What is a monad?
* Identity Monad
* Either Monad
* Task Monad
* What are Lenses?
* Lens function
* View, Set, Over functions

---

## Review Functional JS

---

# What is a closure?

---

# What is a higher order function?

---

# Can a map function return more or less than the orignal value?

---

# Can a filter function return different values?

---

# Can a reduce function return any type as a result?

---

# What does the compose function do?

---

``` js
const compose = (f,g) => v => f(g(v))
```

TODO: Add Exercises

---

# What does the curry function do?

---

``` js
const curry = (f, arity = f.length, ...args) => 
  arity <= args.length 
    ? f(...args)
    : (...argz) => curry(f, arity, ...args, ...argz) 
```

---

### Exercises

open ex1/index.js

---

## Lets talk about the shipping system

---

Think for a moment, you have a farm full of strawberries, and you 
want to sell these strawberries all over the world. How do you get
them from A to B?

---

Now you are a shopper, and you want stawberries, you go to your store
and walk down the produce isle and you select a package of strawberries.

---

How did those strawberries get from the farm to your table? How does any
thing get from one location to another? 

---

There is a highly complex distributed system, and that same system works
for multiple goods, without ever knowing what the goods are.

---

In 2006, I worked for a company, ExcelleRx who was the number one over night
shipper of Fedex: Fedex helped us ship over 30,000 packages a night 6 days a week.

---

Why is this important? Well FPJS is very similar, you use a set of general functions
to compose your way into a complex system without concern of what the values are you
are moving from one location to another and transforming along the way.

My hope is this starts to make sense by the end of the workshop

---

# Functors and Monads 

---

First, do not let the strange works freak you out, I know it is freaking you out, what is this crazy verbage. Well, naming things is hard! But once you name it, if you want people to know what you are talking about, you have to use it.

---

# What is functor?

---

A functor is any type that has a `map` method and that `map` method takes one argument, a `function`. And that function is a `unary` function. BONUS: who can tell me what a `unary` function is?

---

new school

``` js
const Id = x =>
({
  map: (f) => Id(f(x))
})
```

old school

``` js
function Id(x) {
  return {
    map(f) {
      return Id(f(x))
    }
  }
}
```

---

# What is a monad?

---

A monad is a functor with a `chain` method, and a `chain` method takes a function
which returns an instance of the same Type. You can also think of it as a flatmap function.

---

``` js
const Id = x => 
({
  map: f => Id(f(x)),
  chain: f => f(x)
})
```

---

# Introducing the Identity monad

---

This is the basic of all algerbraic data types, the Identity Monad, is equivalent to the 
box in the shipping example, it lets you pack up a value and pass it around, then pop out
the new value when you are done taking through your system.

---

```
const Id = x =>
({
  map: f => Id(f(x)),
  chain: f => f(x),
  option: () => x
})
```

---

## Exercises

open ex2/index.js

---

# This or That or the Either Monad

---

### Either

The either type is actually two types a Left or Right, when the Left(v) is returned
then instead of continuing down the pipe of maps and chains, the value is sent 
all the way down to the fold function and the left function executes, when the
Right(v) the flow proceeds to the next step in the chain and finally calls the 
right function of the fold.


---


```
                 +--------+
                 |        |
             +---+        +---+
             |   +--------+   |
             |                |
             |                |
         +---v---+        +---v---+
chain -> |       |        |       | chain -> Right(v)
Left(v)  |       |        |       |
         +-------+        +---+---+
                 |            |
                 |            |
                 |        +---v---+
                 |        |       |  chain -> Right(v)
                 |        |       |
                 |        +-------+
                 |        |
                 |        |
             +---v---+----v---+
             |       |        |
     Fold    |       |        |
             |       |        |
             +-------+--------+
```

---

``` js
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
```

---

# Exercises

open ex3.js

---

# Task Monad

---

Most of the JS you will do will involve asynchronous flow. The Task Monad has similar semantics to Either, but it handles async and it is lazy, which means, that the async calls don't actually happen until you call the `fork` function. This can create predictable flow patterns, but you must be aware of mutable state. 

> Using tasks are great, but you have to make sure you are working with immutable state.

---

> fork is a function that takes two unary functions as arguments, a `reject` function and a `resolve` function.

 
```
const Task = fork => 
({
  map: f => Task((reject, resolve) => fork(reject, x => resolve(f(x)))),
  chain: f => Task((reject, resolve) => fork(reject, x => f(x).fork(reject, resolve)))
})

Task.of = v => Task((reject, resolve) => resolve(v))
```

---

# Exercises

open ex4/index.js

---

# Lenses

---

When working with FpJS you will find that you will start with some data and will want to transform that data into a specific format, whether that data is coming from input of a user or form a service. This process of transformation will form a pipeline of checks and logic you want to apply to complete the transformation, from origin to destination. 

`map and chain` give us the tools to reach inside of a monad and modify the value, which is great. Often we want to take the value inside the monad and just work on a specific part that may be nested within the value, but once we have completed that operation, we want to return 
the whole object back to the monad.

Lenses gives us the ability to do this in a functional way.

---

### curry  

We will create our lenses by currying its functions

``` js
const curry = (f, arity = f.length, ...args) => 
  arity <= args.length 
    ? f(...args)
    : (...argz) => curry(f, arity, ...args, ...argz) 

```

---

### Lens

A lens is a function that takes two functions as arguments, a get function and 
a set function. then returns an object with a get key and a set key.

``` js
const lens = curry((get, set) => ({get, set}))
```

---

### prop and assoc

We need a couple of helper functions too.

``` js
const prop = curry((key, obj) => obj[key])
const assoc = curry((key, value, obj) => ({...obj, [key]: value}))
```

---

### view, set and over

view, set and over are three core lens functions that allow you to 
use lenses to work with values from a nested object.

---

``` js
const view = curry((lens, obj) => lens.get(obj))
const set = curry((lens, val, obj) => lens.set(val, obj))
const over = curry((lens, f, obj) => lens.set(f(lens.get(obj)), obj))
```

---

### Creating Lenses

``` js
const lensProp = (key) => lens(prop(key), assoc(key))
const lensIndex = (index) => lens(prop(index), assoc(index))
```

---

# Exercises


