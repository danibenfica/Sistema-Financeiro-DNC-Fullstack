'use client';

import axios from 'axios';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { CreateCategories } from '../../../components/Categories/CreateCategories';
import { CreateMetas } from '../../../components/Metas/CreateMetas';
import { CreateTransacoes } from '../../../components/Transacoes/CreateTransacoes';
import { TransacoesList } from '../../../components/Transacoes/TransacoesList';

export const ExtratoPage = () => {

    const [openModalCategoria, setOpenModalCategoria] = useState(false);
    const [openModalMeta, setOpenModalMeta] = useState(false);
    const [openModalTransacao, setOpenModalTransacao] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }

        axios.get('http://localhost:8080/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(_ => {}).catch(_ => {
            window.location.href = '/login';
        });
    }, []);

    return (
        <>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                onClick={ 
                    () => setOpenModalCategoria(true) }>
                        Nova Categoria
                </Button>

                <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                onClick={ 
                    () => setOpenModalMeta(true) }>
                        Nova Meta
                </Button>

                <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                onClick={ 
                    () => setOpenModalTransacao(true) }>
                        Nova Transacao
                </Button>
            </div>
            <CreateCategories openModal={ openModalCategoria } closeModal={ setOpenModalCategoria } />
            <CreateMetas openModal={ openModalMeta } closeModal={ setOpenModalMeta } />
            <CreateTransacoes openModal={ openModalTransacao } closeModal={ setOpenModalTransacao } />
            <TransacoesList />
        </>
    );
};

export default ExtratoPage;
