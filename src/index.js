import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import Notiflix from 'notiflix';
import SlimSelect from "slim-select";
import 'slim-select/dist/slimselect.css';

const selectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
const catInfoEl = document.querySelector(".cat-info");

selectEl.classList.add('visually-hidden');
errorEl.classList.add('visually-hidden');

fetchBreeds()
    .then(data => {
      const dataList = data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join("");
        
        selectEl.insertAdjacentHTML("beforeend", dataList);
        
        new SlimSelect({
            select: selectEl,
            settings: {
                placeholderText: '-- Select the breed of the cat --',
            }
        });

        loaderEl.classList.add('visually-hidden');
        selectEl.classList.remove('visually-hidden');
    })
    .catch(() => {
        loaderEl.classList.add('visually-hidden');
        Notiflix.Notify.failure(errorEl.textContent);
    });

selectEl.addEventListener('change', function (event) {
    catInfoEl.innerHTML = '';
    loaderEl.classList.remove('visually-hidden');

    const selectedBreedId = event.currentTarget.value;

    if (selectedBreedId) {
        fetchCatByBreed(selectedBreedId)
            .then(data => {
                const catInfo = `
                <div class="cat-img-container">
                <img src="${data[0].url}" alt="${data[0].breeds[0].name} image">
                </div>
                <div class="cat-descr">
                <h1>${data[0].breeds[0].name}</h1>
                <p>${data[0].breeds[0].description}</p>
                <p><span class="temperament-el">Temperament:</span> ${data[0].breeds[0].temperament}</p>
                </div>`;

                catInfoEl.innerHTML = catInfo;

                loaderEl.classList.add('visually-hidden');
            })
            .catch(() => {
                catInfoEl.innerHTML = '';
                loaderEl.classList.add('visually-hidden');
                Notiflix.Notify.failure(errorEl.textContent);
            })
    }
});

