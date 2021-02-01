# function-hook

A small utils for adding before and after hook to another function

## Installation

## Example

```js
const { hook } = require('./index');
const { before, after } = hook;
function first() {
  console.log('1st');
}
function second() {
  console.log('2nd');
}
function main(number) {
  console.log(number);
}

let mainWithBeforeHook = before(main, first);
mainWithBeforeHook(42);
// 1st
// 42
main();
// 42

let mainWith2BeforeHooks = before(main, first, second);
mainWith2BeforeHooks(42);
// 1st
// 2nd
// 42

let mainWithAfterHook = after(main, first);
mainWithAfterHook(42);
// 42
// 1st

let mainWith2AfterHooks = after(main, first, second);
mainWith2AfterHooks(42);
// 42
// 1st
// 2nd
```
