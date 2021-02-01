/**
 *
 * @param {Function} mainFn The main function the will be hooked with a function after
 * @param {Function[]} afterFunctions List of functions that will run after mainFn, from left to right
 * @returns {Function} Returns new function that have same function signature as mainFn, and will have afterFn called after the mainFn
 */
function after(mainFn, ...afterFunctions) {
  return function (...args) {
    mainFn(...args);
    sequentiallyInvoke(afterFunctions);
  };
}
/**
 *
 * @param {Function} mainFn The main function the will be hooked with a function before
 * @param {Function[]} beforeFunctions List of functions that will run before mainFn, from left to right
 * @returns {Function} Returns new function that have same function signature as mainFn, and will have beforeFn called before the mainFn

 */
function before(mainFn, ...beforeFunctions) {
  return function (...args) {
    sequentiallyInvoke(beforeFunctions);
    mainFn(...args);
  };
}

function sequentiallyInvoke(functions) {
  for (let i = 0; i < functions.length; i++) {
    functions[i]();
  }
}

const hook = {
  before,
  after,
};

module.exports = { hook };
