# Integrating States and Props

[[toc]]

## State Management With Props

### Passing State between components utilizing Props

#### Parent Component
```jsx
//Using props for state management between components
import { useState } from 'react';
import ChildComponent from "./ChildComponent";
//Parent Component with Child Component embedded
const ParentComponent = () => {
    const [user, setUser] = useState("Byron");

    return (
        <div>
            <h1>Parent Component</h1>
            <ChildComponent user={user} />
        </div>
    );
};
```

#### Child Component
```jsx
//Child Component with passed in props argument
const ChildComponent = (props) => {

    return (
        <div>
            <h2>Child Component</h2>
            <p>User from parent: {props.user}</p>
        <div>
    );
};
```

#### Extra
Props can also be written differently
```jsx
const ChildComponent = (props) => {}; 
const childComponent = ({ user }) => {}; 
```
### Props and Updating State
Above the example shows how to pass a state with props from one component to another.
However you can also make a component update the state that is passed to it.
#### Parent Component
Having the parent pass the function to the child component
```jsx
import { useState } from 'react';
import ChildComponent from "./ChildComponent";
//Parent Component
const ParentComponent = () => {
    const [user, setUser] = useState("Byron");

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <div>
            <h1>Parent Component</h1>
            <ChildComponent user={user} updateUser={updateUser} />
        </div>
    );
};
```

#### Child Component
Having the child change the state in the parent with an input using an *onChange* event
```jsx
const ChildComponent = (props) => {
    const handleChange = (event) => {
        props.updateUser({value: event.target.value});
    };

    return (
        <div>
            <h2>Child Component</h2>
            <p>User from parent: {props.user}</p>
            <input type="text" value={props.user} onChanged={handleChange}/>
        <div>
    );
};
```