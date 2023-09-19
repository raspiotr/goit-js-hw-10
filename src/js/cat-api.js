import axios from 'axios';

const apiKey =
  'live_UOs61qgqDHBR896dKOCKKP3GVLfO1RqJbthIXAB6dUXQ5lbcXL65dI8OB1kfoBHc';
//axios.defaults.headers.common['x-api-key'] = apiKey;

const headers = {
  'x-api-key': apiKey,
};

const requestOptions = {
  method: 'GET',
  headers: headers,
};

export function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds`, requestOptions).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      //console.log(response.json());
      return response.json();
    }
  );
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/breeds/${breedId}`,
    requestOptions
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatImageByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    requestOptions
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
