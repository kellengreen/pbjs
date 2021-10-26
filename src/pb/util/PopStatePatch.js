const pushState = history.pushState;
history.pushState = function pushStateWrapper(...args) {
  pushState.apply(history, args);
  const evt = new PopStateEvent("popstate");
  dispatchEvent(evt);
};

const replaceState = history.replaceState;
history.replaceState = function replaceStateWrapper(...args) {
  replaceState.apply(history, args);
  const evt = new PopStateEvent("popstate");
  dispatchEvent(evt);
};
