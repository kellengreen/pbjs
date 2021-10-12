const o={get:(t,n)=>{const e=Reflect.get(t,n);return e instanceof Function?e.bind(t):e},set:(t,n,e)=>{const s={detail:e},c=new CustomEvent(n,s);return t.dispatchEvent(c),Reflect.set(t,n,e)}};export default function r(){const t=new EventTarget;return new Proxy(t,o)}
//# sourceMappingURL=dispatchEvent.js.map
