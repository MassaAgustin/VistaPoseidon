const keyApi = 'https://poseidonrestapi.herokuapp.com/notification';


const get = () => fetch(keyApi)
    .then(res => {
        return res.json()
    })
    .catch(err => {
        return err
    })

const modify = (body,id) => fetch(`${keyApi}/${id}`, {
    method: "PUT",
    body,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
    .then(res => {
        return res.json()
    })
    .catch(err => {
        return err
    })

const setCurrentForecastNotification = (body) => fetch(`${keyApi}/forecastAll`, {
    method: "POST",
    body,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
    .then(res => {
        return res.json()
    })
    .catch(err => {
        return console.log(err)
    })


export default {
    get,
    modify,
    setCurrentForecastNotification
}   