import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_gemlNDVGJLAl0mz7HH50hfC9TVvG9ZcMn2NIH4ZNebsWKsZAcTmzySLkJh5Z0a6P';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const breedSelect = document.querySelector('.breed-select');
const infoLoader = document.querySelector('.loader');
const selectError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

window.addEventListener('load', init);

function init() {
  let breedsData;
  fetchBreeds()
    .then(data => {
      breedsData = data;
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);

        breedSelect.classList.remove('is-hidden');
        infoLoader.classList.add('is-hidden');
      });
    })
    .catch(error => {
      console.log(error);
      selectError.classList.remove('is-hidden');
      breedSelect.classList.add('is-hidden');
      infoLoader.classList.add('is-hidden');
    });

  breedSelect.addEventListener('change', () => {
    const selectBreedId = breedSelect.value;
    infoLoader.classList.remove('is-hidden');
    catInfo.classList.add('is-hidden');
    selectError.classList.add('is-hidden');

    fetchCatByBreed(selectBreedId)
      .then(result => {
        const catData = result;
        const breedData = breedsData.find(breed => breed.id === selectBreedId);

        const markup = createMarkup(catData, breedData);
        catInfo.innerHTML = markup;

        infoLoader.classList.add('is-hidden');
        catInfo.classList.remove('is-hidden');
      })
      .catch(error => {
        console.log(error);
        selectError.classList.remove('is-hidden');
        infoLoader.classList.add('is-hidden');
      });
  });
}

function createMarkup(catData, breedData) {
  return `<img src='${catData.url}' width='300' alt='${breedData.name}'/>
        <div class='textInfo'><h1>${breedData.name}</h1>
        <p>${breedData.description}</p>
        <p><b>Temperament:</b> ${breedData.temperament}</p></div>`;
}