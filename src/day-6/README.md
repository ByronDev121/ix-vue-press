# Event Loop
The orchestrator that ties the Call Stack, Callback Queue, and Web APIs together.
[[toc]]

## Visualized Example
### Example 1
```js
function printHi(){
    console.log('Hi');
}
function printThere (){
    setTimeout(()=>{
        console.log('there');
    }, 500)
}
function printIX(){
    console.log('iXperience 2024')
}
printHi()
printThere()
printIX() 
```

### Example 2
```js
function printHi(){
    console.log('Hi');
}
function printThere (){
    setTimeout(()=>{
        console.log('there');
    }, 0)
}
function printIX(){
    console.log('iXperience 2024')
}
printHi()
printThere()
printIX()
```