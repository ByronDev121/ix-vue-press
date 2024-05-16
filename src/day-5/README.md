# React Hooks

[[toc]]

## State Hooks

State lets a component "remember" information like user input.

### useState Hook

Declares a state variable that you can update directly.

#### Syntax

```jsx
const ["Variable Name / State Name", "Function Name"] = useState("Default Value");
```

#### Example

```jsx
import React, { useState } from "react";

//Assigning dummy data which will be replaced by a fetch later
const data = require("../../dummy-data.json");
const [blog, setBlog] = useState(null);

setBlog(data);
```

## Effect Hook

Effects let a component connect to and synchronize with external systems.

### useEffect Hook

Synchronizes a component to an external system.

#### Syntax

```jsx
useEffect(() => {
    //Establishing a connection, fetching data, etc...
  	console.log("Setup Code"); 
  	return () => {
      // Disconnecting from the system
      console.log("Cleanup Code");
  	};
  }, ["Dependencies"]);
```

#### Example with Empty Array
Subscribing to the browser window size.
```jsx
import React, { useState, useEffect } from 'react';

function ResponsiveComponent() {
    // State to store the current window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width to the state
            setWindowWidth(window.innerWidth);
        }
        // Subscribe to window resize event
        window.addEventListener('resize', handleResize);
        // Cleanup subscription on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Effect runs only on mount and unmount
    return (
        <div>
            <h1>Responsive Component</h1>
            <p>The current window width is: {windowWidth}px</p>
        </div>
    );
}

export default ResponsiveComponent;
```

#### Example with Defined Dependency Array
Fetching dummy data from a blog service. 

*BlogsPage Component*
```jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import "../../App.css";
import "./index.css";

const data = require("../../dummy-data.json");
let blogPosts = data.blogPosts;
const categories = data.categories;

export default function BlogsPage() {
  const { categoryId: categoryIdParam } = useParams();
  const [categoryId, setCategoryId] = useState(categoryIdParam || undefined);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    // Filtering blogPosts based on the categoryId.
    const blogs = blogPosts.filter((x) =>
      categoryId !== undefined
        ? x.categories.find((y) => y.id.toString() === categoryId.toString())
        : true
    );
    setBlogs(() => blogs);
  }, [categoryId]);
  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          {categories.map((category, index) => {
            return categoryId === category.id.toString() ? (
              <button
                key={index}
                onClick={() => setCategoryId(category.id)}
                style={{ color: "blue" }}
              >
                <p key={index}>{category.title}</p>
              </button>
            ) : (
              <button
                key={index}
                onClick={() => setCategoryId(category.id)}
                style={{ color: "black" }}
              >
                <p key={index}>{category.title}</p>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Blog Posts</p>
        </div>
        <BlogList setBlog={() => {console.log("TODO: navigate to blog")}} blogPosts={blogs} />
      </div>
      <Footer />
    </>
  );
}
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