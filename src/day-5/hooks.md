# React Hooks

[[toc]]

## State Hooks

State lets a component "remember" information like user input.

### useState Hook

Declares a state variable that you can update directly.

```jsx
import React, { useState } from "react";

//Assigning dummy data which will be replaced by a fetch later
const data = require("../../dummy-data.json");
const [blog, setBlog] = useState(null);

setBlogs(data);
```

## Effect Hook

Effects let a component connect to and synchronize with external systems.

### useEffect Hook

Connects a component to an external system.

```jsx
import { useState, useEffect } from "react";

export default function BlogPage() {
const [blog, setBlog] = useState(null);
const [isError, setIsError] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [message, setMessage] = useState("");
const { blogId } = useParams();

//Using useEffect to first set a loading state then allowing it to fetch data from the API
useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const blog = await blogService.fetchBlogById(blogId);
        setBlog(blog.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message || error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [blogId]);

```

## Context Hooks

Context lets a component receive information from distant parents without passing it as props.

### useContext Hook

```jsx
import { useState, createContext } from "react";

export const ThemeContext = createContext(null);

const App = () => {
  const [isDarkThemed, setIsDarkThemed] = useState(false);

  return (
    <ThemeContext.Provider value={isDarkThemed}>
      <button onClick={() => setIsDarkThemed((prev) => !prev)}>
        Change Theme
      </button>
      <AboutPage />
    </ThemeContext.Provider>
  );
};

export default App;
```

## Ref Hooks

Refs let a component hold some information that isn't used for rendering.

### useRef Hook

Declares a ref. Can hold any value in it.

```jsx
import { useRef } from "react";
const inputRef = useRef(null);
```

## Performance Hook

A common way to optimize re-rendering performance is to skip unnecessary work.

## useMemo Hook

Lets you cache the result of an expensive calculation.

```jsx
import { useMemo } from "react";
const cachedValue = useMemo(calculatedValue, dependencies);
```

## useCallback Hook

Lets you cache a function definition before passing it down to an optimized component.

```jsx
import { useCallBack } from "react";
const cachedFn = userCallback(fn, dependencies);
```
