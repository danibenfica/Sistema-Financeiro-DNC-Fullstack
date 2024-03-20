'use client';

import axios from 'axios';

import { useEffect, useState } from "react"; 

import { CreateCategories } from '../../../components/Categories/CreateCategories';
//import UpdateCategories, { CreateCategories } from '../../../components/Categories/UpdateCategories';
//import { CreateMetas } from '../../../components/Metas/CreateMetas';
//import { UpdateMetas } from '../../../components/Metas/UpdateMetas';
//import { CreateTransacoes } from '../../../components/Transacoes/CreateTransacoes';
//import { UpdateTransacoes } from '../../../components/Transacoes/UpdateTransacoes';

export const DashboardPage = () => {

    const [user, setUser] = useState({
        id: null
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            window.location.href = '/login';
        }

        axios.get('http://localhost:8080/users/me', {
            headers: {
                'Authorization': ` Bearer ${token}`
            }
        }).then( response => {
            setUser(response.data.data);
        }).catch(error => {
            window.location.href = '/login';
        })
    }, [])
    return (
        <div>
            <h1>Dashboard</h1>
            {/*<UpdateCategories categoriaId={2}/>*/}
            {/*<CreateMetas/*/}
            {/*<UpdateMetas metaId={ 1 }/>*/}
            {/*<UpdateTransacoes/>*/}
            {/*<CreateTransacoes/*/}
           {/*UpdateTransacoes transacaoId={1}*/}
           {/*<CreateCategories/>*/}
        </div>
    )
}

export default DashboardPage