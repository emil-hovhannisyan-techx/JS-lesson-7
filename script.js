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
  const result = sum(2)(3)(5);
  document.getElementById("sumOutput").textContent = result;
  console.log(`Sum Result: ${result}`);
});

//task 3
function greet(greeting) {
  return function (name) {
    return `${greeting} ${name}`;
  };
}
const sayHi = greet("Hi,");
document.getElementById("greetBtn").addEventListener("click", () => {
  result = sayHi("John");
  document.getElementById("greetOutput").textContent = result;
  console.log(`Greeting: ${result}`);
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
  const result = user1.greet.call(user2);
  document.getElementById("callOutput").textContent = result;
  console.log(`Method Borrowing Result: ${result}`);
});

// task 5
const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log(this.count);
  },
};

document
  .getElementById("clickBtn")
  .addEventListener("click", counter.increment.bind(counter));
document.getElementById("clickBtn").addEventListener("click", () => {
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
  console.log(`Set Method: ${arrSet}`);
  console.log(`Filter Method: ${arrFiltered}`);
  console.log(`Reduce Method: ${arrReduced}`);
});

// task 7
const people = [
  { name: "Alice", age: 21 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 21 },
  { name: "David", age: 25 },
];

function groupByAge(people) {
  const ageMap = new Map();

  people.forEach((person) => {
    const { age, name } = person;
    if (ageMap.has(age)) {
      const currentNames = ageMap.get(age);
      ageMap.set(age, [...currentNames, name]);
    } else {
      ageMap.set(age, [name]);
    }
  });

  return ageMap;
}
console.log(groupByAge(people));

document.getElementById("ageGroupBtn").addEventListener("click", () => {
  const grouped = groupByAge(people);
  let output = "";
  grouped.forEach((names, age) => {
    output += `Age ${age}: ${names.join(", ")}<br>`;
  });
  document.getElementById("ageGroupOutput").innerHTML = output || "No groups";
  console.log(`Grouped by Age: ${output.replace(/<br>/g, "; ")}`);
});

// task 8
const sales = new Map([
  [101, 10],
  [102, 5],
  [103, 8],
]);

function increaseQuantity(map, key) {
  if (map.has(key)) {
    map.set(key, map.get(key) + 1);
  }
}

function renderSales() {
  const container = document.getElementById("sales-container");
  container.innerHTML = "";
  for (const [key, value] of sales) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "sales-item";

    const textSpan = document.createElement("span");
    textSpan.textContent = `ID: ${key}, Quantity: ${value}`;

    const button = document.createElement("button");
    button.textContent = "Increment";
    button.onclick = () => {
      increaseQuantity(sales, key);
      renderSales();
    };

    itemDiv.appendChild(textSpan);
    itemDiv.appendChild(button);
    container.appendChild(itemDiv);
  }
}

renderSales();
