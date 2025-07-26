import { listen, ignore } from "./symbols.js";

Object.defineProperties(String.prototype, {
  [listen]: {
    value() {
      return 0;
    },
  },
  [ignore]: {
    value() {
      return 0;
    },
  },
});
