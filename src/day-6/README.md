# Event Loop
The orchestrator that ties the Call Stack, Callback Queue, and Web APIs together.
[[toc]]

## Visualized Example

```js
console.log('Started');

$.on('button', 'click', function onClick() {
    console.log('Clicked');
});

setTimeout(function onTimeout() {
    console.log("Timeout Finished");
}, 5000);

console.log("Done");
```