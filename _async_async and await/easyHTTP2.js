class EasyHttp3 {

    async get(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async post(url, newData) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newData)
        });
        const data = await response.json();
        return data;
    }

    async put(url, editData) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(editData)
        });
        const data = await response.json();
        return data;
    }

    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        });
        const data = await 'Resource deleted ...';
        return data;
    }
}


