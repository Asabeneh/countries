
const countriesWrapper = document.querySelector('.countries-wrapper');
let searchInput = document.querySelector('#search-text')
let totalCountries =document.querySelector('#total-countries');
const initialTextButton = document.querySelector("#starts-with");
const textWordButton = document.querySelector("#text-word");


totalCountries.textContent =  'Total Number of countries ' + countries.length;

const hexaColor = function() {
    let numbersLetters = '0123456789abcdef'.split('');
    let hexaNumbers = '';
    let randIndex;
    for (let i = 0; i < 6; i++) {
    randIndex = Math.floor(Math.random() * numbersLetters.length);
    hexaNumbers += numbersLetters[randIndex];
    }
    return '#' + hexaNumbers;
};

const displayCountries = (arr) => {
    countriesWrapper.innerHTML = '';
    let div;
    arr.forEach((country) => {
        div = document.createElement('div');
        div.textContent = country;
        div.className = 'country';
        div.style.background = hexaColor();
        div.style.color = hexaColor();
        countriesWrapper.appendChild(div);
    })
}




const filterCountriesByInitials = (searchText) => {
    let search = searchText.toLowerCase();
    const filteredCountries = countries.filter((country) => {
        return country.toLowerCase().includes(search);
    });
    return searchText === '' ? countries : filteredCountries;
}

const filterCountriesByWord = (searchText) => {
    let search = searchText.toLowerCase();
    const filteredCountries = countries.filter((country) => {
        return country.toLowerCase().includes(search);

    });
    return searchText === '' ? countries : filteredCountries;
}

searchInput.addEventListener('input',() => {
    let len = filterCountriesByWord(searchInput.value).length;
    len > 0  ? document.querySelector('#filtered-countries').textContent = `Countries containing ${searchInput.value} are ${len}.` : ''
    
    displayCountries(filterCountriesByWord(searchInput.value))
})

initialTextButton.addEventListener('click',() => {
    searchInput.addEventListener('input',() => {
        let len = filterCountriesByInitials(searchInput.value).length;
        len > 0  ? document.querySelector('#filtered-countries').textContent = `Countries starting with ${searchInput.value} are ${len}.` : ''
        
        displayCountries(filterCountriesByInitials(searchInput.value))
    })
});

textWordButton.addEventListener('click', () => {
    searchInput.addEventListener('input',() => {
        let len = filterCountriesByWord(searchInput.value).length;
        len > 0  ? document.querySelector('#filtered-countries').textContent = `Countries containing ${searchInput.value} are ${len}.` : ''
        
        displayCountries(filterCountriesByWord(searchInput.value))
    })

});



displayCountries(countries);

