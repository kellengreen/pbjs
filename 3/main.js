
import Storage from './pb/Storage.js';

const data = {};
const storage = new Storage(data);

storage.listen('foo', (val) => {
    console.log(`set: ${val}`);
});


storage.listen('foo', (val) => {
    console.log(`set: ${val}`);
});

