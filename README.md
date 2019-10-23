# Javascript Library of useful utilites

# Example

```javascript

 function perfTest(name, method) {
    console.time(`Method - ${name}`);
    method.apply();
    console.timeEnd(`Method - ${name}`);
  }
  
  function square() {
    for (let i = 0; i < 100000; i++) {
      let square = i ** 2;
    }
  }
  
  perfTest('square', square);
  
```
