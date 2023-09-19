import axios from 'axios';
const apiKey =
  'live_UOs61qgqDHBR896dKOCKKP3GVLfO1RqJbthIXAB6dUXQ5lbcXL65dI8OB1kfoBHc';
//axios.defaults.headers.common['x-api-key'] = apiKey;

import {
  fetchBreeds,
  fetchCatByBreed,
  fetchCatImageByBreed,
} from './js/cat-api.js';

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

catsList.addEventListener('change', function (event) {
  const breedId = event.target.value;
  console.log('Wybrana opcja:', breedId);

  fetchCatByBreed(breedId)
    .then(cat => {
      console.log(cat.name);
      console.log(cat.description);
      console.log(cat.temperament);
    })
    .catch(error => console.log(error));

  fetchCatImageByBreed(breedId)
    .then(data => {
      // if (data && data.length > 0) {
      //   const imageUrl = data[0].url;
      //   console.log('Losowe zdjęcie kota:', imageUrl);
      // } else {
      //   console.log('Nie znaleziono zdjęcia kota.');
      // }
      console.log(data[0].url);
    })
    .catch(error => console.log(error));
});
