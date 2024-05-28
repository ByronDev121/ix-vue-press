# Asynchronism

[[toc]]

## Callback
A callback function is a function passed into another function as an argument.

### Callback Example

```jsx
fetchBlogs(
    (res)=>{
        setBlogs(res);
    }
);

const fetchBlogs = async (cb) => {
    fetch("http://localhost:8000/api/blogs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        cb(res);
    })
}
```

## Promises
Object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Creation

```jsx
const asyncFunction = () =>{
   return new Promise((resolve, reject)=>{
       if([successful condition]){
           resolve()
       } else{
           reject()
       }
   })
}
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
myPromise.catch((error) => {console.log('Promise rejected with reason: ', error.message); });
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
fetchBlogs().then((res) => {
    console.log(res);
}).catch(err => {
    console.log(err);
});

const fetchBlogs = async () => {
    fetch("http://localhost:8000/api/blogs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        resolve(res);
    }).catch(err => {
        reject(err);
    });
}
```

## Async/Await

### Syntax
Either using the function keyword or arrow function.

#### Function
```jsx
async function myFunction() {
    const response = await fetch(/* ENDPOINT */);
    const responseData = await response.json();
    return responseData;
}
```

#### Arrow Function
```jsx
const myFunction = async () => {
    const response = await fetch(/* ENDPOINT */);
    const responseData = await response.json();
    return responseData;
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
const myFunction = async () => {
    try { 
        //Attempt code block
        const response = await fetch("ENDPOINT");
        const responseData = await response.json();
        return responseData;
    } catch(error) {
        // On failure
        console.log(error.message);
    }
}
```

#### then...catch()
```jsx
myPromise
    .then((response) => {
        // On Success
        setData(response); //Utilizing the response
    })
    .catch((error) => {
        // On Failure
        throw new Error(error.message); //Throwing an error
        setErrorMessage(error.message) //Or setting an error message
    });
```