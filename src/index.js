import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries.js';
import Notiflix from 'notiflix';

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
