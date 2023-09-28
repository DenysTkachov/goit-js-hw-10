import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';
import refs from './js/refs';
import { createMarcup } from './js/marcup';



console.log(refs);

const { breedSelector, loader, error, catInfo } = refs;

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');

fetchBreeds()
    .then(breedsArray => {
        const dataProvider = breedsArray.map(({ id, name }) => {
            return { value: id, text: name };
        });

        dataProvider.unshift({
            value: '',
            text: '-- select a breed --',
            disabled: true,
        });
        
        new SlimSelect({
            select: breedSelector,
            data: dataProvider,
        });
        
    })
    .catch(onFetchError);

function onFetchError(errorInstance) {
    loader.classList.replace('loader', 'is-hidden');
    catInfo.innerHTML = '';

    Notify.failure(
        'Oops! Something went wrong! Try reloading the page or select another cat breed!',
        {
            timeout: 5000,
        }
        );
}



