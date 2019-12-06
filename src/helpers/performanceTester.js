// outputs elapsed execution time of your method to your web console
function perfTest(name, method) {
    console.time(`Method - ${name}`);
    method.apply();
    console.timeEnd(`Method - ${name}`);
  }
  
  // usage
  
  // function to test
  function square() {
    for (let i = 0; i < 100000; i++) {
      let square = i ** 2;
    }
  }
  
  // test it
  perfTest('square', square); // output -> Method - square: 3.966064453125ms
  