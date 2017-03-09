export const store = {};

store.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${API}/users?Email=${email}`,
            method: "GET"
        }).then(response => {
            console.log(response.data);
            resolve(response.data)
        }).catch(error => {
            reject(error)
        });
    });
};