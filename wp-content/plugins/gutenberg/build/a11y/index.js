window.wp=window.wp||{},window.wp.a11y=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=571)}({1:function(e,t){e.exports=window.wp.i18n},355:function(e,t){e.exports=window.wp.domReady},571:function(e,t,n){"use strict";n.r(t),n.d(t,"setup",(function(){return p})),n.d(t,"speak",(function(){return u}));var r=n(355),i=n.n(r),o=n(1);function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"polite",t=document.createElement("div");t.id="a11y-speak-".concat(e),t.className="a11y-speak-region",t.setAttribute("style","position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"),t.setAttribute("aria-live",e),t.setAttribute("aria-relevant","additions text"),t.setAttribute("aria-atomic","true");var n=document,r=n.body;return r&&r.appendChild(t),t}var d="";function p(){var e=document.getElementById("a11y-speak-intro-text"),t=document.getElementById("a11y-speak-assertive"),n=document.getElementById("a11y-speak-polite");null===e&&function(){var e=document.createElement("p");e.id="a11y-speak-intro-text",e.className="a11y-speak-intro-text",e.textContent=Object(o.__)("Notifications"),e.setAttribute("style","position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"),e.setAttribute("hidden","hidden");var t=document.body;t&&t.appendChild(e)}(),null===t&&a("assertive"),null===n&&a("polite")}function u(e,t){!function(){for(var e=document.getElementsByClassName("a11y-speak-region"),t=document.getElementById("a11y-speak-intro-text"),n=0;n<e.length;n++)e[n].textContent="";t&&t.setAttribute("hidden","hidden")}(),e=function(e){return e=e.replace(/<[^<>]+>/g," "),d===e&&(e+=" "),d=e,e}(e);var n=document.getElementById("a11y-speak-intro-text"),r=document.getElementById("a11y-speak-assertive"),i=document.getElementById("a11y-speak-polite");r&&"assertive"===t?r.textContent=e:i&&(i.textContent=e),n&&n.removeAttribute("hidden")}i()(p)}});