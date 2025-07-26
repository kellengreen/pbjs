import ObjectProxy from "./ObjectProxy.js";

const root = ObjectProxy();

root.a = {
  b: [0, 1, 2],
  c: 0,
  d: 1,
  e: 2,
};

console.dir(root);
