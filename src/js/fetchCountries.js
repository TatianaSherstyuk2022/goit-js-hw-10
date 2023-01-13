const URL_BASE = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL_BASE}${name}?fields=${FIELDS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }).catch(err => console.log(err));
}
