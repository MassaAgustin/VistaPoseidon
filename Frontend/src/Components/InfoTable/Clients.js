import React, { useState, useEffect } from 'react'
import TableStyled from '../Table/Table';
import http from '../../services/client'

import {limit} from '../../config.json'

export default function Users(props) {

    const { picker, toggleRenderComponent, totalData, totalPages, ...rest } = props;

    function deleteUser(id){
        props.toastWarn("Cliente eliminado");
        return http.del(id);
    }

    function updateUser(id,body){
        props.toastSuccess('Cliente modificado');
        return http.update(id,body);
    }

    function addUser(body)
    {
        props.toastSuccess("Cliente Añadido");
        return http.post(body);
    }

    const getPage = (page, limit, sortk, order) => {
        return http.get(page,limit, sortk, order);
    }


    return (
  
            <div style={{ marginTop: "10%" }} >
                
                <TableStyled
                    handleEmailContent={props.handleEmailContent}
                    data={props.data}
                    handleData = {props.handleData}
                    title={"Clientes"}
                    toastSuccess={props.toastSuccess}
                    post={addUser}
                    delete={deleteUser}
                    update ={updateUser}
                    getPage = {getPage}
                    limit = {limit}
                    totalData={totalData}
                    totalPages={totalPages}
                />
            </div>
    )
} 