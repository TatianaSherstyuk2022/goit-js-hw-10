import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix';

const inputCountryEl = document.querySelector('#search-box');
const countryListElem = document.querySelector('.country-list');
const countryInfoElem = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputCountryEl.addEventListener(
  'input',
  debounce(onCountryFormInput, DEBOUNCE_DELAY)
);

function onCountryFormInput(event) {
  let countryQuery = event.target.value.trim();

  if (countryQuery === '') {
    countryListElem.innerHTML = '';
    countryInfoElem.innerHTML = '';
    return;
  }

  if (countryQuery) {
    fetchCountries(countryQuery)
      .then(data => onChoseMarkup(data))
      .catch(err => {
        Notify.failure('Oops, there is no country with that name');
    });
  };

  countryListElem.innerHTML = '';
  countryInfoElem.innerHTML = '';
}

function onChoseMarkup(countryArray) {
  if (countryArray.length === 1) {
    countryListElem.innerHTML = '';
    return createCountryCard(countryArray);
  }
  if (countryArray.length >= 2 && countryArray.length <= 10) {
    countryInfoElem.innerHTML = '';
    return createCountryList(countryArray);
  }
  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};

function createCountryCard(data) {
  const markup = data
    .map(el => {
      return `
        <h2 class="country_title"><img src="${
          el.flags.svg
        }" alt="d" width="40" height="20">${` `}${el.name.official}</h2>
        <p class="country-text"><b>Capital: </b>${el.capital}</p>
        <p class="country-text"><b>Population: </b>${el.population}</p>
        <p class="country-text"><b>Languages: </b>${Object.values(el.languages).join(', ')}</p>
        `;
    })
    .join('');

  countryInfoElem.innerHTML = markup;
}

function createCountryList(data) {
  const markup = data
    .map(el => {
      return `<li class='country-item'>
                <h4 class="country_title"><img src="${el.flags.svg}" alt="d" width="40" height="20">${` `}${el.name.official}</h2>
              </li>
    `;
    })
    .join('');

  countryListElem.innerHTML = markup;
}
