import React, { useState, useEffect, Fragment } from 'react'

import '../../styles/Prices.scss'

import fetchNotification from '../../services/notification'

import { Redirect } from 'react-router-dom';

import Context from '../../Context'

export const Notification = () => {


    const [render, setRender] = useState(false);
    const [schedule, setSchedule] = useState()

    const [hour, setHour] = useState()
    const [minute, setMinute] = useState()
    const [second, setSecond] = useState()

    const handleData = (data) => {
        console.log(data)
        setHour(data[0].hour)
        setMinute(data[0].minute)
        setSecond(data[0].second)
        setSchedule(data[0])
    }

    const handleRender = () => {
        setRender(!render);
    }

    const modifyNotification = () => {

        const body = {
            hour: hour,
            minute: minute,
            second: second
        }

        fetchNotification.modify(JSON.stringify(body), schedule._id)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const clearState = () => {

        setSchedule()
        setRender(false)
    }

    useEffect(() => {

        if (!schedule) {
            fetchNotification.get()
                .then(res => {
                    handleData(res);
                })
                .catch(err => {
                    console.log(err)
                })
        }

        return () => clearState();

    }, [])

    return (
        <Context.Consumer>
            {
                ({ toggleSettings }) => {

                    {
                        if (render) {
                            toggleSettings();
                            return <Redirect to="/logout" />
                        }
                    }

                    return schedule ? (
                        <Fragment>
                            <div className="container-form-settings">
                                <div className='SL-div'>
                                    <a>
                                        <label className="label-select">Hora</label>
                                        <input value={hour} onChange={event => setHour(event.target.value)} />
                                    </a>
                                </div>
                                <div className='SL-div'>
                                    <a>
                                        <label className="label-select">Minuto</label>
                                        <input value={minute} onChange={event => setMinute(event.target.value)} />
                                    </a>
                                </div>
                                <div className='SL-div'>
                                    <a>
                                        <label className="label-select">Segundo</label>
                                        <input value={second} onChange={event => setSecond(event.target.value)} />
                                    </a>
                                </div>
                                <button onClick={modifyNotification}>Guardar</button>
                                <button onClick={handleRender}>Atrás</button>
                            </div>
                        </Fragment>
                    ) : <h2>Espera a que cargue pa, no seas impaciente ndeah</h2>
                }
            }
        </Context.Consumer>
    )
}
