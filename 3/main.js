
import Storage from './pb/Storage.js';

window.pb = Storage.create();

Storage.listen(window.pb, 'foo', val => {console.log('ALERT!')});
window.pb.foo = 'x';
