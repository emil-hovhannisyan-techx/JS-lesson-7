// task 1 - debouncing that input until it screams for help

const searchInput = document.getElementById("searchInput");
const searchOutput = document.getElementById("searchOutput");

function debounce(funct, delay = 1000) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => funct.apply(this, args), delay);
  };
}

const logInput = debounce((value) => {
  searchOutput.textContent = `Debounced Input: ${value || "No Input"}`;
  console.log(value);
}, 400);
searchInput.addEventListener("input", (e) => {
  logInput(e.target.value);
});

// task 2
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

document.getElementById("sumBtn").addEventListener("click", () => {
  document.getElementById("sumOutput").textContent = sum(2)(3)(5);
});

//task 3
function greet(greeting) {
  return function (name) {
    return `${greeting} ${name}`;
  };
}
const sayHi = greet("Hi,");
document.getElementById("greetBtn").addEventListener("click", () => {
  document.getElementById("greetOutput").textContent = sayHi("John");
});

// task 4
const user1 = {
  name: "Alice",
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};

const user2 = {
  name: "Bob",
};

document.getElementById("callBtn").addEventListener("click", () => {
  document.getElementById("callOutput").textContent = user1.greet.call(user2);
});

// task 5
const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log(this.count);
  },
};

document.getElementById("clickBtn").addEventListener("click", () => {
  counter.increment();
  document.getElementById("btnOutput").textContent = counter.count;
  if (counter.count === 69) {
    document.getElementById("btnOutput").textContent = "Nice";
  }
});

// task 6
const array = [1, 2, 2, 3, 4, 4, 5];

function removeDuplicatesViaSet(arr) {
  return [...new Set(arr)];
}

function removeDuplicatesViaFilter(arr) {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}

function removeDuplicatesViaReduce(arr) {
  return arr.reduce((accumulator, currentVal) => {
    if (!accumulator.includes(currentVal)) {
      accumulator.push(currentVal);
    }
    return accumulator;
  }, []);
}

document.getElementById("arrayBtn").addEventListener("click", () => {
  let arrFiltered = removeDuplicatesViaFilter(array);
  let arrReduced = removeDuplicatesViaReduce(array);
  let arrSet = removeDuplicatesViaSet(array);

  document.getElementById("setOutput").textContent = arrSet;
  document.getElementById("filterOutput").textContent = arrFiltered;
  document.getElementById("reduceOutput").textContent = arrReduced;
});

// task 7
const people = [
  { name: "Alice", age: 21 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 21 },
  { name: "David", age: 25 },
];
