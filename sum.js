console.log("hello")
// console.log(window)
// console.log(document)

// console.log(global)

const double = (a, b) => a + b;
console.log(double(5, 10))

// console.log(process.argv[3])

const multiple = (num) => num * 2

const [, , n] = process.argv;

console.log(multiple(n))



const add = (n1, n2) => n1 + n2

const [, , n1, n2] = process.argv;
console.log(add(+n1, +n2))