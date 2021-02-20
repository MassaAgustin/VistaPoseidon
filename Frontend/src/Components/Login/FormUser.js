import React, { useState, useEffect } from 'react'
import Context from '../../Context'

import UserForm from './GlobalSession';

import fetchUser from '../../services/user';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastSuccess = (message) => {  //Esto llevarlo a un consumer/provider
    toast.success(message, {
        draggable: true,
        position: toast.POSITION.BOTTOM_RIGHT
    })
}

const toastWarn = (message) => {
    toast.warn(message, {
        draggable: true,
        position: toast.POSITION.BOTTOM_RIGHT
    })
}


export const FormUser = () => {

    const [isLogged, setIsLogged] = useState(false); 

    const checkLogin = (event, email, password, setLoading) => {
        event.preventDefault()
    
        const body = JSON.stringify({
            email: email.value, password: password.value
        })
    
        if(email.value && password.value){
            fetchUser.signIn(body)
            .then(response => {
                if(response.success){
                    const token = response.token;
                    localStorage.setItem('x-token', token)
                    setIsLogged(true)
                    setLoading(false)
                }else{
                    toastWarn(response.message)
                    setIsLogged(false)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    
    const checkRegister = (event, email, password, passwordR) => {
        event.preventDefault()
    
        const body = JSON.stringify({
            email: email.value,password: password.value
        })
    
        if(email.value && password.value){
            fetchUser.signUp(body)
            .then(response => {
                const token = response.token;
                localStorage.setItem('r-token', token)
            })
        }
    }

    useEffect(() => {
        
        return () => setIsLogged()

    }, [])

    return(

    <Context.Consumer>
        {
            ({ isAuth, activateAuth }) => {
                {
                    if(isLogged){
                        activateAuth();
                    }
                }
                return <UserForm onLogin={checkLogin} onRegister={checkRegister} />
            }
        }
    </Context.Consumer>
    )

}