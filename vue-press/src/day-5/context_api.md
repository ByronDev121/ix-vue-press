# Context API

[[toc]]

Provides a way to share states between components without passing props manually

## Process

Context API relies on utilizing createContext, a Provider and useContext hook

### Creating Context Object:
Created in its own context file
```jsx
import { createContext} from 'react';

export const MyContext = createContext();

```

## Provider: 
The Provider accepts a prop that holds shared data, any child component of the Provider can access the shared data
```jsx
import { useState, React } from "react";
import { myContext } from "./MyContext";
import MyContext from "./MyContext";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <MyContext.Provider value={{ count, setCount }}>
                <MyComponent />
            </MyContext.Provider>
        </div>
    );
}
```

## Consume the Context
We consume the context with the use of the *userContext* hook
```jsx
import { useContext } from "react";
import { MyContext } from "./MyContext";

function MyComponent() {
     const { count, setCount } = useContext(MyContext);;

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            </button>
        </div>
    );
}
```