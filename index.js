/**
 *
 * @param {Function} mainFn The main function the will be hooked with a list of functions after
 * @param {Function[]} afterFunctions List of functions that will run after the mainFn is resolved, from left to right
 * @returns {Function} Returns a new function that have same function signature as mainFn, and will have afterFunctions called after the mainFn is resolved
 */
function after(mainFn, ...afterFunctions) {
  return function (...args) {
    Promise.resolve(mainFn(...args)).then(function () {
      asyncInvoke(afterFunctions);
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

function asyncInvoke(functions) {
  for (let i = 0; i < functions.length; i++) {
    functions[i]();
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
