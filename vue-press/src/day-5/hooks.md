# React Hooks

[[toc]]

## State Hooks
State lets a component "remember" information like user input.

### useState Hook
Declares a state variable that you can update directly.

```jsx 
import { useState } from "react";
    const [index, setIndex] = useState(0);
```
### useReducer Hook
Declares a state variable with the update logic inside a reducer function.

```jsx
import { userReducer } from "react";
    const [state, dispatch] = userReducer(reducer, intialArg, init?);
```

## Context Hooks 
Context lets a component receive information from distant parents without passing it as props.

### useContext Hook
```jsx
import { userContext } from "react";
    const theme = userContext(ThemeContext);
```

## Ref Hooks 
REfs let a component hold some information that isn't used for rendering.

### useRef Hook
Declares a ref. Can hold any value in it.
```jsx
import { useRef } from "react";
    const inputRef = useRef(null);
```

## Effect Hook
Effects let a component connect to and synchronize with external systems.

### useEffect Hook
Connects a component to an external system.
```jsx
import { useEffect } from "react";
    function ChatRoom({ roomId }
        userEffect(() => {
            const connection = createConnection(roomId);
            connection.connect();
            return() => connection.discount();
        }, [roomId]);
```

## Performance Hook
A common way to optimize re-rendering performance is to skip unnecessary work.

## useMemo Hook
Lets you cache the result of an expensive calculation.
```jsx
import { useMemo } from "react";
    const cachedValue = useMemo(calculatedValue, dependencies)
```
## useCallback Hook
Lets you cache a function definition before passing it down to an optimized component.
```jsx
import { useCallBack } from "react";
    const cachedFn = userCallback(fn, dependencies);
```

## Resource Hooks
Resources can be assessed by a component without having them as part of their state.

### use Hook
Lets you read the value of a resource like a *Promise* or *context*.
```jsx
import { use } from "react";
    const value = use(resource);
```