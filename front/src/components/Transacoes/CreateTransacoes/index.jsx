'use client'

import { useEffect, useState } from 'react';
import * as S from './style';
import axios from 'axios';
import Button from '@mui/material/Button';
import { NumericFormat } from 'react-number-format';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const NumericFormatCustom = (props) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
      prefix="R$ "
    />
  );
};

export const CreateTransacoes = ({ openModal, closeModal }) => {

  const [ descricao, setDescricao ] = useState();
  const [ valor, setValor ] = useState();
  const [ dataTransacao, setDataTransacao ] = useState();
  const [ tipo, setTipo ] = useState('Receita');
  const [ categoria, setCategoria ] = useState('');
  const [ categorias, setCategorias ] = useState([]);

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const [ open, setOpen ] = useState(false);

  useEffect(() => {
    if (openModal) {
      setOpen(true);
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
  };

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/categories/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setCategorias(response.data.data)

      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: 'error'
        })
      }
    }
    getCategorias()
  }, [])


  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'descricao') setDescricao(value)
    if (name === 'valor') setValor(value)
    if (name === 'dataTransacao') setDataTransacao(value)
    if (name === 'tipo') setTipo(value)
    if (name === 'categoria') setCategoria(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/transacoes', {
        descricao,
        valor: valor * 100,
        data: dataTransacao,
        tipo,
        category: categoria
      }, {
        headers: {
          'Authorization': ` Bearer ${token}`
        }
      })
      setNotification({
        open: true,
        message: `Transação ${descricao} criada com sucesso!`,
        severity: 'success'
      })

      handleCloseModal()

    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: 'error'
      })
    }
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
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
      <S.Snackbar
        open={ notification.open }
        autoHideDuration={ 3000 }
        onClose={ handleClose }>

        <S.Alert
          onClose={ handleClose }
          severity={ notification.severity }
          variant="filled"
          sx={{ width: '100%' }}>
          { notification.message }
        </S.Alert>
      </S.Snackbar>

      <Dialog
        open={ open }
        onClose={ handleCloseModal }>
        <DialogTitle>
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            Nova Transação
          </div>
        </DialogTitle>

        <DialogContent>
          <S.Form onSubmit={ onSubmit }>
            <S.TextField
              name='descricao'
              onChange={ onChangeValue }
              label='Descrição'
              variant='outlined'
              color='primary'
              fullWidth />

            <TextField style={{ marginBottom: '20px' }}
              label="Valor"
              onChange={ onChangeValue }
              name="valor"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              variant="outlined"
              fullWidth
            />

            <S.FormControl fullWidth>
              <S.InputLabel id="tipo">Tipo</S.InputLabel>
              <S.Select
                labelId="tipo"
                id="tipo_select"
                name='tipo'
                value={ tipo }
                label="Tipo"
                onChange={ onChangeValue }
              >
                <S.MenuItem value="Despesa">Despesa</S.MenuItem>
                <S.MenuItem value="Receita">Receita</S.MenuItem>
              </S.Select>
            </S.FormControl>
            <S.FormControl fullWidth>
              <S.InputLabel id="categoria">
                Categoria
              </S.InputLabel>
              <S.Select style={{ marginTop: '15px' }}
                labelId="categoria"
                id="categoria_select"
                name="categoria"
                value={ categoria }
                label="Categoria"
                onChange={ onChangeValue }
              >
                {categorias.map(categoria =>
                  <S.MenuItem
                    key={ categoria.id }
                    value={ categoria.id }>
                    { categoria.nome }
                  </S.MenuItem>
                )}
              </S.Select>
            </S.FormControl>

            <div>Data</div>
            <input
              type="date"
              name="dataTransacao"
              value={ dataTransacao }
              onChange={ onChangeValue }
              style={{
                padding: '10px',
                marginTop: '5px',
                marginBottom: '20px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%'
              }}
            />
          </S.Form>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={ handleCloseModal }>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={ onSubmit }>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateTransacoes;
