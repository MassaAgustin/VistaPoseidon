import React, { useState, useEffect, Fragment } from 'react'
import '../../styles/Logout.scss'

import fetchUser from '../../services/user'

import { Redirect } from 'react-router-dom';

import Context from '../../Context'

export const Logout = () => {

    const [render, setRender] = useState(false)
    const [welcome, setWelcome] = useState('')

    const handleClick = (event, message, logOut) => {
        const r = confirm(message);
        if (r) {
            logOut();
        }
    }

    const handleRender = (event) => {

        if (event) {
            setRender(true);
        }
    }

    const clearState = () => {

        setRender()
        setWelcome()
    }

    useEffect(() => {

        let tokenUser = localStorage.getItem('x-token');

        fetchUser.getUserByToken(tokenUser)
            .then(res => {
                const user = res.token.email;
                setWelcome('Hola ' + user);
            })
            .catch(err => {
                console.log("Usuario no identificado")
            })

        return () => clearState();
    }, [])



    return (
        <Context.Consumer>
            {
                ({ toggleSettings, logOut, nameRoute, handleRoute }) => {

                    {
                        if (render) {
                            toggleSettings()
                            return <Redirect to={nameRoute} />
                        }
                    }

                    return (<Fragment>
                        <div className="container-head" >
                            {welcome && <h2>{welcome}</h2>}
                        </div>
                        <div className="container-foot" >
                            <button onClick={event => handleClick(event, "Deseas salir?", logOut)}>Cerrar Sesión</button>
                        </div>
                        <div className="container-config" >
                            <h2>Configuraciones</h2>
                            <button 
                                onClick={event => {
                                    handleRoute("/prices")
                                    handleRender(event); 
                                }}>
                                Precio sombrillas
                            </button>
                            <button 
                                onClick={event => {
                                    handleRoute("/notifications")
                                    handleRender(event)
                                }}>
                                Notificaciones
                            </button>
                            <button onClick={event => console.log("Ideas sobre que renderizar")}>Ideas</button>
                        </div>
                    </Fragment>
                    )
                }
            }
        </Context.Consumer>

    )
}


