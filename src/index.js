import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';
import refs from './js/refs';
import { createMarcup } from './js/marcup';



console.log(refs);

const { breedSelector, loader, error, catInfo } = refs;

loader.classList.remove('loader');
error.classList.add('is-hidden');
catInfo.innerHTML = '';



const requestOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const selectOptions = {
  placeholder: '-- select a breed --',
};

function onFetchError(errorInstance) {
  loader.classList.add('is-hidden');
  catInfo.innerHTML = '';

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      timeout: 5000,
    }
  );
}

fetch('https://api.thecatapi.com/v1/breeds', requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(breedsArray => {
    loader.classList.add('is-hidden');

    const dataProvider = breedsArray.map(({ id, name }) => ({
      value: id,
      text: name,
    }));

    dataProvider.unshift({
      value: '',
      text: '-- select a breed --',
      disabled: true,
    });

    
    new SlimSelect(breedSelector, {
      data: dataProvider,
      ...selectOptions,
    });
  })
  .catch(errorInstance => {   
    onFetchError(errorInstance);
    console.error('Error:', errorInstance);
  });







// fetchBreeds()
//     .then(breedsArray => {
//         const dataProvider = breedsArray.map(({ id, name }) => {
//             return { value: id, text: name };
//         });

//         dataProvider.unshift({
//             value: '',
//             text: '-- select a breed --',
//             disabled: true,
//         });
        
//         new SlimSelect({
//             select: breedSelector,
//             data: dataProvider,
//         });
        
//     })
//     .catch(onFetchError);

// function onFetchError(errorInstance) {
//     loader.classList.replace('loader', 'is-hidden');
//     catInfo.innerHTML = '';

//     Notify.failure(
//         'Oops! Something went wrong! Try reloading the page or select another cat breed!',
//         {
//             timeout: 5000,
//         }
//         );
// }



