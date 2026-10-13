# Node.js and Express.js: Complete Learning Notes

A complete, beginner-friendly guide to Node.js, modules, the HTTP module, Express.js, middleware, REST APIs, and CSR vs SSR. It also covers the example projects from my practice code.

---

## Table of Contents

1. [What is Node.js?](#1-what-is-nodejs)
2. [How Node.js Works Internally](#2-how-nodejs-works-internally)
3. [package.json](#3-packagejson)
4. [Modules and Modular Programming](#4-modules-and-modular-programming)
5. [CommonJS vs ES Modules](#5-commonjs-vs-es-modules)
6. [node_modules](#6-node_modules)
7. [npm Scripts](#7-npm-scripts)
8. [What is a Server?](#8-what-is-a-server)
9. [Parts of a URL](#9-parts-of-a-url)
10. [The HTTP Module](#10-the-http-module)
11. [What is Express.js?](#11-what-is-expressjs)
12. [Why Use Express?](#12-why-use-express)
13. [How Express Works](#13-how-express-works)
14. [Routing in Express](#14-routing-in-express)
15. [Middleware](#15-middleware)
16. [Framework vs Library](#16-framework-vs-library)
17. [REST API](#17-rest-api)
18. [Client-Side Rendering vs Server-Side Rendering](#18-client-side-rendering-vs-server-side-rendering)
19. [Project Examples](#19-project-examples)
20. [Practice Project Ideas](#20-practice-project-ideas)
21. [Quick Revision Cheat Sheet](#21-quick-revision-cheat-sheet)

---

## 1. What is Node.js?

Node.js is a **runtime environment** that allows JavaScript to run **outside the browser**, on almost any machine.

Important points:

- Node.js is **not** a programming language.
- Node.js is **not** a framework.
- Node.js is **not** a technology stack by itself. It is an environment for running JavaScript.

### Why was it created?

Every browser has its own JavaScript engine:

| Browser | JavaScript Engine |
|---------|-------------------|
| Chrome | V8 |
| Firefox | SpiderMonkey |
| Safari (Apple) | JavaScriptCore |

**Ryan Dahl** wanted to run JavaScript outside the browser. He took Google Chrome's **V8 engine**, added extra capabilities around it (file system access, networking, and so on), and Node.js was born.

---

## 2. How Node.js Works Internally

```
JavaScript  ->  V8 Engine  ->  Node.js APIs  ->  C++ (system level)
```

### Main components

1. **V8 Engine**
   - Executes JavaScript code.
   - Written in C++.

2. **libuv**
   - A C library that provides the **event loop**.
   - Handles **asynchronous operations** (file I/O, network requests, timers).

3. **Node APIs (built-in modules)**
   - `fs` for the file system
   - `crypto` for encryption and hashing
   - `http` for creating servers
   - `path`, `os`, `events`, and others

4. **C++ bindings**
   - Connect JavaScript code to the operating system.

### Simple summary

> Node.js is a runtime environment that runs JavaScript using the V8 engine, with libuv handling async operations through the event loop.

---

## 3. package.json

`package.json` is the **manifest file** of a Node.js project. It stores:

- Project name, version, and description
- Entry file (`main`)
- Module type (`commonjs` or `module`)
- Scripts
- Dependencies (every package you install is recorded here)
- Author and license

### Example

```json
{
  "name": "node1",
  "version": "1.0.0",
  "description": "Node.js practice project",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev": "node index.js"
  },
  "author": "",
  "license": "ISC"
}
```

### Create one

```bash
npm init -y
```

### Key fields

| Field | Meaning |
|-------|---------|
| `main` | Entry point file of the project |
| `type` | `"module"` for ES Modules, default is CommonJS |
| `scripts` | Custom commands you can run with npm |
| `dependencies` | Packages needed to run the app |

---

## 4. Modules and Modular Programming

### What is a module?

A **module** is a separate JavaScript file that contains related code (functions, variables, classes) and can be **reused** in other files.

### What is modular programming?

Modular programming means **breaking a large program into small, independent, reusable pieces** (modules).

Benefits:

- Code is easier to read and maintain
- Code is reusable
- Bugs are easier to find
- Teams can work on separate modules
- Avoids one huge file

---

## 5. CommonJS vs ES Modules

There are **two ways** to use code from one JS file in another:

1. **CommonJS** (the default in Node.js)
2. **ES Modules** (the modern standard)

### 5.1 CommonJS (default)

**Export** (`index.js`):

```js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

**Import** (`app.js`):

```js
const add = require("./index");
console.log(add(5, 5));
```

### 5.2 ES Modules

To use ES Modules, add this to `package.json`:

```json
"type": "module"
```

ES Modules have **two types of exports**:

#### a) Default export

```js
// index.js
function add(a, b) {
  return a + b;
}

export default add;
```

```js
// app.js
import add from "./index.js";   // any name can be used
console.log(add(5, 5));
```

#### b) Named export

```js
// index.js
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

export { add, sub };
```

```js
// app.js
import { add, sub } from "./index.js";   // exact names required
console.log(add(5, 5));
console.log(sub(5, 3));
```

### Important rules

- A file can have **only one default export**.
- If you need to export **multiple things**, use **named exports**: `export { add, sub };`
- With ES Modules, include the **file extension** in imports (`./index.js`).

### Comparison

| Feature | CommonJS | ES Module |
|---------|----------|-----------|
| Import | `require()` | `import` |
| Export | `module.exports` | `export` / `export default` |
| Default in Node | Yes | Needs `"type": "module"` |
| Loading | Synchronous | Asynchronous |

---

## 6. node_modules

- The `node_modules` folder stores **every package you install**.
- It also stores each package's **dependencies**, and the dependencies of those dependencies (nested dependencies).
- Never edit it manually and never upload it to GitHub. Add it to `.gitignore`.
- It can be recreated anytime with:

```bash
npm install
```

---

## 7. npm Scripts

Scripts are defined inside `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "node index.js",
  "hello": "node index.js"
}
```

### How to run them

| Script name | Command |
|-------------|---------|
| `start` | `npm start` |
| `test` | `npm test` |
| any other (e.g. `dev`, `hello`) | `npm run dev`, `npm run hello` |

> Only `start` and `test` are special and can be run without `run`. Every other script name requires `npm run <name>`.

---

## 8. What is a Server?

A **server** is a computer connected to the internet that can **receive requests from clients, process them, and send back responses**.

```
Client (Browser)  --- Request --->  Server
Client (Browser)  <-- Response ---  Server
```

---

## 9. Parts of a URL

Example:

```
https://www.example.com/products/shoes?id=abc123xyz
```

| Part | Example | Meaning |
|------|---------|---------|
| Protocol | `https://` | Rules used for communication |
| Domain | `www.example.com` | Address of the server |
| Path | `/products/shoes` | Specific resource or page |
| Query parameter | `?id=abc123xyz` | Extra information sent to the server, written after `?` |

Query parameters are used to send extra data such as search terms, filters, IDs, or page numbers. Multiple parameters are joined with `&`:

```
/search?name=phone&price=500
```

---

## 10. The HTTP Module

`http` is a built-in Node.js module used to **create a server** without any extra package.

### Example

```js
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("Home page");
  } else {
    res.end("hello i am amar");
  }
});

server.listen(3000, () => {
  console.log("server started");
});
```

### Explanation

- `http.createServer()` creates the server.
- `req` is the request object (URL, method, headers).
- `res` is the response object (used to send data back).
- `res.end()` sends the response and finishes it.
- `server.listen(3000)` makes the server listen on port 3000.

### Problem with raw HTTP

You must handle every route, method, and parsing step manually with `if/else`. The code gets long and messy. This is why **Express** exists.

---

## 11. What is Express.js?

**Express.js** is a **minimal and flexible backend framework for Node.js**. It is used to build web servers and APIs quickly and cleanly.

Internally, Express uses Node's **`http` module**. It just adds a simpler and more powerful layer on top.

### Install

```bash
npm install express
```

---

## 12. Why Use Express?

| Feature | What it gives you |
|---------|-------------------|
| Backend framework | Structured way to build server-side apps |
| Server creation | Create a server in a few lines |
| Routing | Easily define URLs and methods (GET, POST, PUT, DELETE) |
| Middleware | Run code between the request and the response |
| Modularity | Split code into routes, controllers, and middleware files |
| Less code | Far shorter than raw `http` |
| Big ecosystem | Many compatible packages (cors, helmet, morgan, etc.) |

### Raw HTTP vs Express

**Raw HTTP**

```js
const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.end("Home");
  } else if (req.url === "/about" && req.method === "GET") {
    res.end("About");
  }
});
```

**Express**

```js
app.get("/", (req, res) => res.send("Home"));
app.get("/about", (req, res) => res.send("About"));
```

---

## 13. How Express Works

```
Client Request
      |
      v
  Express App
      |
      v
  Middleware (1 -> 2 -> 3 ...)
      |
      v
  Route Handler
      |
      v
  Response sent back to the client
```

### Basic steps

1. Import express
2. Create the app
3. Define routes
4. Start the server with `listen`

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server started successfully");
});

app.listen(3000, () => {
  console.log("server started successfully");
});
```

### Useful response methods

| Method | Use |
|--------|-----|
| `res.send()` | Send text, HTML, or an object |
| `res.json()` | Send a JSON response |
| `res.end()` | End the response without data |
| `res.status(404)` | Set the status code |
| `res.redirect()` | Redirect to another URL |

> **Bug note from the practice code:** in the original example, the route handler contained only an object-like line `message: "server started succesfully"`, which does nothing. To actually send it, write: `res.json({ message: "server started successfully" });`

---

## 14. Routing in Express

Routing means deciding **what the server does for a given URL and HTTP method**.

```js
app.get("/", (req, res) => { ... });
app.post("/users", (req, res) => { ... });
app.put("/users/:id", (req, res) => { ... });
app.delete("/users/:id", (req, res) => { ... });
```

### Route parameters

```js
app.get("/users/:id", (req, res) => {
  res.send(`User id is ${req.params.id}`);
});
```

### Query parameters

```js
// /search?name=phone
app.get("/search", (req, res) => {
  res.send(`Searching for ${req.query.name}`);
});
```

### Reading request body (POST)

```js
app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
  res.json({ message: "User created" });
});
```

---

## 15. Middleware

### What is middleware?

Middleware is a **function that runs between the request and the response**. It has access to:

- `req` (request)
- `res` (response)
- `next` (a function that passes control to the next middleware)

```
Request -> Middleware 1 -> Middleware 2 -> Route Handler -> Response
```

### What can middleware do?

- Log requests
- Authenticate users
- Parse request bodies (JSON)
- Validate data
- Handle errors
- Modify `req` or `res`
- End the request-response cycle

### Basic example

```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // pass control to the next function
};

app.use(logger);
```

> If you don't call `next()` or send a response, the request will hang forever.

### Types of middleware

| Type | Example |
|------|---------|
| Application-level | `app.use(logger)` |
| Router-level | `router.use(auth)` |
| Built-in | `express.json()`, `express.static()` |
| Third-party | `cors`, `morgan`, `helmet` |
| Error-handling | `(err, req, res, next) => {}` |

### Route-specific middleware

```js
const auth = (req, res, next) => {
  const loggedIn = true;
  if (loggedIn) next();
  else res.status(401).send("Unauthorized");
};

app.get("/dashboard", auth, (req, res) => {
  res.send("Dashboard");
});
```

### Error-handling middleware

It has **four parameters** and goes after all routes:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});
```

### Common built-in middleware

```js
app.use(express.json());                         // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static("public"));               // serve static files
```

---

## 16. Framework vs Library

| Library | Framework |
|---------|-----------|
| You call the library when you need it | The framework calls your code (inversion of control) |
| Flexible, no strict rules | Strict and rigid, follows fixed rules and structure |
| You decide the structure | Structure is decided for you |
| Example: **React** | Example: **Next.js**, Angular |

### Example from Next.js vs React

- In **Next.js**, you must create a specific folder (such as `api` or `app`/`pages`) for things to work. It enforces rules, so it is a **framework**.
- In **React**, there is no such requirement. You can structure the project however you like, so React is a **library**.

> Express is called a framework, but it is minimal and unopinionated compared to full frameworks.

---

## 17. REST API

An API that follows **REST principles** is called a **REST API** (Representational State Transfer).

### REST principles

1. **Client-server separation**: client and server are two different, independent entities.
2. **Stateless**: each request contains all the information needed; the server doesn't remember previous requests.
3. **Cacheable**: responses can be cached to improve performance.
4. **Uniform interface**: consistent URL structure and HTTP methods.
5. **Layered system**: there can be layers (load balancer, proxy) between client and server.
6. **Resource-based**: everything is a resource identified by a URL.

### HTTP methods

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Read data | `GET /users` |
| POST | Create data | `POST /users` |
| PUT / PATCH | Update data | `PUT /users/1` |
| DELETE | Delete data | `DELETE /users/1` |

### Common status codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Not found |
| 500 | Server error |

---

## 18. Client-Side Rendering vs Server-Side Rendering

### Server-Side Rendering (SSR)

All rendering is done on the **server**. The finished HTML is sent to the browser, so the client has no further processing to do.

```
Browser -> Request -> Server -> Database -> Data
        -> Server builds HTML -> Browser (displays ready page)
```

### Client-Side Rendering (CSR)

The server sends data (and a JavaScript bundle). All processing and rendering of components is done in the **browser**.

```
Browser -> Request -> Server -> Database -> Data
        -> Browser processes data in required format
        -> Browser builds HTML -> Page displayed
```

After the first load, the backend does not help with re-rendering. The client handles it.

### Comparison

| Feature | CSR | SSR |
|---------|-----|-----|
| Rendering location | Browser | Server |
| Initial load | Slower | Faster |
| SEO | Weaker | **Better** |
| Interactivity | **Better** | Weaker between pages |
| Server load | Lower | Higher |
| Examples | React (SPA) | Next.js, EJS templates |

### Which is better?

It depends on the use case.

- **SSR**: best for SEO (blogs, e-commerce, news sites).
- **CSR**: best for highly interactive apps (dashboards, chat apps).
- This does not mean CSR is bad. Each has its own strengths.

---

## 19. Project Examples

### 19.1 Module example (`index.js`)

```js
function add(a, b) {
  return a + b;
}

// module.exports = add;     // CommonJS export
// export default add;       // ES Module default export
export { add };              // ES Module named export
```

### 19.2 Importing the module (`app.js`)

```js
// const add = require("./index");      // CommonJS import
// import add from "./index.js";        // ES Module default import
import { add } from "./index.js";       // ES Module named import

console.log(add(5, 5)); // 10
```

### 19.3 package.json for the module project

```json
{
  "name": "node1",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev": "node index.js"
  },
  "author": "",
  "license": "ISC"
}
```

### 19.4 HTTP server

```js
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("Home page");
  } else {
    res.end("hello i am amar");
  }
});

server.listen(3000, () => {
  console.log("server started");
});
```

### 19.5 Basic Express server

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "server started successfully" });
});

app.listen(3000, () => {
  console.log("server started successfully");
});
```

### 19.6 Express project package.json

```json
{
  "name": "http",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

### 19.7 Express multiple routes

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.end("this is home page");
});

app.get("/about", (req, res) => {
  res.end("this is about page");
});

app.get("/contact", (req, res) => {
  res.end("this is contact page");
});

app.get("/product", (req, res) => {
  res.end("this is product page");
});

app.listen(9999, () => {
  console.log("server started");
});
```

Test in the browser:

- `http://localhost:9999/`
- `http://localhost:9999/about`
- `http://localhost:9999/contact`
- `http://localhost:9999/product`

### 19.8 Same project with middleware added

```js
import express from "express";

const app = express();

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.get("/", (req, res) => res.send("this is home page"));
app.get("/about", (req, res) => res.send("this is about page"));
app.get("/contact", (req, res) => res.send("this is contact page"));
app.get("/product", (req, res) => res.send("this is product page"));

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server error");
});

app.listen(9999, () => {
  console.log("server started on port 9999");
});
```

---

## 20. Practice Project Ideas

1. **Task management system** (Trello clone)
2. **Social media feed interface**
3. **E-learning quiz platform**
4. **E-commerce product catalog**
5. **Analytics dashboard**

---

## 21. Quick Revision Cheat Sheet

- **Node.js** = JavaScript runtime environment (not a language or framework).
- **V8** runs JS, **libuv** provides the event loop and async handling, and **Node APIs** (fs, crypto, http) give extra features.
- **Flow**: JS -> V8 -> Node APIs -> C++.
- **package.json** = manifest file that records project info and dependencies.
- **Module** = a reusable JS file; **modular programming** = splitting code into modules.
- **CommonJS**: `require` / `module.exports`. **ES Module**: `import` / `export` (set `"type": "module"`).
- **Default export** = one per file. **Named export** = many, use `{ }`.
- **node_modules** = installed packages and all their nested dependencies.
- `npm start` and `npm test` work directly; other scripts need `npm run name`.
- **Server** = a computer on the internet that handles requests.
- **URL** = protocol + domain + path + query parameters.
- **http module** = built-in way to create a server.
- **Express** = a backend framework built on `http` that gives routing, middleware, and modularity.
- **Middleware** = a function between request and response; it must call `next()` or send a response.
- **Library** = flexible (React). **Framework** = rigid and rule-based (Next.js).
- **REST API** = follows principles: client-server separation, stateless, cacheable, uniform interface.
- **SSR** = server renders HTML (better SEO). **CSR** = browser renders (better interactivity).

---

*Happy coding!*