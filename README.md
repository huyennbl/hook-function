# function-hook

A small utils for adding before and after hook to another function, no extra dependencies

## Installation

```
// with npm
npm install hook-function

// or with yarn
yarn add hook-function
```

## Example

### Sample functions

```js
function first() {
  console.log('1st');
}

function second() {
  console.log('2nd');
}

function main() {
  console.log('main');
}

const makeDelayFn = (ms) =>
  function delayed() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(console.log(`wait ${ms}ms`));
      }, ms);
    });
  };

function instant() {
  console.log('instant');
}
```

### `hook.before` & `hook.after`

```js
const { hook } = require('hook-function');
const { before, after } = hook;

let mainWith2BeforeHooks = before(main, first, second);
mainWith2BeforeHooks();
// 1st
// 2nd
// main

let mainWith2AfterHooks = after(main, first, second);
mainWith2AfterHooks(main);
// main
// 1st
// 2nd
```

### `hook.beforeSequentially` & `hook.afterSequentially`

```js
const { hook } = require('hook-function');
const { after, afterSequentially } = hook;

// beforeSequentially is similar
let sequentialHookFn = afterSequentially(
  main,
  makeDelayFn(300),
  instant,
  makeDelayFn(100)
);
sequentialHookFn();
// main
// wait 300ms
// instant
// wait 100ms

let normalHookFn = after(main, makeDelayFn(300), instant, makeDelayFn(100));
normalHookFn();
// main
// instant
// wait 100ms
// wait 300ms
```

### `hook.after` using data returned by main function

> Data return by main function are **_not_** chained in after-functions. Same data will be applied to each after-functions.

> If after-functions are regular functions instead of arrow functions, the hook calls the regular functions directly.

```js
const { hook } = require('hook-function');
const { after } = hook;

function printInput(input) {
  console.log(input || 'nothing')
}

function returnTen() {
  return 10;
}

function printDouble(num) {
  console.log(num * 2);
}
}

function printTriple(num) {
  console.log(num * 3);
}

let fn = after(
  returnTen,
  (result) => printDouble(result),
  (result) => printTriple(result),
  printInput,
  (result) => printInput(result)
);

fn();
// 20
// 30
// nothing
// 10
```
