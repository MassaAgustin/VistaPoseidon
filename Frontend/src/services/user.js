
const keyApi = 'https://poseidonrestapi.herokuapp.com/auth';

const signIn = (body) => fetch(`${keyApi}/signin`, {
    method: "POST",
    body,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

})
    .then(res => res.json() )


const signUp = (body) => fetch(`${keyApi}/signup`, {       //Si tratamos a todas las tablas, tanto en update and delete, 
    method: "POST",             //con un id podemos abstraer todo a un solo servicio
    body,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
    .then(res => res.json() )
    .catch(res => res.json() )

const getUserByToken = (token) => fetch(keyApi, {
    method: "GET",
    headers: {
        'x-access-token': token
    }
})
    .then(res => res.json() )


export default {
    signIn,
    signUp,
    getUserByToken
}