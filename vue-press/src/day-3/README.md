# React JS

[[toc]]

## Getting started

### Install NodeJS

Download and install [nodeJS](https://nodejs.org/en/download)

### Create react app

Run the following command to init a basic [react app](https://github.com/facebook/create-react-app)

```bash
npx create-react-app [my-app]
```

### Run react app on local dev server

Run the following command to init a basic [react app](https://github.com/facebook/create-react-app)

```bash
cd [my-app]
npm start
```

### Install react dev tool

Install chrome extension for [react dev tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

### Install Bootstrap

Stop local server and run the following CLI command. (to confirm check `node_modules/bootstrap/dist/css/bootstrap.min.css`
)

```bash
npm install bootstrap
```

Import `bootstrap/dist/css/bootstrap.min.css` into `App.js`

App.js

```js
import "bootstrap/dist/css/bootstrap.min.css";
```

Install chrome extension for [react dev tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## Introduction to ReactJS

### Anatomy of React App

![React App File Structure](/react-file-structure.png)

#### node_modules

This is where all the external libraries that we use are.
When you install a new library using npm install (or npx) then it will put it there.

#### public

This is the entry-point (index.html). This is the single page that is rendered in our SPA.
One element in the body:

```html
<div id="”root”"></div>
```

#### src/

This is our code :)

`src/index.js` is the entry point for React. Here `ReactDOM` is imported and the ReactDOM.createRoot method is executed passing in the `<div id="root"></div>` DOM element in index.html. This instantiates an instance of the ReactDOM root. The root.render method is the executed which passes in App.js, which is where we will write our app code to update the root element using React.

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### package.json

Manifest file of any Node.js project and contains the metadata of the project.
Defines project name, version, scripts, author, etc.
Most importantly defines all dependencies and dev-dependencies for node project.

```json
{
  "name": "ix-blog-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

`Package-lock.json` is automatically generated for any operations where npm modifies either the `node_modules tree`, or `package.json`. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

#### README.md

A README is a text (markdown) file that introduces and explains a project. It contains information that is commonly required to understand what the project is about.

### JSX

Fundamentally, JSX just provides syntactic sugar for the React.createElement(component, props, ...children) function.

The JSX code:

```jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

compiles into:

```jsx
React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click Me");
```

#### Syntax

You can also use the self-closing form of the tag if there are no children. So:

```jsx
<div className="sidebar" />
```

compiles into:

```jsx
React.createElement("div", { className: "sidebar" });
```

#### One Top Level Element

The HTML code must be wrapped in ONE top level element. So if you like to write two paragraphs, you must put them inside a parent element, like a div element.

```jsx
const myElement = (
  <div>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </div>
);
```

Alternatively, you can use a "fragment" to wrap multiple lines. This will prevent unnecessarily adding extra nodes to the DOM.

A fragment looks like an empty HTML tag: `<></>`.

```jsx
const myElement = (
  <>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </>
);
```

#### Attribute class = className

The class attribute is a much used attribute in HTML, but since JSX is rendered as JavaScript, and the class keyword is a reserved word in JavaScript, you are not allowed to use it in JSX. JSX solved this by using className instead. When JSX is rendered, it translates className attributes into class attributes.

```jsx
const myElement = <h1 className="myclass">Hello World</h1>;
```

#### Scope

Capitalized types indicate that the JSX tag is referring to a React component. These tags get compiled into a direct reference to the named variable, so if you use the JSX `<Foo />` expression, `Foo` must be in scope. Since JSX compiles into calls to React.createElement, the React library must also always be in scope from your JSX code.

```jsx
import React from "react";
import CustomButton from "./CustomButton";

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

#### Props in JSX

You can pass any JavaScript expression as a prop, by surrounding it with {}. For example, in this JSX:

```jsx
<MyComponent foo={1 + 2 + 3 + 4} />
```

## React Components

### Functions vs. Classes

Example of function component

```jsx
export const Header = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};
```

Example of class component

```jsx
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}
```

### HomePage Component

We can create a HomePage component and add styling to it using bootstrap then render that component in the main App component.

```jsx
const HomePage = () => {
  return (
    <div>
      <h1 className="m-5">My Blog App</h1>
      <p style={{ fontSize: "18px" }}>
        Welcome to my blog! I'm excited to share my thoughts with the world.
      </p>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        className="m-5 p-5"
      >
        <div className="card m-5" style={{ width: "18rem" }}>
          <img src={logo} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Read
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}
```
