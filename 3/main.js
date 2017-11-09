import Element from './pb/Element.js';
import ElementManager from './pb/ElementManager.js';

class MyManager extends ElementManager {

}

customElements.define('test-one', MyManager);
