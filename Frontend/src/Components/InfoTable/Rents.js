import React, { useState, useEffect } from 'react'
import TableStyled from '../Table/Table';
import fetchRent from '../../services/rent'

import {limit} from '../../config.json'

export default function Rents(props) {

    const { picker, infoTablePick, totalData, totalPages, ...rest } = props;




    function deleteRent(id){
        props.toastWarn("Alquiler eliminado");
        return fetchRent.del(id);
    }

    function updateRent(id,body){
        props.toastSuccess('Alquiler modificado');
        return fetchRent.update(id,body);
    }

    function addRent(body){
        props.toastSuccess("Alquiler Agregado");
        return fetchRent.post(body);
    }

    const getPage = (page, limit) => {
        return fetchRent.get(page,limit);
    }





    return (
 
            <div style={{ marginTop: "10%" }} >
                <TableStyled
                    handleEmailContent={props.handleEmailContent}
                    data={props.data}
                    clientsData = {props.clients}
                    placesData = {props.places}
                    pricesData = {props.prices}
                    title={"Alquileres"}
                    post={addRent}
                    toastSuccess={props.toastSuccess}
                    delete={deleteRent}
                    update ={updateRent}
                    getPage = {getPage}
                    limit = {limit}
                    picker={picker}
                    infoTablePick={infoTablePick}
                    totalData={totalData}
                    totalPages={totalPages}
                />
            </div>
    )
}