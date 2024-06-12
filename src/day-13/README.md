# Data Structures and Algorithms
Arrays, Hash maps, Linked lists, stacks, queues, trees
[[toc]]

## Data Structures
Structures of how data can be stored.

### Arrays
A collection of items stored at a contiguous memory locations

```jsx
const testArray = [0, 1, 1, 2, 3, 5, 8, 13]

// Multidimensional array (array of arrays).
const multiArray = [
    [0, 1, 1],
    [2, 3, 5],
    [8, 13, 21],
]
```

## Algorithms
Techniques to solve different problems.

### Recursion
Function calling on itself
```jsx
function getFactorial(num) {
    if (num === 0) {
        return 1;
    }
    let factorial = num * getFactorial(num - 1)
    return factorial;
}
```

### Dynamic Programming
Improvement over recursion by storing previous subproblem results.
#### Memoization Example
Top-down approach
```jsx
const cache = new Map();
function fib(n) {
    if (cache.has(n)) {
        return cache.get(n);
    }
    
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
      let result = fib(n - 1) + fib(n - 2);
      cache.set(n, result);
      return result;
    }
}
```
#### Tabulation Example
Bottom-up approach
```jsx
function  fib(n) {
    if (n === 0 ) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        let table = new Array(n+2); 
        table[0] = 0;
        table[1] = 1;

        for (let i = 2; i <= n; i++)
        {
            table[i] = table[i-1] + table[i-2];
        }
        return table[n];
    }
}
```



## Class Examples 

### Palindrome 
A word, phrase, or sequence that reads the same backwards as forwards

#### Time O(n) & Space O(n)
```jsx
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[_\W]/g,'');
  for (let i = 0, j = s.length - 1; i <= j; i++, j--) {
    if (s[i] !== s[j]) {
        return false;
  }
  return true;
}
```

#### Time O(n) & Space O(1)
```jsx
function isAlphanumeric(char) {
    const code = char.charCodeAt(0);
    return (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
}

function isPalindrome(s) {
    s = s.toLowerCase();
    let i = 0, j = s.length - 1;

    while (i < j) {
        while (i < j && !isAlphanumeric(s[i])) {
          i++;
        }

        while (i < j && !isAlphanumeric(s[j])) {
          j--;
        }

        if (s[i] !== s[j]) {
          return false;
        }

        i++;
        j--;
    }
      
    return true;
}
```


### Anagram
*Nag a Ram*. A word or phrase made by transposing the letters of another work or phrase.

#### Time O(n) & Space O(n)
```jsx
function isAnagram(s, t)
{
    let counter1 = new Array(256).fill(0);
    let counter2 = new Array(256).fill(0);
    
    for (let i = 0; i < s.length && 
         i < t.length; i++) 
    {
        counter1[s[i].charCodeAt(0)]++;
        counter2[t[i].charCodeAt(0)]++;
    }
  
    if (s.length != t.length)
        return false;
  
    for (i = 0; i < 256; i++)
    if (counter1[i] != counter2[i])
        return false;
  
    return true;
}
```

#### Time O(n) & Space O(1)
```jsx
function isAnagram(s, t) {
    if(s.length != t.length) {
        return false;
    }
    
    let alphabetDif = new Array(26).fill(0);

    for(let i = 0; i < s.length; i++) {
        alphabetDif[s.charAt(i).charCodeAt(0) - 'a'.charCodeAt(0)]++;
        alphabetDif[t.charAt(i).charCodeAt(0) - 'a'.charCodeAt(0)]--;
    }
    
    return alphabetDif.every(index => index === 0);
};
```