// export default class PatchedHistory extends History {
//   static pushState(...args) {
//     console.log({
//       t: this,
//       // s: super(),
//     });
//     // super.pushState(...args);
//     // pushState.apply(history, args);
//     // const evt = new PopStateEvent("popstate");
//     // dispatchEvent(evt);
//   }

//   // static replaceState(...args) {
//   // super.replaceState(...args);
//   // replaceState.apply(history, args);
//   // const evt = new PopStateEvent("popstate");
//   // dispatchEvent(evt);
//   // }
// }

export function PatchedHistory() {}
PatchedHistory.prototype = Object.create(History.prototype);

PatchedHistory.prototype.pushState = function pushState2(...args) {
  History.prototype.pushState.apply(history, args);
};

const patchedHistory = new PatchedHistory();
export default patchedHistory;

console.log({
  History,
  PatchedHistory,
  history,
  patchedHistory,
});
