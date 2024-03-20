'use client'

import { useEffect, useState } from 'react';

import * as S from './style';

import axios from 'axios';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const CreateCategories = ({ openModal, closeModal }) => {

    const [nome, setNome] = useState();
    const [ notification, setNotification ] = useState({
        open: false,
        message: '',
        severity: ''
    }
    );

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(openModal) {
            setOpen(true);
        }
    }, [openModal])

  
    const handleCloseModal = () => {
      setOpen(false);
      closeModal(false);
    };


    const onChangeValue = (e) => {
        const {name, value} = e.target
        if (name === 'nome') setNome(value)
    }


   const onSubmit =  async (e) => {
    e.preventDefault()
    try {
       const token = localStorage.getItem('token');
       await axios.post('http://localhost:8080/categories', { nome }, {
        headers: {
            'Authorization': ` Bearer ${token}`
        }
        })
        setNotification({
            open: true, 
            message: `Categoria ${nome} criada com sucesso!`,
            severity: 'success'
        })

        handleCloseModal()
    } catch (error) {
        console.log('error');
        setNotification({
            open: true, 
            message: error.response.data.error,
            severity: 'error'
        })
    }
   }
   


   const handleClose = (_, reason) => {
    if(reason === 'clickaway') {
        return;
    }
 
    setNotification(
        {
            open: false,
            message: '',
            severity: ''
        }
    )
   }
    

    return (
        <>

        <S.Snackbar open={ notification.open } autoHideDuration={ 3000 } onClose={ handleClose }>
                <S.Alert onClose={ handleClose } severity={ notification.severity }  variant='filled' sx={{ width: '100%' }}> 
                   { notification.message }
                </S.Alert>
            </S.Snackbar>

        <Dialog open={open} onClose={handleCloseModal}>
            <DialogTitle><div style={{textAlign: 'center', marginBottom: '32px'}}>Nova Categoria</div>
            </DialogTitle>
            <DialogContent>
            <S.Form onSubmit={ onSubmit }>
                <S.TextField name='nome' onChange={ onChangeValue} label='Nome' variant='outlined' color='primary' fullWidth/>
            </S.Form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <S.Button variant="contained" color="primary" type="submit" onClick={onSubmit}>Salvar</S.Button>
            </DialogActions>
      </Dialog>
        </>
    )
}

export default CreateCategories