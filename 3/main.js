// import Element from './pb/Element.js';
// import ElementManager from './pb/ElementManager.js';
// import {x} from './pb/storage.js';

// class MyManager extends ElementManager {
    
    // }
    
    // const el = new ElementManager();
import Storage from './pb/Storage.js';
    
window.s = Storage.object({});
Storage.listen(s, 'foo', (val) => {
    console.log(`set: ${val}`);
})

// customElements.define('test-one', MyManager);
