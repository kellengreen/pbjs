const root = {};

const pb = new Proxy(root, {
    get: (target, property, receiver) => {
        console.dir(target);
        console.dir(property);
        console.dir(receiver);
        console.dir('-');
        return target[property];
    },
    set: () => {

    },
});

window.pb = pb;

console.dir('x');

export default pb;
