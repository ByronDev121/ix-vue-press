# State Management

[[toc]]

## Introduction

### State Syntax

```jsx
const ['state Name', 'set state function'] = userState('Default Value');
```
## State Implementation

### Initializing State
```jsx 
import { useState } from 'react';
const [blog, setBlog] = useState(null);
```

### Updating State 
For class components
```jsx
import { useState } from 'react';
const [blog, setBlog] = useState(null);
this.setBlog({});
```
For functional component
```jsx
setBlog({});
```

## ReactJS Built-in State Management  
### Hooks
Hooks let you use state and other React features without writing a class

#### *useState*
Allows states to be managed within components.
```jsx 
import { useState } from 'react';

const [blog, setBlog] = useState({
    image: "",
    title: "",
    description: "",
  });

<button
  style={{ margin: "16px" }}
  type="button"
  className="btn btn-outline-secondary"
  data-bs-toggle="modal"
  data-bs-target="#addBlogModal"
  onClick={() => {
    setBlog({
      image: "",
      title: "",
      description: "",
    });
  }}
>
Add Blog Post
</button>
```

#### *userReducer*
Allows state to be managed by dispatching actions and then responding to them in the reducer function.
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
       <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
       <button onClick={() => dispatch({ type: 'decrement'})}>Decrement</button>
       <button onClick={() => dispatch({ type: 'reset'})}>Reset</button>
    </div>
  );
};
```

