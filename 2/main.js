console.log('hi');
const foo = ['a','b','c'];

const poo = new Proxy(foo, {
    get: function(target, property, receiver) {
        console.dir(target);
        console.dir(property);
        console.dir(receiver);
        console.dir('-');
        return target[property];
    }
})