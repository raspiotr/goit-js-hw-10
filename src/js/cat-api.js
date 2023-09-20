import axios from 'axios';

const apiKey =
  'live_UOs61qgqDHBR896dKOCKKP3GVLfO1RqJbthIXAB6dUXQ5lbcXL65dI8OB1kfoBHc';
axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.response.status);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds/${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.response.status);
    });
}

export function fetchCatImageByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.response.status);
    });
}
