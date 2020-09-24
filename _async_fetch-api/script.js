// storing the API endpoint in a variable
const apiURL = 'https://jsonplaceholder.typicode.com/users';

// instantiating a EasyHttp2 class
const http = new EasyHttp2();

// GET --- getting the data using the library created
http.get(apiURL)
    .then(data => console.log(data))
    .catch(err => console.log(err));

// POST --- creating a new data
// create a new data
const newData = {
    name: "Brian Dizon",
    username: "bvdizon",
    email: "bvdizon@gmail.com"
};
// adding a new entry to the database
http.post(apiURL, newData)
    .then(data => console.log(data))
    .catch(err => console.log(err));


// PUT --- udpating a post
// updating the values to submit
const updatedData = {
    name: "Brian Dizon",
    username: "bvdizon",
    email: "bvdizon@gmail.com"
};
// url to pass is the endpoint of the data you want to update
http.put("https://jsonplaceholder.typicode.com/users/3", updatedData)
.then(data => console.log(data))
.catch(err => console.log(err));


// DELETE --- deleting data
// url to pass is the endpoint of the data you want to delete
http.delete("https://jsonplaceholder.typicode.com/users/3")
.then((data) => console.log(data))
.catch(err => console.log(err));




