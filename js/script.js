const countriesWrapper = document.querySelector('.countries-wrapper')
const searchInput = document.querySelector('.search-text')
const filteredCountriesCount = document.querySelector('.filtered-countries')
const totalCountries = document.querySelector('.total-countries')
const initialTextButton = document.querySelector('.starts-with')
const textWordButton = document.querySelector('.text-word')
const sortButton = document.querySelector('.sort')
const title = document.querySelector('h1')

const startsWithFlag = false
const includesFlag = false
const reverseFlag = false
const searchingFlag = false

totalCountries.textContent = 'Total Number of countries ' + countries.length

const hexaColor = () => {
  const str = '0123456789abcdef'
  let hexaColor = '#'
  let index
  for (let i = 0; i < 6; i++) {
    index = Math.floor(Math.random() * str.length)
    hexaColor += str[index]
  }
  return hexaColor
}

setInterval(() => {
  title.style.color = hexaColor()
}, 2500)

const filterCountries = (arr, searchText, type = null) => {
  let search = searchText.toLowerCase()
  switch (type) {
    case 'startswith':
      const filteredArray = arr.filter(item =>
        item.toLowerCase().startsWith(search)
      )
      return search === '' ? arr : filteredArray
    case 'includes':
      const filteredCountries = arr.filter(item =>
        item.toLowerCase().includes(search)
      )
      return search === '' ? arr : filteredCountries

    default:
      return countries
  }
}
const displayCountries = arr => {
  let countries = [...arr]
  countriesWrapper.innerHTML = ''
  let div
  countries.forEach(country => {
    div = document.createElement('div')
    div.textContent = country
    div.className = 'country'
    div.style.background = hexaColor()
    div.style.color = hexaColor()
    countriesWrapper.appendChild(div)
  })
}

const filteredCountries = filterCountries(countries, '')

displayCountries(filteredCountries)

const filterCountriesByInitials = searchText => {
  let search = searchText.toLowerCase()
  const filteredArray = countries.filter(item => {
    return item.toLowerCase().startsWith(search)
  })
  return search === '' ? arr : filteredArray
}

const filterCountriesByWord = searchText => {
  let search = searchText.toLowerCase()
  const filteredCountries = countries.filter(country => {
    return country.toLowerCase().includes(search)
  })
  return search === '' ? countries : filteredCountries
}

const reverseCountries = () => {
  let icon = document.querySelector('i')
  initialTextButton.classList.remove('class', 'active')
  textWordButton.classList.remove('active')
  sortButton.classList.add('active')

  if (icon.classList.contains('fa-sort-alpha-down')) {
    icon.classList.remove('fa-sort-alpha-down')
    icon.classList.add('fa-sort-alpha-up')
    let sortedCountries = [...countries]
    sortedCountries.reverse()
    displayCountries(sortedCountries)
  } else {
    displayCountries(countries)
    icon.classList.remove('fa-sort-alpha-up')
    icon.classList.add('fa-sort-alpha-down')
  }
}

searchInput.addEventListener('input', () => {
  let len = filterCountries(countries, searchInput.value, 'includes').length
  let grammar = len >= 2 ? 'are' : 'is'
  let subtitle = `Countries containing <strong><em> ${searchInput.value} </em></strong> ${grammar} <span>${len}</span>.`
  if (len > 0 && searchInput.value != '') {
    filteredCountriesCount.innerHTML = subtitle
  } else {
    filteredCountriesCount.innerHTML = ''
  }

  displayCountries(filterCountriesByWord(searchInput.value))
})

initialTextButton.addEventListener('click', () => {
  initialTextButton.setAttribute('class', 'active')
  sortButton.classList.remove('active')
  textWordButton.classList.remove('active')
  searchInput.addEventListener('input', () => {
    let len = filterCountries(countries, searchInput.value, 'startswith')
    //let len = filterCountriesByInitials(searchInput.value).length
    if (len > 0 && searchInput.value !== '') {
      filteredCountriesCount.innerHTML = `Countries start with <strong><em> ${
        searchInput.value
      } </em></strong> ${len >= 2 ? 'are' : 'is'} <span>${len}</span>.`
    } else {
      filteredCountriesCount.innerHTML = ''
    }

    displayCountries(
      filterCountries(countries, searchInput.value, 'startswith')
    )
  })
})

textWordButton.addEventListener('click', () => {
  textWordButton.setAttribute('class', 'active')
  initialTextButton.classList.remove('active')
  sortButton.classList.remove('active')
  searchInput.addEventListener('input', () => {
    let len = filterCountriesByWord(searchInput.value).length
    if (len > 0 && searchInput.value != '') {
      filteredCountriesCount.innerHTML = `Countries containing  <strong><em> ${
        searchInput.value
      } </em></strong> ${len >= 2 ? 'are' : 'is'} <span><b>${len}</b></span>.`
    } else {
      filteredCountriesCount.innerHTML = ''
    }

    displayCountries(filterCountriesByWord(searchInput.value))
  })
})

sortButton.addEventListener('click', () => {
  reverseCountries()
})
