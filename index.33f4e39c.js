!function(){var n={method:"GET",headers:{"x-api-key":"live_UOs61qgqDHBR896dKOCKKP3GVLfO1RqJbthIXAB6dUXQ5lbcXL65dI8OB1kfoBHc"}};function t(t){return fetch("https://api.thecatapi.com/v1/breeds/".concat(t),n).then((function(n){if(!n.ok)throw new Error(n.status);return n.json()}))}function e(t){return fetch("https://api.thecatapi.com/v1/images/search?breed_ids=".concat(t),n).then((function(n){if(!n.ok)throw new Error(n.status);return n.json()}))}var o=document.querySelector(".breed-select");document.addEventListener("DOMContentLoaded",fetch("https://api.thecatapi.com/v1/breeds",n).then((function(n){if(!n.ok)throw new Error(n.status);return n.json()})).then((function(n){return function(n){var t=n.map((function(n){return'<option value="'.concat(n.id,'">').concat(n.name,"</option>")})).join("");o.innerHTML=t}(n)})).catch((function(n){return console.log(n)}))),o.addEventListener("change",(function(n){var o=n.target.value;console.log("Wybrana opcja:",o),t(o).then((function(n){console.log(n.name),console.log(n.description),console.log(n.temperament)})).catch((function(n){return console.log(n)})),e(o).then((function(n){console.log(n[0].url)})).catch((function(n){return console.log(n)}))}))}();
//# sourceMappingURL=index.33f4e39c.js.map
