
const http = new EasyHttp3();
const url = 'https://jsonplaceholder.typicode.com/users';

http.get(url)
    .then(data => console.log(data))
    .catch(err => console.log(err));

const newUser = {
    name: "Brian Dizon",
    username: "bvdizon",
    email: "bvdizon@gmail.com"
};

http.post(url, newUser)
    .then(data => console.log(data))
    .catch(err => console.log(err));

const newData = {
    name: "Brian Dizon",
    username: "bvdizon",
    email: "bvdizon@gmail.com"
};

http.put('https://jsonplaceholder.typicode.com/users/2', newData)
    .then(data => console.log(data))
    .catch(err => console.log(err));

http.delete('https://jsonplaceholder.typicode.com/users/3')
    .then(data => console.log(data))
    .catch(err => console.log(err));


    