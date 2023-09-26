import refs from './refs';
const { catInfo } = refs;

function createMarcup (oneCatData) {
    const { url } = oneCatData;
    const { name, description, temperament } = oneCatData.breeds[0];
    catInfo.innerHTML = ` <div class = "cat-info">
    <img src="${url}" alt= "${name}" width=800 height=450/>
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>  
    </div>`;
}

export { createMarcup };