/**
 * Tagged template literal to clean HTML
 * clean`<p>${input}</p>`
 * @param {array} strings 
 * @param {...string} values 
 */
function clean(strings, ...values) {
    const elem = document.createElement('p');
    let result = '';
    for (let i = 0; i < values.length; i++) {
        elem.textContent = values[i];
        result += strings[i] + elem.innerHTML;
    }
    result += strings[strings.length - 1];
    return result;
}