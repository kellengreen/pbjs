/**
 * Converts a CamelCase string into a KebabCase one.
 * @param {string}
 * @returns {string}
 */
export default function camelToKebab(str) {
  const arr = [...str];
  arr.forEach((char, idx) => {
    const lower = char.toLowerCase();
    if (char !== lower) {
      arr[idx] = (idx ? "-" : "") + lower;
    }
  });
  return arr.join("");
}
