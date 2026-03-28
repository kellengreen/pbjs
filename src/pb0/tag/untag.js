/**
 * Takes template tag arguments and returns the unaltered string.
 * hasOwnProperty is used since an expression could have evaluated as undefined.
 * @param {string[]} strings
 * @param  {*[]} expressions
 * @returns {string}
 */
export default function untag(strings, ...expressions) {
  return strings.reduce((prev, curr, idx) => {
    const expression = expressions.hasOwnProperty(idx) ? expressions[idx] : "";
    return prev + curr + expression;
  }, "");
}
