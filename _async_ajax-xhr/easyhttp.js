
function EasyHTTP() {
    this.http = new XMLHttpRequest();
}

/*============== GET POSTS Method ==============*/
// 'callback' parameter is added here to make this function async
EasyHTTP.prototype.get = function(url, callback) {
    this.http.open('GET', url, true);
    // must capture 'this' keyword to another variable to be able to use it inside a function nested in another function. This is due to the reason that inside a function, 'this' refers to that function. Arrow function resolves this as it is using a lexical 'this'
    let self = this;
    this.http.onload = function() {                
        // the data we get from API is passed on as an argument to a function callback. you can call it whatever you like, as long as you pass a function when you call this method or prototype '.get'
        self.http.status === 200 ? callback(null, self.http.responseText) : callback('Error: ' + self.http.status);
    }
    this.http.send();
}

/*============== POST Method ==============*/
EasyHTTP.prototype.add = function(url, data, callback) {
    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    let self = this;
    this.http.onload = function() {
        callback(null, self.http.responseText);
    }

    this.http.send(JSON.stringify(data))
}


/*============== PUT Method ==============*/
EasyHTTP.prototype.edit = function(url, data, callback) {
    this.http.open('PUT', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    let self = this;
    this.http.onload = function() {
        callback(null, self.http.responseText);
    }

    this.http.send(JSON.stringify(data))
}


/*============== DELETE Method ==============*/
EasyHTTP.prototype.del = function(url, callback) {
    this.http.open('DELETE', url, true);
    let self = this;
    this.http.onload = function() {                
        self.http.status === 200 ? callback(null, 'Post deleted') : callback('Error: ' + self.http.status);
    }
    this.http.send();
}




