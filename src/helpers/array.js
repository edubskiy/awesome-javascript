/* 1. Remove duplicates from an array */
var fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple'];

// First method
var uniqueFruits = Array.from(new Set(fruits));
console.log(uniqueFruits); // returns ['banana', 'apple', 'orange', 'watermelon', 'grape']
// Second method
var uniqueFruits2 = [...new Set(fruits)];
console.log(uniqueFruits2); // returns ['banana', 'apple', 'orange', 'watermelon', 'grape']


/* 2. Replace the specific value in an array */
var fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple'];
fruits.splice(0, 2, 'potato', 'tomato');
console.log(fruits);

/* 3. Map array without .map() */

var friends = [
    { name: 'John', age: 22 },
    { name: 'Peter', age: 23 },
    { name: 'Mark', age: 24 },
    { name: 'Maria', age: 22 },
    { name: 'Monica', age: 21 },
    { name: 'Martha', age: 19 },
];

var friendsNames = Array.from(friends, ({name}) => name);
console.log(friendsNames); // returns ['John', 'Peter', 'Mark', 'Maria', 'Monica', 'Martha']

/* 4. Map array without .map() */
var fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple'];
fruits.length = 0;
console.log(fruits); // returns []

var fruits = ['banana', 'apple', 'orange', 'watermelon'];
var fruitsObj = { ...fruits };
console.log(fruitsObj); // returns {0: “banana”, 1: “apple”, 2: “orange”, 3: “watermelon”, 4: “apple”, 5: “orange”, 6: “grape”, 7: “apple”}

/* 5. Sum all the values in the array */
var nums = [1, 5, 2, 6];
var sum = nums.reduce((x, y) => x + y);
console.log(sum); // returns 14


function groupBy(arr, key) {
  return arr.reduce((acc, i) => {
    (acc[i[key]] = acc[i[key]] || []).push(i);
    return acc;
  }, {});
}

// raw data example
const roleModels = [
  {
    userId: 1,
    name: 'John Williams',
    type: 'Composer'
  },
  {
    userId: 2,
    name: 'Hans Zimmer',
    type: 'Composer'
  },
  {
    userId: 3,
    name: 'Michael Jordan',
    type: 'Athlete'
  },
  {
    userId: 4,
    name: 'J.K. Rowling',
    type: 'Author'
  }
];

const byType = groupBy(roleModels, 'type');

// results (derived):
{
  Athlete: [{ ...}],
    Author: [{ ...}],
      Composer: [
        {
          userId: 1,
          name: 'John Williams',
          type: 'Composer'
        },
        {
          userId: 2,
          name: 'Hans Zimmer',
          type: 'Composer'
        }
      ]
}



