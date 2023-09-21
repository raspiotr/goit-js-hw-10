import axios from 'axios';
const apiKey =
  'live_UOs61qgqDHBR896dKOCKKP3GVLfO1RqJbthIXAB6dUXQ5lbcXL65dI8OB1kfoBHc';
axios.defaults.headers.common['x-api-key'] = apiKey;

import Choices from 'choices.js/public/assets/scripts/choices';
import 'choices.js/public/assets/styles/choices.css';

import { Spinner } from 'spin.js';

import Swal from 'sweetalert2';

import {
  fetchBreeds,
  fetchCatByBreed,
  fetchCatImageByBreed,
} from './js/cat-api.js';

const loader = new Spinner({
  lines: 20,
  length: 50,
  width: 15,
  radius: 100,
  scale: 1,
  color: '#000',
});

const body = document.querySelector('body');
body.style.fontFamily = 'Verdana';
body.style.backgroundColor = '#f9f4e7';

const titleElement = document.createElement('h1');
titleElement.textContent = 'Cat Search';
titleElement.style.fontWeight = 'bold';
titleElement.style.textAlign = 'center';
titleElement.style.marginTop = '20px';
body.prepend(titleElement);

const catsList = document.querySelector('.breed-select');
catsList.style.marginBottom = '25px';

const loaderMessage = document.querySelector('.loader');
loaderMessage.style.display = 'none';
loaderMessage.style.fontWeight = 'bold';
loaderMessage.style.textAlign = 'center';
loaderMessage.style.marginTop = '5vw';
loaderMessage.append(loader.spin().el);

const errorMessage = document.querySelector('.error');
errorMessage.style.display = 'none';
errorMessage.style.color = 'red';

const alertOptions = {
  title: 'Alert!',
  text: errorMessage.textContent,
  icon: 'warning',
  allowDuplicates: false,
  color: 'red',
  iconColor: 'red',
  confirmButtonColor: 'grey',
};

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
catInfoBox.style.gap = '80px';
catInfoBox.style.justifyContent = 'center';

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
  const headingElement = document.createElement('h2');
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
  //errorMessage.style.display = 'none';
  fetchBreeds()
    .then(cats => {
      renderCatsList(cats);
      loaderMessage.style.display = 'none';
      catsList.style.display = 'inline';
    })
    .catch(error => {
      loaderMessage.style.display = 'none';
      //errorMessage.style.display = 'block';
      Swal.fire(alertOptions); // instead of errorMessage.style.display
    })
    .finally(() => {
      if (catsList) {
        new Choices(catsList, {
          itemSelectText:
            'Press to select and display information about this cat',
        });
      }
    });
});

catsList.addEventListener('change', event => {
  catInfoBox.style.display = 'none';
  loaderMessage.style.display = 'block';
  //errorMessage.style.display = 'none';
  catInfoBox.innerHTML = '';

  const breedId = event.target.value;

  fetchCatImageByBreed(breedId)
    .then(data => {
      const imageUrl = data[0].url;
      const catName =
        event.target.options[event.target.selectedIndex].textContent;

      createImgElement(imageUrl, catName, 500);
      loaderMessage.style.display = 'none';
      catInfoBox.style.display = 'flex';
    })
    .catch(error => {
      loaderMessage.style.display = 'none';
      //errorMessage.style.display = 'block';
      Swal.fire(alertOptions); // instead of errorMessage.style.display
      const imageErrorUrl = 'https://tinyurl.com/4ns2k7w2';
      createImgElement(imageErrorUrl, 'Placeholder error', 500);
    });

  fetchCatByBreed(breedId)
    .then(cat => {
      createTextInfoElement(cat.name, cat.description, cat.temperament);
      loaderMessage.style.display = 'none';
      catInfoBox.style.display = 'flex';
    })
    .catch(error => {
      loaderMessage.style.display = 'none';
      //errorMessage.style.display = 'block';
      Swal.fire(alertOptions); // instead of errorMessage.style.display
    });
});
