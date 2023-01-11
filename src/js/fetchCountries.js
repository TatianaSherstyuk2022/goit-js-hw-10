export function fetchCountries(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}?fields={name.official},{capital},{population},{flags.svg},{languages}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}