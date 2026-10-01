# Node.js — Day 1

This repository contains my **Day 1 Node.js learning notes and examples**.
The focus of this day is understanding the fundamentals of Node.js, JavaScript runtime environments, the V8 engine, modules, CommonJS, ES Modules, and `package.json`.

---

## 📚 Topics Covered

* What is Node.js?
* Node.js vs JavaScript
* JavaScript engines
* V8 JavaScript Engine
* How Node.js works
* libuv and the Event Loop
* Node.js APIs
* Modules
* Modular Programming
* CommonJS Modules
* ES Modules
* Default Export
* Named Export
* `package.json`
* CommonJS vs ES Modules

---

# 1. What is Node.js?

**Node.js is a JavaScript runtime environment that allows JavaScript code to run outside a web browser.**

JavaScript was originally designed to run inside browsers. Node.js provides an environment that allows JavaScript to be executed on the server and on other systems.

Node.js is:

* A JavaScript runtime environment
* Used for server-side development
* Built around Google's V8 JavaScript engine
* Suitable for building APIs, servers, CLI applications, real-time applications, and backend services

Node.js is **not**:

* A programming language
* A framework

JavaScript is the programming language, while Node.js is a runtime environment for executing JavaScript outside the browser.

---

# 2. JavaScript Engines

JavaScript code needs a JavaScript engine to execute.

Different browsers use different JavaScript engines:

| Browser         | JavaScript Engine |
| --------------- | ----------------- |
| Google Chrome   | V8                |
| Mozilla Firefox | SpiderMonkey      |
| Apple Safari    | JavaScriptCore    |
| Microsoft Edge  | V8                |

For example, Chrome uses the **V8 JavaScript engine** to execute JavaScript.

Node.js also uses the **V8 engine**, which allows JavaScript to run outside the browser.

---

# 3. Why was Node.js Created?

Before Node.js, JavaScript was primarily associated with browser-based applications.

**Ryan Dahl** introduced Node.js to enable JavaScript to be used for server-side programming.

Node.js uses Google's V8 engine as its JavaScript execution engine and adds additional capabilities that are not provided by the browser alone.

These capabilities include APIs for:

* File system operations
* Networking
* Cryptography
* Timers
* Processes
* Streams
* Other system-level operations

---

# 4. V8 JavaScript Engine

The **V8 engine** is Google's open-source JavaScript and WebAssembly engine.

It is primarily written in **C++** and is responsible for executing JavaScript code.

A simplified representation is:

```text
JavaScript Code
      ↓
     V8
      ↓
JavaScript Execution
```

Node.js embeds V8 and provides additional runtime functionality around it.

A simplified Node.js architecture can be represented as:

```text
                 Node.js
                    |
          ┌─────────┴─────────┐
          |                   |
         V8                 libuv
          |                   |
  JavaScript Execution    Async I/O
                              |
                    ┌─────────┴─────────┐
                    |                   |
               Event Loop        Operating System
```

---

# 5. What is libuv?

**libuv** is a multi-platform library used by Node.js to provide asynchronous I/O capabilities.

It plays an important role in Node.js's event-driven architecture.

libuv is associated with functionality such as:

* Event loop
* File system operations
* Networking
* Timers
* Asynchronous I/O

This allows Node.js to efficiently handle many I/O operations without blocking the JavaScript execution thread.

---

# 6. Node.js APIs

Node.js provides built-in APIs and modules that allow JavaScript programs to interact with the operating system and other resources.

For example:

### File System

```js
import fs from "fs";
```

The `fs` module can be used to read and write files.

### Crypto

```js
import crypto from "crypto";
```

The `crypto` module provides cryptographic functionality.

Other commonly used Node.js modules include:

* `http`
* `path`
* `os`
* `events`
* `url`
* `stream`

---

# 7. Node.js Runtime Overview

A simplified way to understand Node.js is:

```text
JavaScript
     ↓
     V8
     ↓
  Node.js
     ↓
Node.js APIs + libuv
     ↓
Operating System
```

The important point is that **V8 executes JavaScript**, while Node.js provides additional APIs and runtime functionality that allow JavaScript to interact with the operating system and perform server-side tasks.

---

# 8. What is a Module?

A **module** is a reusable and independent piece of code.

For example, instead of putting all application logic into one file, we can divide the application into multiple files:

```text
project/
│
├── user.js
├── product.js
├── database.js
└── server.js
```

Each file can contain a specific part of the application's functionality.

Modules help us:

* Reuse code
* Organize projects
* Reduce complexity
* Improve maintainability
* Separate responsibilities
* Make applications easier to test

---

# 9. What is Modular Programming?

**Modular programming** is a programming approach where a large application is divided into smaller, independent modules.

Instead of creating one large file:

```text
Large Application
      ↓
One huge file
      ↓
Difficult to maintain
```

we can divide it into smaller modules:

```text
Application
│
├── Authentication
├── Users
├── Products
├── Payments
└── Database
```

Each module can focus on a particular responsibility.

This makes the application more organized and maintainable.

---

# 10. Node.js Module Systems

Node.js supports two major module systems:

1. **CommonJS**
2. **ES Modules**

---

# 11. CommonJS

CommonJS is the traditional module system used by Node.js.

It uses:

```js
require()
```

for importing modules and:

```js
module.exports
```

for exporting modules.

### Example

#### `index.js`

```js
function add(a, b) {
    return a + b;
}

module.exports = add;
```

#### `script.js`

```js
const add = require("./index");

console.log(add(5, 5));
```

Output:

```text
10
```

The function is exported from `index.js` and imported into `script.js`.

---

