# React JS

[[toc]]

## Getting started

### Install NodeJS

Download and install [nodeJS](https://nodejs.org/en/download)

### Create react app

Run the following command to init a basic [react app](https://github.com/facebook/create-react-app)

```bash
npx create-react-app [my-app]
cd my-app
npm start
```

### Install react dev tool

Install chrome extension for [react dev tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## Introduction to ReactJS

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
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

#### Syntax

You can also use the self-closing form of the tag if there are no children. So:
```jsx
<div className="sidebar" />
```

compiles into:
```jsx
React.createElement(
  'div',
  {className: 'sidebar'}
)
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

A fragment looks like an empty HTML tag: ```<></>```.
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

Capitalized types indicate that the JSX tag is referring to a React component. These tags get compiled into a direct reference to the named variable, so if you use the JSX ```<Foo />``` expression, ```Foo``` must be in scope. Since JSX compiles into calls to React.createElement, the React library must also always be in scope from your JSX code.


```jsx
import React from 'react';
import CustomButton from './CustomButton';

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
  )
};
```

Example of class component

```jsx
export default class Header extends React.Component {
  render(){
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}
```
