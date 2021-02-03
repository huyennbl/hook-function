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
let sequentialHookFn = hook.afterSequentially(
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

let normalHookFn = hook.after(
  main,
  makeDelayFn(300),
  instant,
  makeDelayFn(100)
);
normalHookFn();
// main
// instant
// wait 100ms
// wait 300ms
```
