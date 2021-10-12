import untag from "./untag.js";

/**
 * @param {string[]} strings
 * @param  {*[]} expressions
 * @returns {HTMLCollection}
 */
export default function html(strings, ...expressions) {
  const result = untag(strings, ...expressions);
  const parser = new DOMParser();
  const doc = parser.parseFromString(result, "text/html");
  return doc.body.children;
}
