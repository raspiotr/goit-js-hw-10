import axios from 'axios';
const apiKey =
  'live_UOs61qgqDHBR896dKOCKKP3GVLfO1RqJbthIXAB6dUXQ5lbcXL65dI8OB1kfoBHc';
//axios.defaults.headers.common['x-api-key'] = apiKey;

import {
  fetchBreeds,
  fetchCatByBreed,
  fetchCatImageByBreed,
} from './js/cat-api.js';

const body = document.querySelector('body');
body.style.fontFamily = 'Verdana';

const catsList = document.querySelector('.breed-select');

function renderCatsList(cats) {
  const markup = cats
    .map(cat => {
      return `<option value="${cat.id}">${cat.name}</option>`;
    })
    .join('');
  catsList.innerHTML = markup;
}

const catInfoBox = document.querySelector('.cat-info');

function createImgElement(src, alt, height) {
  const imgElement = document.createElement('img');
  imgElement.src = src;
  imgElement.alt = alt;
  imgElement.height = height;
  catInfoBox.prepend(imgElement);
}

function createTextInfoElement(name, description, temperament) {
  const divElement = document.createElement('div');
  divElement.style.maxWidth = '600px';
  const headingElement = document.createElement('h1');
  const descriptionElement = document.createElement('p');
  const temperamentElement = document.createElement('p');
  headingElement.textContent = name;
  descriptionElement.textContent = description;
  temperamentElement.textContent = temperament;
  const temperTitle = document.createElement('span');
  temperTitle.textContent = 'Temperament: ';
  temperTitle.style.fontWeight = 'bold';
  temperamentElement.prepend(temperTitle);
  divElement.append(headingElement);
  divElement.append(descriptionElement);
  divElement.append(temperamentElement);
  catInfoBox.append(divElement);
}

document.addEventListener(
  'DOMContentLoaded',
  fetchBreeds()
    .then(cats => renderCatsList(cats))
    .catch(error => console.log(error))
);

catsList.addEventListener('change', event => {
  catInfoBox.innerHTML = '';
  catInfoBox.style.display = 'flex';
  catInfoBox.style.gap = '30px';
  const breedId = event.target.value;
  console.log('Wybrana opcja:', breedId);
  fetchCatImageByBreed(breedId)
    .then(data => {
      if (data && data.length > 0) {
        const imageUrl = data[0].url;
        const catName =
          event.target.options[event.target.selectedIndex].textContent;
        console.log('Losowe zdjęcie kota:', imageUrl);
        console.log('Name:', catName);
        createImgElement(imageUrl, catName, 300);
      } else {
        console.log('Nie znaleziono zdjęcia kota.');
      }
    })
    .catch(error => console.log(error));

  fetchCatByBreed(breedId)
    .then(cat => {
      console.log(cat.name);
      console.log(cat.description);
      console.log(cat.temperament);
      createTextInfoElement(cat.name, cat.description, cat.temperament);
    })
    .catch(error => console.log(error));
});
