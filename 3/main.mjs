
import Pb from './js/Pb.mjs';
import PbElem from './js/PbElem.mjs';

const pb = new Pb();

const container = document.querySelector('#dest');

document.querySelector('#add').addEventListener('click', () => {
    
    let child = document.createElement('div');
    child.classList.add('1');
    child.innerHTML = `${container.children.length + 1}`;
    child.setAttribute('pb-is', 'x');
    container.appendChild(child);
});

document.querySelector('#remove').addEventListener('click', () => {
    const child = container.lastElementChild;
    container.removeChild(child);
});

document.querySelector('#mod').addEventListener('click', () => {
    const child = container.lastElementChild;
    child.textContent += `.`;
});


class MyElem extends PbElem {
    constructor(elem) {
        super(elem);
        console.dir(elem);
    }
}

pb.register('x', MyElem)