# React LifecycleMethods

[[toc]]

## Lifecycle Phases: 
These include the component mounting, updating and unmounting phase.

### Mounting Lifecycle Methods

#### Constructor
```jsx
    constructor(pros) {
        super(props);
        this.state = {
            count: 0
        };
    }
```

#### Render
```jsx
    render() {
        return (
            <div>
                <h1>Hello, iX Students</h1>
            </div>
        );
    }
```

#### ComponentDidMount
This method is used for fetching data from APIs or setting up subscriptions.
```jsx
    componentDidMount() {
        fetch('//api endpoint').then(response => response.json())
            .then(data => {
            this.SetState{{ data }};
        });
    }
```

### Updating Lifecycle Methods


#### ShouldComponentUpdate
This method is called before the component is update. 

```jsx
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.value == nextProps.value) {
            return false 
        }
        return true;
    }
```

#### ComponentDidUpdate
This method is called after the component is updated.
```jsx
    componentDidUpdate(prevProps, prevState) {
        if(this.props.isOpen !== prevProps.isOpen) {
            // Perform actions based on changes in props or state
        }
    }
```

### Unmounting Lifecycle Methods

#### ComponentWillUnmount
This method is called right before the component is removed.
```jsx
    componentWillUnmount() {
        // Clean up resources, such as event listeners or subscriptions, cancel timers, etc
        clearInterval(this.timerId);
        window.removeEvenListener('scroll', this.handleScroll);
    }
```

