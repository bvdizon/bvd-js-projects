
// add event listener to the form on 'submit'
const form = document.querySelector('form.change-location');

// this function will then call the functions getCity and getCondition
const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const cityCondition = await getCondition(cityDetails.Key);

    // Object short-hand notation
    return { cityDetails, cityCondition }

    /*
    This is the long-hand way to write object
        return {
            cityDetails: cityDetails,
            cityCondition: cityCondition
        }
    */
};


const updateUI = data => {
    // Destructing properties
    const { cityDetails, cityCondition } = data;
    /*
    Without using 'Destructing properties' 
        const cityDetails = data.cityDetails;
        const cityCondition = data.cityCondition;
    */

    // show card if data is fetched by removing 'd-none' class
    document.querySelector('.card').classList.remove('d-none');

    // show card to dislay image if day or night time        
    // ternary operator to check if day or night and assigning value on 'time'
    const time = cityCondition.IsDayTime ? './img/day.svg' : './img/night.svg';
    // updating UI based on the value of the variable 'time' 
    let timeOfDay = document.querySelector('.time').setAttribute('src', time);

    // show weather icon
    document.querySelector('.icon > img').setAttribute('src', `./img/icons/${cityCondition.WeatherIcon}.svg`);
    
    // creating template string to display various data from fetched APIs
    let html = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${cityCondition.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${cityCondition.Temperature.Metric.Value}</span>
        <span>°C</span>
        </div>
    `;
    // showing info from 'html' variable to UI
    document.querySelector('.details').innerHTML = html;
}



form.addEventListener('submit', e => {
    e.preventDefault();
    // get the city input value on submit
    const city = form.city.value.trim().toLowerCase();
    form.reset();

    // call a function passing the city to and catch the Promise and update UI
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});


