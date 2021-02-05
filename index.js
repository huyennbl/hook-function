/**
 *
 * @param {Function} mainFn The main function the will be hooked with a list of functions after
 * @param {Function[]} afterFunctions List of functions that will run after the mainFn is resolved, from left to right
 * @returns {Function} Returns a new function that have same function signature as mainFn, and will have afterFunctions called after the mainFn is resolved
 */
function after(mainFn, ...afterFunctions) {
  return function (...args) {
    Promise.resolve(mainFn(...args)).then(function (mainFnOutput) {
      asyncInvoke(afterFunctions, mainFnOutput);
    });
  };
}

/**
 *
 * @param {Function} mainFn The main function the will be hooked with a list of functions after
 * @param {Function[]} afterFunctions List of functions that will run after the mainFn is resolved, sequentially from left to right
 * @returns {Function} Returns a new function that have same function signature as mainFn, and will have afterFunctions called sequentially after the mainFn is resolved
 */
function afterSequentially(mainFn, ...afterFunctions) {
  return function (...args) {
    Promise.resolve(mainFn(...args)).then(function () {
      sequentiallyInvoke(afterFunctions);
    });
  };
}
/**
 *
 * @param {Function} mainFn The main function the will be hooked with a list of functions before
 * @param {Function[]} beforeFunctions List of functions that will run before mainFn, from left to right
 * @returns {Function} Returns a new function that have same function signature as mainFn, and will have beforeFunctions called before the mainFn

 */
function before(mainFn, ...beforeFunctions) {
  return function (...args) {
    asyncInvoke(beforeFunctions);
    mainFn(...args);
  };
}
/**
 *
 * @param {Function} mainFn The main function the will be hooked with a function before
 * @param {Function[]} beforeFunctionsList of functions that will run before mainFn, sequentially from left to right
 * @returns {Function} Returns a new function that have same function signature as mainFn, and will have beforeFunctions called sequentially after the mainFn
 */

function beforeSequentially(mainFn, ...beforeFunctions) {
  return function (...args) {
    sequentiallyInvoke(beforeFunctions);
    mainFn(...args);
  };
}

function isArrowFn(fn) {
  // How does it work?
  //   ^ - start at the beginning of the line
  //   [ ^{ ]+? - Look through everything that follows until the next pattern (=>), but if you find a { first, it's not a match
  //   => - Found => before {, so it's a match
  // https://stackoverflow.com/a/57682075
  return typeof fn === 'function' && /^[^{]+?=>/.test(fn.toString());
}

function asyncInvoke(functions, callbackObject) {
  for (let i = 0; i < functions.length; i++) {
    selectiveInvoke(fn, callbackObject);
  }
}

function selectiveInvoke(fn, callbackObject) {
  if (isArrowFn(fn)) {
    if (typeof callbackObject === 'object') {
      fn({ ...callbackObject });
    } else {
      fn(callbackObject);
    }
  } else {
    fn();
  }
}

function sequentiallyInvoke(functions) {
  functions.reduce((p, f) => p.then(f), Promise.resolve());
}

const hook = {
  after,
  afterSequentially,
  before,
  beforeSequentially,
};

module.exports = { hook };
