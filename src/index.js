import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix';

const inputCountryEl = document.querySelector('#search-box');
const countryListElem = document.querySelector('.country-list');
const countryInfoElem = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

function onCountryFormInput(event) {
  let countryQuery = event.target.value.trim();

  console.log(fetchCountries(countryQuery));

  if (countryQuery) {
    return fetchCountries(countryQuery)
      .then(data => onChoseMarkup(data))
      .catch(err => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
}

inputCountryEl.addEventListener(
  'input',
  debounce(onCountryFormInput, DEBOUNCE_DELAY)
);

function onChoseMarkup(data) {
  if (countryArray === 1) {
    countryListElem.innerHTML = '';
    return createCountryCards(countryArray);
  }
  if (countryArray.length >= 2 && countryArray.length <= 10) {
    countryInfoElem.innerHTML = ''
    return createCountries(countryArray);
  }
}

function createCountryCards(countryInfo) {
  const markup = countryInfo
    .map(el => {
      return `
        <h2 class="country_title"><span class="country_flag">${el.flags.svg}</span>${el.name.official}</h2>
        <p class="country-text"><b>Capital:</b>${el.capital}</p>
        <p class="country-text"><b>Population:</b>${el.population}</p>
        <p class="country-text"><b>Languages:</b>${el.languages}</p>
        `;
    })
    .join('');

  countryInfoElem.innerHTML = markup;
}

function createCountries(countryInfo) {
  const markup = countryInfo
    .map(el => {
      return `<li class='country-item'>
                <img src="${el.flags.svg}" alt="d" width="40" height="20">
                <p>${el.name.official}</p>
              </li>
    `;
    })
    .join('');

  countryListElem.innerHTML = markup;
}
