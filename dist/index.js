import t,{useMemo as r,useState as n,useContext as e,useEffect as u}from"react";import{jsx as a}from"react/jsx-runtime";var o=function(t){var r=new Map;return function(n){if(!r.get(n)){var e={value:t,updaters:new Map,update:function(t){e.value!==t&&(e.value=t,e.updaters.forEach((function(t,r){return r((function(t){return!t}))})))}};r.set(n,e)}return r.get(n)}},c=function(){return(c=Object.assign||function(t){for(var r,n=1,e=arguments.length;n<e;n++)for(var u in r=arguments[n])Object.prototype.hasOwnProperty.call(r,u)&&(t[u]=r[u]);return t}).apply(this,arguments)},i=t.createContext(null),f=function(t){var n=r((function(){return Symbol("atoms-react")}),[]);return a(i.Provider,c({value:n},{children:t.children}),void 0)},l=Symbol("atoms-react"),p=function(t){var a=n(!1)[1],o=e(i)||l,c=r((function(){return t(o)}),[o]);return u((function(){return c.updaters.set(a,!0),function(){c.updaters.delete(a)}}),[c]),[c.value,c.update]},v=function(t,r,n){return function(e){var u=t(e),a={value:r(u.value),updaters:new Map,update:function(t){}};return u.updaters.set((function(){var t=r(u.value);n?n(a.value,t)||a.updaters.forEach((function(t,r){return r((function(t){return!t}))})):a.value!==t&&a.updaters.forEach((function(t,r){return r((function(t){return!t}))})),a.value=t}),!0),a}};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */export{i as Context,f as Provider,o as atom,v as selectAtom,p as useAtom};
//# sourceMappingURL=index.js.map
