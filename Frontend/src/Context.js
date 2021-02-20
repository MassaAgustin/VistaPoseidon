import React, { createContext, useState } from 'react'

const Context = createContext()

const Provider = ({ children }) => {
    
    const [isAuth, setIsAuth] = useState(true);
    const [isSettings, setIsSettings] = useState(false);

    const [nameRoute, setNameRoute] = useState('')

    const value = {
        isAuth,
        activateAuth: () => {
            setIsAuth(true)
        },
        logOut: () => {
            setIsAuth(false)
        },
        isSettings,
        toggleSettings: () => {
            setIsSettings(!isSettings)
        },
        nameRoute,
        handleRoute: (name) => {
            setNameRoute(name)
        }
    }

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>

    )
}

export default {
    Provider,
    Consumer: Context.Consumer
}