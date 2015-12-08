"use strict";
const pb = {
    elemCreated: new Symbol(),
    elemAttached: new Symbol(),
    elemDetached: new Symbol(),
    elemChanged: new Symbol(),
    valChanged: new Symbol(),
    valDeleted: new Symbol(),
    valCleared: new Symbol()
};
//=include storage/map.js
//=include storage/set.js
//=include elements/base.js
//=include elements/provider.js
//=include elements/bind.js
