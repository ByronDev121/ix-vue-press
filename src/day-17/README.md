# Jest

[[toc]]

## Installation

### Global Installation

```bash
npm install -g jest
```

### Project Installation

```bash
npm install --save-dev jest
```

### ReactJS Project Installation

```bash
npm install --save-dev react-test-renderer
```

### Utilization
Inside *package.json*
```jsx
"scripts": {
    "test": "jest"
}
```

## Creating Test
Example for testing a function on the *index.js* page
### *index.js*
```jsx
// index.js
function isPalindrome(string) {
    let left = 0;
    let right = string.length - 1;

    while (left < right) {
        if (string[left] === string[right]) {
            left += 1;
            right -+ 1;
        }
        else return false;
    }
    return true;
}
```

### *index.test.js*
```jsx 
// index.test.js
isPalindrome = require('./index,js');

test('kayak is palindrome', () => {
    expect(isPalindrome('kayak')).toBe(true);
})

test('lesson is not palindrome', () => {
    expect(isPalindrome('lesson')).toBe(false);
})
```

## Test Results
Running *npm test* 
```bash
# console logs
> jest PASS 
./index.test.js
✓ kayak is palindrome (1 ms)
✓ lesson is not palindrome

Test Suites: 1 passed, 1
total Tests:       2 passed, 2
total Snapshots:   0
total Time:        0.252 s
Ran all test suites.
```

## Mock Functions 
Allows you to test the links between code.
### Syntax 
```jsx
jest.fn()
```

### Example
#### forEach.js
```jsx
// forEach.js
export function forEach(items, callback) {
    for (const item of items) {
        callback(item);
    }
}
```
#### forEach.test.js
```jsx 
// forEach.test.js
const forEach = require ('./forEach');
const mockFn = jest.fn(x => 42 + x);

test('forEach mock function', () => {
    forEach([0, 1], mockFn);
    //Expect mock function to be called twice
    expect(mockFn.mock.calls).toHaveLength(2);
})
```
## Matchers
Used to compare the output of our test with a value we expect the function to return.

```jsx
// Compare primitive values
.toBe()

// Compare recursively all properties of object instances
.toEqual()

// Compare the truthiness of result (Doesn't care what the value is)
// All values are truthy unless defined as falsy below
.toBeTruthy() //Ensure the value is true
// Falsy = false, 0, '', null, undefined, NaN
.toBeFalsy() //Ensure the value is false

// Compare mathematical operations
.ToBeGreaterThan()
.ToBeLessThanOrEqual()
.ToBeGreaterThanOrEqual()

// Compare string to match a regular expression
.toMatch()
```

## Setup and Teardown
Hooks for setup and cleanup procedures.

```jsx
// Runs before and after each test in a suite
beforeEach(() => {});
afterEach(() => {});
// Performed once per test suite
beforeAll(() => {});
afterAll(() => {});
```

### Scoping 
Using the *describe()* block, allows for a cleaner report by creating groups. 
```jsx 
// index.test.js

isPalindrome = require('./index,js');

describe('isPalindrome function', () => {
    test('kayak is palindrome', () => {
     expect(isPalindrome('kayak')).toBe(true);
    });

    test('lesson is not palindrome', () => {
        expect(isPalindrome('lesson')).toBe(false);
    });
});
```

#### Scoping Report
```bash
# console logs
> jest
PASS  ./index.test.js
  isPalindrome function
    ✓ kayak is palindrome (1 ms)
    ✓ lesson is not palindrome
  
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.221 s
Ran all test suites.
```


## Snapshot Testing
Tool to test that the UI does not change unexpectedly.

### Test
```jsx
import renderer from 'react-test-renderer';
import Link from '../Link';

test('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.jestjs.io">Jest</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```
### Generated Snapshot
On test run, the snapshot file *.snap* will be generated

```jsx
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.jestjs.io"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Jest 
</a>
`;
```
