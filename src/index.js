import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_UOs61qgqDHBR896dKOCKKP3GVLfO1RqJbthIXAB6dUXQ5lbcXL65dI8OB1kfoBHc';

import { fetchBreeds } from './js/cat-api.js';

const catsList = document.querySelector('.breed-select');

function renderCatsList(cats) {
  const markup = cats
    .map(cat => {
      return `<option value="${cat.id}">${cat.name}</option>`;
    })
    .join('');
  catsList.innerHTML = markup;
}

document.addEventListener(
  'DOMContentLoaded',
  fetchBreeds()
    .then(cats => renderCatsList(cats))
    .catch(error => console.log(error))
);
