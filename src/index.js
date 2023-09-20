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
catsList.style.marginBottom = '25px';

const loaderMessage = document.querySelector('.loader');
loaderMessage.style.display = 'none';
loaderMessage.style.fontWeight = 'bold';

const errorMessage = document.querySelector('.error');
errorMessage.style.display = 'none';
errorMessage.style.color = 'red';

function renderCatsList(cats) {
  const markup = cats
    .map(cat => {
      return `<option value="${cat.id}">${cat.name}</option>`;
    })
    .join('');
  catsList.innerHTML = markup;
}

const catInfoBox = document.querySelector('.cat-info');
catInfoBox.style.display = 'flex';
catInfoBox.style.gap = '25px';

function createImgElement(src, alt, height) {
  const imgElement = document.createElement('img');
  imgElement.src = src;
  imgElement.alt = `${alt} cat`;
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

document.addEventListener('DOMContentLoaded', () => {
  catsList.style.display = 'none';
  loaderMessage.style.display = 'block';
  errorMessage.style.display = 'none';
  fetchBreeds()
    .then(cats => {
      renderCatsList(cats);
      loaderMessage.style.display = 'none';
      catsList.style.display = 'inline';
    })
    .catch(error => {
      loaderMessage.style.display = 'none';
      errorMessage.style.display = 'block';
    });
});

catsList.addEventListener('change', event => {
  catInfoBox.style.display = 'none';
  loaderMessage.style.display = 'block';
  errorMessage.style.display = 'none';
  catInfoBox.innerHTML = '';

  const breedId = event.target.value;
  //console.log('Selected option:', breedId);
  fetchCatImageByBreed(breedId)
    .then(data => {
      const imageUrl = data[0].url;
      const catName =
        event.target.options[event.target.selectedIndex].textContent;
      // console.log('Photo link:', imageUrl);
      // console.log('Name:', catName);
      createImgElement(imageUrl, catName, 300);
      loaderMessage.style.display = 'none';
      catInfoBox.style.display = 'flex';
    })
    .catch(error => {
      loaderMessage.style.display = 'none';
      errorMessage.style.display = 'block';
      const imageErrorUrl = 'https://tinyurl.com/4ns2k7w2';
      createImgElement(imageErrorUrl, 'Placeholder error', 300);
    });

  fetchCatByBreed(breedId)
    .then(cat => {
      // console.log('Name: ', cat.name);
      // console.log('Description: ', cat.description);
      // console.log('Temperament: ', cat.temperament);
      createTextInfoElement(cat.name, cat.description, cat.temperament);
      loaderMessage.style.display = 'none';
      catInfoBox.style.display = 'flex';
    })
    .catch(error => {
      loaderMessage.style.display = 'none';
      errorMessage.style.display = 'block';
    });
});
