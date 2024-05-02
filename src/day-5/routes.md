# Routes

[[toc]]

## Installation
### npm Instructions
```bash
npm install react-router-dom
```

### Importing/Utilizing React Router
From your index.js:
```jsx
import { BrowserRouter } from "react-router-dom";
```


## Utilizing
### Creating Components to Route Too

```jsx
function Home() {
    return (
        <div>
            <h1>iXperience - Software Engineering 2024</h1>
        </div>
    );
}
```

```jsx
function Capstone() {
    return (
        <div>
            <h1>Capstone Project</h1>
        <div>
    );
}
```

```jsx
function DayOne() {
    return (
        <div>
            <h1>HTML & CSS</h1>
        <div>
    );
}
```

### Defining Routes
App is our root component, we define the route paths.

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Capstone from "./Capstone";
import DayOne from "./DayOne";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/capstone" element={ <Capstone/> } />
                <Route path="/day-one" element={ <DayOne/> } />
            </Routes>
        </div>
    );
}
```

### Link Feature
To be able to navigate inside a page we use the React Router Link component.
Important, must remember the import.

```jsx 
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>iXperience - Software Engineering 2024</h1>
            <Link to="capstone">Go to CapStone Project</Link>
            <Link to="day-one">Go to Day 1</Link>
        </div>
    );
}
```