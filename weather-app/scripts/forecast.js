
// info below coming from Accu Weather API website
const apiKey = 'dFApzgXvEPg64IzuADEc0z7NqJmMmGkD';
const citySearchURL = 'https://dataservice.accuweather.com/locations/v1/cities/search';
const currentConditionsURL = 'https://dataservice.accuweather.com/currentconditions/v1/';
let city = 'manchester'; //264885

// function to fetch the data on a Promise from an API
const getCity = async (city) => {
  // query string URL
  const query = `${citySearchURL}?apikey=${apiKey}&q=${city}`;
  // using fetch to return a Response object
  const response = await fetch(query);
  // 'response.json()' returns a promise
  // which will be caught using .then .catch when f(x) is called
  const data = await response.json();
  // 'data' is returned as an array and we select the first hit '[0]'
  return data[0];
};


// function to get current conditions with the locationKey from getCity f(x)
const getCondition = async (locationKey) => {
  const query = `${currentConditionsURL}${locationKey}?apikey=${apiKey}`;
  const response = await fetch(query);
  const data = await response.json();
  return data[0];
};



