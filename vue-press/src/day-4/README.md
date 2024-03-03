# State Management

[[toc]]

## Introduction

### State

```jsx
setState();
userState();
```
## State Implementation

### Initializing State
```jsx 
import { useState } from 'react';
const [count, setCount] = useState(0);
```

### Updating State 
For class components
```jsx
this.setState({ count: this.state.count +1 });
```
For functional component
```jsx
setCount(count + 1);
```

## ReactJS Built-in State Management  
### Hooks
#### *useState*
Hooks let you use state and other React features without writing a class
```jsx 
import { useState } from 'react';

const Count = () => {
    const [count, setCount] = useState(0);

    return ( 
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        <div>
    );
};
```

#### *userReducer*
```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 }
 // The reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return {count: state.count = 0}
    default:
     return { count: state.count  }
  }
}

```
Use the *dispatch* function with an action object when updating state
```jsx 
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      Count: {state.count}
       <br />
       <br/>
       <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
       <button onClick={() => dispatch({ type: 'decrement'})}>Decrement</button>
       <button onClick={() => dispatch({ type: 'reset'})}>Reset</button>
    </div>
  );
};
```

