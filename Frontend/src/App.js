import React, { Component, Fragment } from 'react';

import './styles/loading.scss'

//Internal

import Navigation from './Navigation/Navigation'

import fetchNotification from './services/notification'

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

const isTimeToNotify = async () => {

    const scheduleNotify = new Date()
    const currentDate = new Date()

    return await fetchNotification.get()
        .then(res => {
            scheduleNotify.setHours(res[0].hour)
            scheduleNotify.setMinutes(res[0].minute)
            scheduleNotify.setSeconds(res[0].second)

            const differenceTime = scheduleNotify.getTime() - currentDate.getTime()

            if (differenceTime >= 0)
                return true
            else
                return false
        })
        .catch(err => {
            return false
        })
}

const scheduleNotifyForecastToUsers = () => {

    const body = {
        options: {
            topic: "allDevices",
            icon: "ic_notification_poseidon",
            sound: "fcmsound1",
            forecast: "afternoon"
        }
    }

    isTimeToNotify()
        .then(res => {
            if (res) {
                fetchNotification.setCurrentForecastNotification(JSON.stringify(body))
                    .then(res => {
                        toastSuccess("Notificacion Clima Establecida")
                        console.log(res)
                    })
                    .catch(err => {
                        toastWarn("Error al notificar Clima")
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })



}

//initSetup
scheduleNotifyForecastToUsers()

class App extends Component {

    //Components
    render() {

        return (
            <Navigation />
        );
    }
}

export default App;