# Asynchronism

[[toc]]

## Callback
A callback function is a function passed into another function as an argument.

### Simple Example

```jsx
function getStudent(studentId, callback) {
    setTimeout(() => {
        const student = { id: studentId, name: 'John Doe' };
        callback(student);
    }, 1000);
}

function displayStudent(student) {
    console.log(student.name);
}

getUser(1, displayUser);
```

### Utilizing Callback

#### Before
```jsx
function calculate(action, x, y) {
    if (action === "add") {
        return x + y;
    } else if (action === "divide") {
        return x/y;
    }
}

console.log(calculate("add", 10, 5));
console.log(calculate("divide", 10, 5));
```

#### After
```jsx
function add(x, y) {
    return x + y;
}

function divide(x, y) {
    return x/y;
}

function calculate(callback, x, y) {
    return callback(x, y);
}

console.log(calculate(add, 10, 5));
console.log(calculate(divide, 10, 5));
```

## Promises
Object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Creation

```jsx
const myPromise = new Promise((resolve, reject) => {
    //Asynchronous operation
});
```

### Handling Results
A method to attach callbacks to the Promise to be called when their status is changed.

#### .then()
Handles when Promise is fulfilled.
```jsx
myPromise.then((value) => {console.log('Promise fulfilled with value: ', value); });
```

#### .catch()
Handles when Promise is rejected.
```jsx
myPromise.catch((reason) => {console.log('Promise rejected with reason: ', reason); });
```

#### .finally()
Handles when Promise is settled, regardless of the outcome.
```jsx
myPromise.finally(() => {console.log('Promise settled'); });
```

### Chaining Promises
Promises can be chained with the *.then()* method. 
With error handling.

```jsx
const myPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    );

myPromise
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data[0].name);
    })
    .catch((error) => {
        console.error(`Could not get products: ${error}`);
    });
```

## Async/Await

### Syntax
Either using the function keyword or arrow function.

#### Function
```jsx
async function myFunction() {
    //Code block
}
```

#### Arrow Function
```jsx
const myFunction = async () => {
    //Code block 
}
```

### Example

```jsx
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log('Fetched data: ', data);
    } catch (error) {
        console.log('Error fetching data', error);
    }
 }
```

### Error Handling

#### try...catch()
```jsx
async function myFunction() {
    try { 
        //Code block
    } catch(error) {
        console.log(error);
    }
}
```

#### then...catch()
```jsx
myPromise
    .then((response) => {
        throw new Error(`Error`);
    )}
    .catch((error) => {
        console.error(${error});
    });
```