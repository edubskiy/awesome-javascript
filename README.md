# Javascript Library of useful utilites

Recently added css and common utils library:

Sample #1 Get element style
```javascript
var elem = document.querySelector('#paragraph') // Node element
Utils.css.getStyle(elem, 'height');
```

Sample #2 Bind with currying
```javascript
var Person = {
      name: 'John'
 };
 function walk() {
     console.log(this.name + ' walks');
 }
 var walkingPerson = Utils.common.bind(walk, Person);
 walkingPerson // => 'John walks'
```

Sample #3 Performance test

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

Sample #4 Handling object copy

```javascript
var obj = { zero: 0, one: 1 };
var copiedObj = { ...obj };

copiedObj.zero = 2;

console.log(copiedObj.zero); // 2
console.log(obj.zero); // 0
```

# ... and more examples and best practices inside

# 3rd party libraries collection:

 - Simple Parallax with javascript https://simpleparallax.com/
