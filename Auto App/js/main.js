const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
let countries;

//Get countries
const getCountries = async () => {
    const res = await fetch("../data/countries.json");
    countries = await res.json();
};

//Filter countries
const searchCountries = searchText => {
 
  // Get matches to current text input
  let matches = countries.filter(country => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return country.name.match(regex) || country.abbr.match(regex);
  });

  //Clear when input or matches are empty
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(
      match => `
            <div class="card card-body mb-4">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long ${match.long}</long>
            </div>
        `
    )
    .join('');

    matchList.innerHTML = html;
  }
};

window.addEventListener('DOMContentLoaded', getCountries);
search.addEventListener("input", () => searchCountries(search.value));
