import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-77e16229.js";const m=document.querySelector(".form");m.addEventListener("submit",function(o){o.preventDefault();const t=parseInt(this.elements.delay.value),s=this.elements.state.value;new Promise((e,r)=>{s==="fulfilled"?setTimeout(()=>{e(t)},t):s==="rejected"&&setTimeout(()=>{r(t)},t)}).then(e=>{i.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{i.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
