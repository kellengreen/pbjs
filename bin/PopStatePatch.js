const pushState=history.pushState;history.pushState=function(...t){pushState.apply(history,t);const e=new PopStateEvent("popstate");dispatchEvent(e)};const replaceState=history.replaceState;history.replaceState=function(...t){replaceState.apply(history,t);const e=new PopStateEvent("popstate");dispatchEvent(e)};
//# sourceMappingURL=PopStatePatch.js.map
