import untag from "./untag.js";

/**
 * @param {string[]} strings
 * @param  {*[]} expressions
 * @returns {HTMLCollection}
 */
export default function html(strings, ...expressions) {
  const str = untag(strings, ...expressions);
  const doc = new DOMParser().parseFromString(str, "text/html");
  return doc.body.children;
}
