/**
 * Safe eval 
 */
class PbEval {
    static get assignment() {
        return '|{[^}]}|\[[^\]]\]';
    }

    static get arrayDestruct() {

    }

    static get objectDestruct() {
        
    }

    static getLoop(str) {
        const regex = /\s*(.+)\s+of\s+(.+)\s*/;
        const match = str.match(regex);
        console.log(match);
    }

    /**
     * 
     * @param {*} root 
     * @param {*} path 
     */
    static getValue(root, path) {
        
    }


    
}

export default PbEval;
