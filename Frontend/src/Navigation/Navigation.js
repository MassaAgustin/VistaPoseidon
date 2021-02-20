import React, { Fragment, useState, useEffect } from 'react'

//Internal
import Estadisticas from '../Components/InfoTable/Estadisticas'

import { page, limit } from '../config.json'

//Tablas
import Clients from '../Components/InfoTable/Clients'
import Rents from '../Components/InfoTable/Rents'
import { Espacio } from '../Components/Espacio/Espacio';
import Ingresos from '../Components/InfoTable/Ingresos'
import Egresos from '../Components/InfoTable/Egresos'

//Formularios
import { FormUser } from '../Components/Login/FormUser';
import { Logout } from '../Components/Logout/Logout'
import { EmailForm } from '../Components/Email/EmailForm'

import Slidebar from '../Components/Animations/Slidebar'
import { UmbrellaPrice } from '../Components/Config/UmbrellaPrice';
import { Notification } from '../Components/Config/Notification';

import Context from '../Context'

//Services

import clientFetch from '../services/client'
import egresoFetch from '../services/egreso'

import ingresoFetch from '../services/ingreso'

import placeFetch from '../services/place'
import rentFetch from '../services/rent'
import priceFetch from '../services/price'

//External
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Navigation() {

    const [emailContent, setEmailContent] = useState('')

    const [clientData, setClientData] = useState({});
    
    const [egresoData, setEgresoData] = useState([{
        ['descripcion']: 'vacio',
        ['total']: 'vacio',
        ['deuda']: 'vacio',
        ['fecha_creacion']: 'vacio'
    }]);

    const [egresoParcialData, setEgresoParcialData] = useState([{
        parciales: []
    }]);

    const [ingresoData, setIngresoData] = useState([{
        ['descripcion']: 'vacio',
        ['total']: 'vacio',
        ['deuda']: 'vacio',
        ['fecha_creacion']: 'vacio'
    }]);

    const [ingresoPages, setIngresoPages] = useState()
    const [ingresoTotalData, setIngresoTotalData] = useState()
    

    const [ingresoParcialData, setIngresoParcialData] = useState([{
        parciales: []
    }]);

    const [placeData, setPlaceData] = useState({});
    const [placeDataMain, setPlaceDataMain] = useState({})

    const [rentData, setRentData] = useState([{
        ['fecha_inicial']: 'vacio',
        ['fecha_final']: 'vacio',
        ['cliente']: 'vacio',
        ['lugar']: 'vacio'
    }]);

    const [priceData, setPriceData] = useState({});


    const [loadIngresoP, setLoadIngresoP] = useState(true);
    const [loadIngreso, setLoadIngreso] = useState(true);

    const [loadEgresoP, setLoadEgresoP] = useState(true);
    const [loadEgreso, setLoadEgreso] = useState(true);

    const [loadRent, setLoadRent] = useState(true);
    const [loadClient, setLoadClient] = useState(true);
    const [loadPlace, setLoadPlace] = useState(true);
    const [loadPrice, setLoadPrice] = useState(true);
    const [loadPlaceMain, setLoadPlaceMain] = useState(true)

    function EmailFormConf() {
        return <EmailForm body={emailContent} />
    }

    function EspacioConf() {
        return (
            <div className="total">
                <Espacio places={placeDataMain} prices = {priceData} clients = {clientData}/>
            </div>
        )
    }

    const ClientConf = () => {
        
        return (
            <div className="total">
                <Clients
                    toastSuccess={toastSuccess}
                    toastWarn={toastWarn}
                    handleEmailContent={handleEmailContent}
                    picker={false}
                    data = {clientData.response}
                    handleData = {setClientData}
                    totalData ={clientData.totalData}
                    totalPages={clientData.totalPages}
                />
            </div>
        )
    }


    function RentConf() {
        return (
            <div className="total">
                <Rents
                    toastSuccess={toastSuccess}
                    handleEmailContent={handleEmailContent}
                    toastWarn={toastWarn}
                    picker={false}
                    data = {rentData.response}
                    handleData = {setRentData}
                    handleIngresoData = {setIngresoData}
                    clients = {clientData.response}
                    places = {placeData}
                    prices = {priceData}
                    totalData ={rentData.totalData}
                    totalPages={rentData.totalPages}
                />
            </div>
        )
    }

    const handleParcialData = (index, newRowParcial) => {

    }

    

    function IngresoConf() {
        return (
            <div className="total">
                <Ingresos
                    toastSuccess={toastSuccess}
                    toastWarn={toastWarn}
                    handleEmailContent={handleEmailContent}
                    handleData={setIngresoData}
                    handleParcialData = {handleParcialData}
                    data = {ingresoData}
                    parcialesData = {ingresoParcialData}
                    totalData ={ingresoTotalData}
                    totalPages={ingresoPages}
                />
            </div>
        )

    }

    function EgresoConf() {
        return (
            <div className="total">
                <Egresos
                    toastSuccess={toastSuccess}
                    toastWarn={toastWarn}
                    handleEmailContent={handleEmailContent}
                    data={egresoData}
                    parcialesData={egresoParcialData}
                />
            </div>
        )
    }
    function EstadisticasConf() {
        return (
            <div className="total">
                <Estadisticas
                clientData = {clientData.response}
                rentData = {rentData.response}
                ingresoData = {ingresoParcialData}
                egresoData = {egresoParcialData}
                priceData= {priceData}
                />
            </div>
        )
    }

    const handleEmailContent = (body) => {
        setEmailContent(body);
    }

    const toastSuccess = (message) => {  //Esto llevarlo a un consumer/provider
        toast.success(message, {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT
        })
    }

    const toastWarn = (message) => {
        toast.warn(message, {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT
        })
    }

    const comparePlaces = (a, b) => { //Extrae los 3 digitos xxx del tipo lugar para compararlos
        const first = a.tipo.substring(a.tipo.length - 3, a.tipo.length)
        const second = b.tipo.substring(b.tipo.length - 3, b.tipo.length)
        return first - second;
    }

    const clearState = () => {
        setClientData()
        setLoadClient()

        setEgresoData()
        setEgresoParcialData()
        setLoadEgresoP()
        setLoadEgreso()

        setIngresoData()
        setIngresoParcialData()
        setIngresoPages()
        setIngresoTotalData()
        setLoadIngresoP()
        setLoadIngreso()

        setPlaceData() 
        setLoadPlace()
        setPlaceDataMain()
        setLoadPlaceMain()

        setRentData()
        setLoadRent()

        setPriceData()
        setLoadPrice()
    }

    const chooseComponent = (nameRoute) => {
        switch (nameRoute) {
            case "/prices": {
                return <UmbrellaPrice />
            }
            break;
        
            case "/notifications": {
                return <Notification />
            }
            break;
            case "/sendemail": {
                return EmailFormConf()
            }
            break;

            default: 
                console.log("falta especificar la ruta")
            break;
        }
    }
  
    useEffect(() => {

        clientFetch.get(page,limit).then(clients => { 
            setClientData(clients)
            setLoadClient(false) 
        })

        egresoFetch.get(page,limit)
        .then(egresos => {
            if (egresos[0].length){
                setEgresoData(egresos[0])
                setEgresoParcialData(egresos[1])  
            }
            setLoadEgresoP(false)
            setLoadEgreso(false)
        })

        ingresoFetch.get(page,limit)
        .then(ingresos => {
            if(ingresos.response[0].length){
                setIngresoData(ingresos.response[0])
                setIngresoParcialData(ingresos.response[1])
                setIngresoPages(ingresos.totalPages)
                setIngresoTotalData(ingresos.totalData)
            }
            setLoadIngresoP(false)
            setLoadIngreso(false) 
        })

        placeFetch.get()
        .then(data => { 
            
            data.sort( (a,b) => comparePlaces(a,b) ) //ordena las sombrillas ascendentemente
            
            setPlaceData(data)
            setLoadPlace(false) 
        })

        placeFetch.getViewMain()
        .then(data => {
            setPlaceDataMain(data)
            setLoadPlaceMain(false)
        })

        rentFetch.get(page,limit).then(rents => {
            if(rents.response.length){
                setRentData(rents)
            }
            setLoadRent(false)
        })

        priceFetch.get().then(data => { 
            setPriceData(data)
            setLoadPrice(false) 
        })

        return () => clearState()

    }, [])
    
    return ((loadPlace || loadRent || loadIngreso || loadIngresoP || loadEgreso || loadEgresoP ||loadPrice || loadClient || loadPlaceMain) ? (
        <div className="total" >
        <div className="loading" >
            <span>cargando...</span>
        </div>
        </div>
    )
        :
        <Router onUpdate={() => window.scrollTo(0, 0)}>
            <Slidebar />
            <ToastContainer />
            <Context.Consumer>
            {
                ({ isAuth, isSettings, nameRoute }) =>
                    isAuth ? (

                        <Fragment>
                            <Route exact path="/" component={EspacioConf} />
                            <Route path="/clients" component={ClientConf} />
                            <Route path="/rents" component={RentConf} />
                            <Route path="/ingresos" component={IngresoConf} />
                            <Route path="/egresos" component={EgresoConf} />
                            <Route path='/estadisticas' component={EstadisticasConf} />
                            <Route exact path="/logout" component={Logout} />
                            {isSettings && 
                                <Route path={nameRoute}>
                                    {chooseComponent(nameRoute)} {/* //Dynamic Route for settings */}
                                </Route> 
                            } 
                            <Redirect to="/" />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Redirect to="/login" />
                            <Route path="/login" component={FormUser} />
                        </Fragment>
                        )
            }</Context.Consumer>

        </Router>
    )
}



