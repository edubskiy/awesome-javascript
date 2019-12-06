// <Shallow copy>

// 1. Using the spread operator
var obj = { one: 1, two: 2 };
var copiedObj = { ...obj };
copiedObj.one = 3;
console.log(copiedObj.one); // 3
console.log(obj.one); // 1

// 2.Using loop
function copy(sourceObj) {
  let targetObj = {};
  let keys = Object.keys(sourceObj);

  for (let i = 0, len = keys.length; i < len; i++) {
    let key = keys[i];
    targetObj[key] = sourceObj[key];
  }
  return targetObj;
}

// 3. Object.assign
var source = { one: 1, nested: { two: 2 } };
var target = Object.assign({}, source);

// </ Shallow copy>

// <Deep copy>

// 1. JSON.stringify and JSON.parse
// only work with number, string, and object literals and don’t support function or symbol properties
function JSONCopy(source) { 
  return JSON.parse(JSON.stringify(source));
}

// 2. Custom deep clone method
function isObject(obj) {
  var type = typeof obj;
  return (type === 'function' || type === 'object') && !!obj; // this will handle obj , null and undefined
};

function deepClone(src) {
  let target = {};
  let keys = Object.keys(src);
  for (let i = 0, len = keys.length; i < len; i++) {
    let key = keys[i];
    if (src.hasOwnProperty(key)) {
      // if the value is a referece(object), recursively copy all properties by calling deepClone
      let val = src[key];
      let isObj = isObject(val);
      if (isObj) {
        target[key] = deepClone(val);
      } else {
        target[key] = val;
      }
    }
  }
  return target;
}

// </ Deep copy>
