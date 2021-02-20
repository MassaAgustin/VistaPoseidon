import React, { useState, useEffect, Fragment } from 'react'

import '../../styles/Prices.scss'

import fetchPrice from '../../services/price'
import fetchTarifa from '../../services/tarifa'

import { Redirect } from 'react-router-dom';

import Context from '../../Context'

export const UmbrellaPrice = () => {


    const [render, setRender] = useState(false);

    const [umbrellas, setUmbrellas] = useState('');
    const [currentUmbrella, setCurrentUmbrella] = useState({ precio: [] });
    const [currentTarifa, setCurrentTarifa] = useState('')

    const [buttonAdd, setButtonAdd] = useState(false);

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [mes, setMes] = useState('')

    const handleData = (data) => {
        setUmbrellas(data);
    }

    const handlePrecio = (event) => {
        setPrecio(event.target.value)
    }

    const handleUmbrella = (index) => {

        setNombre(umbrellas[index].nombre)
        setCurrentUmbrella(umbrellas[index])

        setPrecio(umbrellas[index].precio[0].precio)
    }

    const handleMonth = (index) => {

        setCurrentTarifa(currentUmbrella.precio[index])
        setMes(currentUmbrella.precio[index].diaTope)
        setPrecio(currentUmbrella.precio[index].precio)
    }


    const modifyPrice = () => {

        let id = currentUmbrella._id;
        let body = {
            nombre: nombre
        }

        console.log(nombre)
        console.log(mes)
        console.log(precio)

        fetchPrice.update(id, JSON.stringify(body))  //este update esta al pedo
            .then(res => {
                console.log("Sombrilla modificada: " + res);
                console.log(currentTarifa)
                let id = currentTarifa._id;
                let body = {
                    diaTope: mes, // o poner el del current asi no se puede modificar el mes
                    precio: precio
                }
                fetchTarifa.update(id, JSON.stringify(body))
                    .then(res => {
                        console.log("La tarifa ha sido modificada: " + res)
                    })
                    .catch(err => console.log("No se pudo modificar la tarifa: " + err))

            })
            .catch(err => console.log("No se pudo modificar la sombrilla: " + err))
    }


    const addPrice = () => {

        let body = {
            diaTope: mes,
            precio: precio
        }

        fetchTarifa.post(JSON.stringify(body))
            .then(res => {

                let idTarifa = res._id;
                let body = {
                    nombre: nombre,
                    precio: [idTarifa]
                }
                fetchPrice.update(currentUmbrella._id, JSON.stringify(body))
                    .then(res => {
                        console.log("Tarifa agregada")
                    })
                    .catch(err => console.log("No se pudo agregar la : " + err))

            })
    }

    const toggleButton = () => {
        setButtonAdd(!buttonAdd)
    }

    const handleRender = () => {
        setRender(!render);
    }

    const clearState = () => {

        setUmbrellas()
        setCurrentTarifa()
        setCurrentUmbrella()
        setRender()
        setButtonAdd()

        setNombre()
        setPrecio()
        setMes()
    }

    useEffect(() => {

        if (!umbrellas) {
            fetchPrice.get()
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

                    return umbrellas ? (
                        <Fragment>
                            <div className="container-form-settings">
                                <div className='SL-div'>
                                    <label className="label-select" >Seleccionar sombrilla</label>

                                    <select name="umbrellas" onChange={(event) => handleUmbrella(event.target.value)} title="Elegir Lugar">
                                        <option value="Elegir Lugar" selected disabled >Elegir Lugar</option>
                                        {umbrellas.map((umbrella, index) => {
                                            return <option key={index} value={index}>{umbrella.nombre}</option>
                                        })}
                                    </select>
                                </div>

                                <div className='SL-div'>
                                    <label className="label-select" >Agregar precio por dia?</label>
                                    <input type="checkbox" onChange={toggleButton} />
                                </div>

                                <div className='SL-div'>

                                    <a>
                                        <label className="label-select" >Seleccionar activacion</label>
                                        <select name="month" onChange={event => handleMonth(event.target.value)} title="Elegir Mes">
                                            <option value="Elegir Mes" selected disabled >Elegir Mes</option>
                                            {currentUmbrella.precio.map((precio, index) => {
                                                return <option key={index} value={index}> {precio.diaTope}</option>

                                            })}
                                        </select>
                                    </a>
                                </div>

                                <div className='SL-div'>
                                    {buttonAdd && (
                                        <a>
                                            <label className="label-select" >Dia de activacion</label>
                                            <input value={mes} onChange={event => setMes(event.target.value)} />
                                        </a>
                                    )}
                                </div>

                                <div className='SL-div'>
                                    <label className="label-select" >Precio</label>
                                    <input type="text" value={precio} onChange={event => handlePrecio(event)} />
                                </div>

                                {buttonAdd
                                    ? <button onClick={addPrice}>Añadir Precio</button>
                                    : <button onClick={modifyPrice}>Modificar Precio</button>
                                }

                                <button onClick={handleRender}>Atrás</button>
                            </div>
                        </Fragment>
                    ) : <h2>Espera a que cargue pa, no seas impaciente ndeah</h2>
                }
            }
        </Context.Consumer>
    )
}
