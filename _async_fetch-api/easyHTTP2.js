
class EasyHttp2 {
    // no need for constructor for this class

    // getting the data from an API
    get(url) {
        // returning the Object Promise - either resolve or reject        
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(resp => resp.json())
                // if data is fetched successfully
                .then(data => resolve(data))
                // if unable to fetch data 
                .catch(err => reject(err));            
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
    }

    put(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
    }

    delete(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(() => resolve('Resource deleted ...'))
            .catch(err => reject(err));
        });
    }
}




