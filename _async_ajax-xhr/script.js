// instantiating the class EasyHTTP
const request1 = new EasyHTTP();

// GET posts --- note that '.get()' method in the EasyHTTP class requires two parameters, the API endpoint and the callback function to handle the requested data
request1.get('https://jsonplaceholder.typicode.com/posts/', function(err, posts) {
    err ? console.log(err) : console.log(JSON.parse(posts));
});

// POST method
const newPost = {
    title: "A new post",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis urna a nibh malesuada bibendum vitae vel augue. Nulla sed felis mattis, aliquam lacus eget, mollis magna. Praesent tellus velit, porttitor et dapibus at, pulvinar nec risus. Sed vel euismod lacus, eu semper augue. Ut eget fringilla sem, et mattis ipsum. Cras tincidunt ultricies nulla. Sed ac dictum dolor. Quisque semper, leo at commodo faucibus, dui risus gravida est, vel pulvinar est lorem vitae diam. Praesent sagittis, purus ac posuere facilisis, mi ante finibus diam, in aliquet orci lacus nec libero. Sed at ipsum et magna semper consectetur. Sed id ultricies lectus, vel vulputate lorem. Ut sed eros nec tortor consequat convallis. In eget nibh eu augue aliquam facilisis. Aliquam hendrerit a dolor id ultricies."       
}

request1.add('https://jsonplaceholder.typicode.com/posts', newPost, function(err, post) {
    err ? console.log(err) : console.log(post);
});


// PUT method
const updatePost = {
    title: "Super New Updated Post",
    body: "Super new updated content --- Sed ac dictum dolor. Quisque semper, leo at commodo faucibus, dui risus gravida est, vel pulvinar est lorem vitae diam. Praesent sagittis, purus ac posuere facilisis, mi ante finibus diam, in aliquet orci lacus nec libero. Sed at ipsum et magna semper consectetur. Sed id ultricies lectus, vel vulputate lorem. Ut sed eros nec tortor consequat convallis. In eget nibh eu augue aliquam facilisis. Aliquam hendrerit a dolor id ultricies."       
}
request1.edit('https://jsonplaceholder.typicode.com/posts/1', updatePost, function(err, post) {
    err ? console.log(err) : console.log(post);
});


// DELETE method
request1.del('https://jsonplaceholder.typicode.com/posts/2', function(err, response) {
    err ? console.log(err) : console.log(response);
});

