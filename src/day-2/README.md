# Javascript Deep Dive

[[toc]]

<!-- ## JavaScript Fundamentals -->

## Variables

Create/Initialize variables in JavaScript

```js
// VAR - old
var firstName1 = "Byron";

// CONST - new - Immutable
const lastName1 = "de Villiers";
lastName = "Smith";
// const lastName; // This will result in an error

// LET - new - Mutable
let age1;
age1 = 42;

console.log(firstName1);
console.log(lastName);
console.log(age);
```

## Data Types

Different data types in JS

```js
// Data types:

console.log("\n \n \n  Data types  \n \n \n");

// Primitives

// String
let firstName = "Byron";
let lastName = "de Villiers";
let address = "11 Zinnia";

// Numbers
let age = 29;
let rating = 4.5;

// Boolean
let isCool = true;
let isVeryCool = false;

// null
address = null;

// undefined
let hairColor;

// Not a primitive:

// Object
let person1 = {
  firstNameKey: "firstNameValue",
  lastNameKey: "lastNameValue",
  ageKey: "ageValue",
};

// Array
let arrayNumber1 = [1, 2, 3, "a", "b", "c"];
```

Concatenating Strings:

```js
// String concatenation
console.log("My name is " + firstName + " and I am " + age + " years old");

// String interpolation
console.log(`My name is ${firstName} and I am ${age} years old`);
```

### Working with strings

```js
let s = `My name is ${firstName}`;

// string properties
console.log(s.length);

// string methods
console.log(s.toLocaleUpperCase());

s = s.toLocaleUpperCase();

s.indexOf("Y", 2);

s.substring(0, 7);

s1 = s[0];

s2 = s[8];

console.log(s1, s2);
```

### Working with arrays

```js
// Initializing an array - old
let nums1 = new Array(1, 2, 3, 4, 5, 6);
console.log(nums1);

// Initializing an array - new
let alphaNumeric = [1, 2, 3, 4, 5, "a", "b"];
console.log(alphaNumeric);

let fruits = ["orange", "pear", "apple"];

console.log(fruits);

// get element in array (remember it's zero indexed):
console.log(fruits[2]);

// array properties
console.log(fruits.length);

// array methods
fruits.push("strawberries");
console.log(fruits);
fruits.unshift("grape");
console.log(fruits);
const lastFruit = fruits.pop();
console.log(lastFruit, fruits);
const index = fruits.indexOf("orange");
console.log(index, fruits);
```
### Working with objects

```js
let person = {
  // Object properties:
  firstName: "John",
  lastName: "Doe",
  age: 29,
  hobbies: ["golf", "surfing", "sport", "music"],
  address: {
    street: "Zinnia",
    city: "Potchefstroom",
    province: "North West",
  },
  // Object methods:
  getFullName: () => {
    return person.firstName + " " + person.lastName;
  },
  getAddress: () => {
    return (
      person.address.street +
      " " +
      person.address.city +
      " " +
      person.address.province
    );
  },
};

console.log(person);

// Calling object methods
console.log(person.getFullName());
console.log(person.getAddress());

// Adding properties:
person.email = "byron@mail.com";
person["email"] = "byron@mail.com";
console.log(person);
```

## Loops

```js
// For loop example

console.log("starting for loop");

for (let i = 0; i <= 10; i = i + 1) {
  console.log(i);
  console.log("execute this line if code in the for loop");
  // i = i + 1
}

console.log("for loop finished");

// While loop example
let i = 0;
while (i <= 10) {
  console.log(i);
  console.log("execute this line if code in the while loop");
  i++;
}

// Extra Example
const todos = [
  {
    id: 1,
    title: "take out the trash",
    completed: true,
  },
  {
    id: 2,
    title: "feed the dogs",
    completed: false,
  },
  {
    id: 3,
    title: "go to the bank",
    completed: true,
  },
];

for (let i = 0; i < todos.length; i++) {
  const todo = todos[i];
  const doneText = todo.completed ? "" : "not";
  console.log(`${todo.title} task is ${doneText} completed`);
}

console.log("\n \n \n");

for (let todo of todos) {
  const doneText = todo.completed ? "" : "not";
  console.log(`${todo.title} task is ${doneText} completed`);
}

console.log("\n \n \n");

todos.forEach((todo) => {
  const doneText = todo.completed ? "" : "not";
  console.log(`${todo.title} task is ${doneText} completed`);
});
```

## Conditional Statements

```js
const num = 10;

// If statement:
if (num == 10) {
  console.log("num = 10");
} else if (num > 5) {
  console.log("num > 5");
} else {
  console.log("num < 5");
}

// Switch statement:
switch (num) {
  case 10:
    console.log("num = 10");
  case 5:
    console.log("num = 5");
  default:
    console.log("num not 5 or 10");
}

// ternary operator:
const lessThanFive = num < 5 ? true : false;
console.log(lessThanFive);
```

## Functions

### Functions

```js
// function definition:
function addTwoNumbers(num1, num2) {
  return num1 + num2;
}

// calling/executing the function
const result = addTwoNumbers(5, 4);

//logging result:
console.log(result);
```

### Higher order array functions

```js
const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// filter by even values:
const filteredArray = array1.filter((x) => {
  return x % 2 == 0;
});

console.log(array1);
console.log(filteredArray);

const array2 = [10, 2, 5, 4, 8, 6];
// sort smallest to largest
const sortedArray = array2.sort((a, b) => {
  return a - b;
});

console.log(array2);
console.log(sortedArray);
```

### Function Example

Wite a function which logs today's Date with the console

```js
// function definition:
function logDate() {
  console.log(new Date());
}

// call/executing the function:
logDate();
```

### Function Example

Wite a function which takes in a number as it's only parameter and returns whether or not the number is a perfect square

```js
// Function definition
function isPerfectSquare(x) {
  const sqrRoot = Math.sqrt(x);
  return sqrRoot * sqrRoot == x;
}

// Calling/executing the function:
const resPrfSqr = isPerfectSquare(16);

// Logging result:
console.log(resPrfSqr);
```

### Function Example

Wite a function which takes in an array of todo tasks as it's only parameter and returns whether or not all tasks are completed

```js
function areTasksDone(todos) {
  for (let todo of todos) {
    if (!todo.completed) {
      return false;
    }
  }

  return true;
}
let todos = [
    {
        id: 1,
        title: "Learn HTML, CSS and JS",
        completed: false
    },{
        id: 2,
        title: "Write code",
        completed: false
    },{
        id: 3,
        title: "Get a SDE job",
        completed: false
    }]
console.log(areTasksDone(todos));
todos[1].completed = true;
console.log(areTasksDone(todos));
```

