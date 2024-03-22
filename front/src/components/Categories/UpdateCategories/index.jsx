'use client';

import { useState, useEffect } from 'react';
import * as S from './style';
import axios from 'axios';

export const UpdateCategories = ({ categoriaId }) => {
    const [ nome, setNome ] = useState();
    const [ userId, setUserId ] = useState();
    const [ notification, setNotification ] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const onChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'nome') setNome(value);
    };

    useEffect(() => {
        const getCategory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/categories/${ categoriaId }`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setNome(response.data.data.nome);
                setUserId(response.data.data.user_id);
            } catch (error) {
                setNotification({
                    open: true,
                    message: error.response.data.message,
                    severity: 'error'
                });
            }
        };
        getCategory();
    }, [ categoriaId ]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/categories/${ categoriaId }`, { nome, user_id: userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNotification({
                open: true,
                message: `Categoria ${ nome } atualizada com sucesso!`,
                severity: 'success'
            });
        } catch (error) {
            setNotification({
                open: true,
                message: error.response.data.error,
                severity: 'error'
            });
        }
    };

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({
            open: false,
            message: '',
            severity: ''
        });
    };

    return (
        <>
            <S.Form onSubmit={ onSubmit }>
                <S.H1>
                    Editar Categoria
                </S.H1>
                <S.TextField 
                    name='nome'
                    onChange={ onChangeValue }
                    label='Nome'
                    variant='outlined'
                    value={ nome }
                    color='primary'
                    fullWidth 
                />
                <S.Button 
                    variant="contained"
                    color="success"
                    type="submit">
                    Enviar
                </S.Button>
            </S.Form>

            <S.Snackbar 
                open={ notification.open }
                autoHideDuration={ 3000 }
                onClose={ handleClose }>
                <S.Alert 
                    onClose={handleClose}
                    severity={notification.severity}
                    variant='filled' 
                    sx={{ width: '100%' }}>
                    { notification.message }
                </S.Alert>
            </S.Snackbar>
        </>
    );
};

export default UpdateCategories;
