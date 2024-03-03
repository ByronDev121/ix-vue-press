# Understanding Props

[[toc]]

## Passing Props Between Components
Passing props between components is similar to attributes with HTML

### Syntax
#### HTML syntax
```html
<input type="text" placeholder="Hello" />
```

#### Props Syntax
```jsx
<ComponentName property1="value" property2="value" property3="value" />
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
Student.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  attendance: PropTypes.bool,
};
```

## Implementation

React *App.js*  
```jsx 
import Student from './Student'

const App = () {
    return (
        <div className='container'>
            <Student name='John' />
        </div>
    )
}
```
*Student.js*
```jsx
import PropTypes from 'proper-types'

const Student = ({ name }) {
    return ( 
        <header>
            <h1>{name}</h1>
        </header>
    )
}
//Utilizing PropTypes
Student.propTypes = {
    name: PropTypes.string,
}
```


