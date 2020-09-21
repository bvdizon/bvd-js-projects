const fetchAPI = document.getElementById('fetchAPI');
const googleData = document.getElementById('googleData');
const url = 'https://spreadsheets.google.com/feeds/list/18fq91mdIpm31eKMXLVnke6UAyCVtW-IyZWukVCK-qr8/od6/public/values?alt=json'

fetchAPI.addEventListener('click', getData);

function getData(e) {
    fetch(url)
        .then(response => response.json())
        .then(data => processData(data))
        .catch(err => console.log(err));
}

function processData(data) {
    let rows = data.feed.entry;
    googleData.innerHTML = '';

    // filtering the received data
    let filteredRows = rows.filter(row => row.gsx$status.$t.includes('active'));
    // itireating filtered data
    filteredRows.forEach(row => {
        // creating element --- making it available for search filter
        let ul = document.createElement('ul');
        let employee = `<li>${row.gsx$name.$t} --- ${row.gsx$title.$t} --- ${row.gsx$status.$t}</li>`;
        ul.innerHTML = employee;
        // appending the created element
        googleData.appendChild(ul);
    });
};


/* USING A LIBRARY
===================*/
const JSONPlaceholderData = document.getElementById('JSONPlaceholderData');
const fetchJSONPlaceholder = document.getElementById('fetchJSONPlaceholder');

// Event Listener to fetch JSON Data
// fetchJSONPlaceholder.addEventListener('click', fetchJSONData);
/*
// instantiating the EastyHttp2 class
const http = new EasyHttp2();


function fetchJSONData() {
    // calling the get method, passing the API endpoint
    http.get('https://jsonplaceholder.typicode.com/users')
        // processing the data if successful or resolved
        .then(data => renderData(data))
        // error handling if reject
        .catch(err => console.log(err));
};

function renderData(data) {
    data.forEach(data => {
        // creating 'ul' element for each data fetched
        const ul = document.createElement('ul');
        const li = `<li>${data.name} has a username of ${data.username}.</li>`;
        ul.innerHTML = li;
        JSONPlaceholderData.appendChild(ul);
    });
}
*/



// instantiating the EastyHttp2 class
const http = new EasyHttp2();

// creating a new post to add
const newPost = {
    name: "New Name",
    username: "newusername@user.name",
    email: "newemail@noemail.com"
}

// calling the method 'post', passing url and data for the new post
http.post('https://jsonplaceholder.typicode.com/users', newPost)
    .then(data => console.log(data))
    .catch(err => console.log(err));




    