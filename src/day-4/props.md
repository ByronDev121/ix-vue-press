# Understanding Props

[[toc]]

## Passing Props Between Components
Passing props between components is similar to attributes with HTML

### Syntax
```jsx
function funcName(prop) {
    return 
        <div> 
            {prop}
        </div>
}
```

### Syntax - Extra

```jsx
function CategoryList(category)
function CategoryList({ title, description, color })
```

## Installing PropTypes
npm installation:
```bash
npm install prop-types --save
```
Imports to use PropTypes:
```jsx 
import PropTypes from 'prop-types';
```

## PropTypes Syntax

```jsx
BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blogPost: PropTypes.object.isRequired,
  setBlog: PropTypes.func,
  imageOrientation: PropTypes.string,
};
```

## Implementation

Component - *BlogItemText *   
Imports:
```jsx 
import React from "react";
import PropTypes from "prop-types";

import "./index.css";
```
Component:
```jsx
export default function BlogItemText({ blogPost, headerFontSize }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <p className="date-author-text">
          {blogPost.author.firstName} {blogPost.author.lastName}
        </p>
        <div className="dot-divider"></div>
        <p className="date-author-text">
          {blogPost.createdAt.substring(0, 10)}
        </p>
      </div>
      <p
        style={{
          fontSize: headerFontSize,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        {blogPost.title}
      </p>
      <p style={{ fontSize: "16px", color: "#667085", textAlign: "left" }}>
        {blogPost.description.substring(0, 100)}...
      </p>
    </div>
  );
}
```
PropTypes:
```jsx
BlogItemText.propTypes = {
  blogPost: PropTypes.object.isRequired,
  headerFontSize: PropTypes.string,
};
```


