# Asynchronism

[[toc]]

## Callback
A callback function is a function passed into another function as an argument.

### Callback Example

```jsx
createBlog({},
    (res)=>{
        setBlogs(res);
    }
);

const createBlog = async (blog, cb) => {
    fetch("http://localhost:8000/api/blogs", {
        method: "POST",
        headers: {
            Authorization: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
        },
        body: blog
    }).then(res => {
        cb(res);
    })
}
```

## Promises
Object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Creation

```jsx
const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation 
    if (/* Operation Successful */) {
        resolve("Success");  
    } else {
        reject("Failure");
    }
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
createBlog({}).then((res) => {
    console.log(res);
}).catch(err => {
    console.log(err);
});

const createBlog = async (blog) => {

    return new Promise((resolve, reject) => {

        fetch("http://localhost:8000/api/blogs", {
            method: "POST",
            headers: {
                Authorization: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
            },
            body: blog
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}
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