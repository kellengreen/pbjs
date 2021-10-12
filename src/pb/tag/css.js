import untag from "./untag.js";

/**
 * @param {string[]} strings
 * @param  {*[]} expressions
 * @returns {CSSStyleSheet}
 */
export default function css(strings, ...expressions) {
  const result = untag(strings, ...expressions);
  const sheet = CSSStyleSheet.CSSStyleSheet();
  sheet.replaceSync(result);
  return sheet;
}