# 12. ES Modules

**ES Modules (ESM)** are the standard JavaScript module system.

ES Modules use:

```js
import
```

and:

```js
export
```

To use ES Modules with `.js` files in Node.js, we can specify the following in `package.json`:

```json
{
    "type": "module"
}
```

After this configuration, `.js` files are treated as ES Modules.

---

# 13. Default Export

A module can have **one default export**.

### `index.js`

```js
function add(a, b) {
    return a + b;
}

export default add;
```

### `script.js`

```js
import add from "./index.js";

console.log(add(5, 5));
```

Output:

```text
10
```

When importing a default export, curly braces `{}` are not required.

---

# 14. Named Export

A module can have **multiple named exports**.

### `index.js`

```js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

export { add, subtract };
```

### `script.js`

```js
import { add, subtract } from "./index.js";

console.log(add(5, 5));
console.log(subtract(5, 2));
```

Output:

```text
10
3
```

Named exports are useful when a module needs to expose multiple functions, variables, classes, or other values.

---

# 15. Exporting Directly

Named exports can also be declared directly:

```js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

Then they can be imported using:

```js
import { add, subtract } from "./index.js";
```

---

# 16. Default Export vs Named Export

| Feature           | Default Export                 | Named Export                       |
| ----------------- | ------------------------------ | ---------------------------------- |
| Syntax            | `export default`               | `export`                           |
| Number per module | One                            | Multiple                           |
| Import syntax     | `import add from "./index.js"` | `import { add } from "./index.js"` |
| Curly braces      | Not required                   | Required                           |
| Multiple values   | Usually one main value         | Multiple values                    |

### Default export

```js
export default add;
```

Import:

```js
import add from "./index.js";
```

### Named export

```js
export { add, subtract };
```

Import:

```js
import { add, subtract } from "./index.js";
```

---

# 17. Important: Multiple Exports

A common misconception is that if multiple exports are written, only the last export will be available.

That is **not true for named exports**.

For example:

```js
export { add, subtract };
```

Both `add` and `subtract` are exported.

They can both be imported:

```js
import { add, subtract } from "./index.js";
```

However, a module can have only **one default export**.

This is invalid:

```js
export default add;
export default subtract;
```

Instead, use named exports:

```js
export { add, subtract };
```

---

# 18. `package.json`

`package.json` is the **manifest and configuration file of a Node.js project**.

It contains important information about the project, such as:

* Project name
* Version
* Description
* Scripts
* Dependencies
* Development dependencies
* Module configuration

Example:

```json
{
    "name": "nodejs-day1",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
        "start": "node script.js"
    },
    "dependencies": {}
}
```

---

# 19. Installing Packages

When we install an external package using npm:

```bash
npm install express
```

npm records the dependency in `package.json`.

For example:

```json
{
    "dependencies": {
        "express": "^5.0.0"
    }
}
```

The installed package is placed inside:

```text
node_modules/
```

Therefore:

```text
package.json
    ↓
Records project configuration and dependencies

node_modules/
    ↓
Contains installed packages
```

---

# 20. CommonJS vs ES Modules

### CommonJS

```js
// Export
module.exports = add;
```

```js
// Import
const add = require("./index");
```

### ES Modules

```js
// Export
export default add;
```

```js
// Import
import add from "./index.js";
```

### Named ES Module

```js
// Export
export { add, subtract };
```

```js
// Import
import { add, subtract } from "./index.js";
```

---

# 21. Project Structure

A simple Day 1 project can look like this:

```text
Day1/
│
├── index.js
├── script.js
├── package.json
└── README.md
```

### `package.json`

```json
{
    "name": "nodejs-day1",
    "version": "1.0.0",
    "type": "module"
}
```

### `index.js`

```js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

export { add, subtract };
```

### `script.js`

```js
import { add, subtract } from "./index.js";

console.log(add(5, 5));
console.log(subtract(5, 2));
```

Output:

```text
10
3
```

---

# 22. Key Takeaways

* Node.js is a **JavaScript runtime environment**.
* Node.js allows JavaScript to run outside the browser.
* Node.js is **not a programming language or framework**.
* Node.js uses Google's **V8 JavaScript engine**.
* V8 executes JavaScript code.
* Node.js provides additional runtime APIs.
* **libuv** plays an important role in Node.js asynchronous I/O and the event loop.
* A **module** is a reusable and independent piece of code.
* Modular programming divides a large application into smaller modules.
* Node.js supports **CommonJS** and **ES Modules**.
* CommonJS uses `require()` and `module.exports`.
* ES Modules use `import` and `export`.
* ES Modules support **default exports** and **named exports**.
* A module can have **one default export** but can have **multiple named exports**.
* `package.json` is the manifest/configuration file for a Node.js project.
* Installed npm packages are stored in `node_modules`.

---

## 🧠 Quick Revision

```text
Node.js
│
├── JavaScript Runtime Environment
│
├── V8
│   └── Executes JavaScript
│
├── Node.js APIs
│   ├── fs
│   ├── crypto
│   ├── http
│   └── etc.
│
├── libuv
│   ├── Event Loop
│   └── Asynchronous I/O
│
└── Modules
    │
    ├── CommonJS
    │   ├── require()
    │   └── module.exports
    │
    └── ES Modules
        ├── import
        ├── export default
        └── named export
```

---

## 🚀 Day 1 Completed

This day establishes the foundation for understanding how Node.js works and how JavaScript files communicate with each other through modules.

**Next topics to explore:** npm, Node.js built-in modules, file system (`fs`), HTTP server, asynchronous JavaScript, callbacks, Promises, and the Event Loop.

