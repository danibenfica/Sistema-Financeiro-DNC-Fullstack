import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { NumericFormat } from 'react-number-format';
import * as S from './style';
import axios from 'axios';
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

export const CreateMetas = ({ openModal, closeModal }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataMeta, setDataMeta] = useState('');

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openModal) {
      setOpen(true);
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === 'descricao') setDescricao(value);
    if (name === 'valor') setValor(value);
    if (name === 'dataMeta') setDataMeta(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/metas', { descricao, valor: valor * 100, data: dataMeta }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      setNotification({
        open: true,
        message: `Meta ${descricao} criada com sucesso!`,
        severity: 'success'
      });
      handleCloseModal();
    } catch (error) {
      console.log('error:', error);
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
      <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose}>
        <S.Alert onClose={handleClose} severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
          {notification.message}
        </S.Alert>
      </S.Snackbar>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>Nova Meta</div>
        </DialogTitle>
        <DialogContent>
          <S.Form onSubmit={onSubmit}>
            <TextField name="descricao" onChange={onChangeValue} label="Descrição" variant="outlined" color="primary" fullWidth />
            <TextField
              label="Valor"
              onChange={onChangeValue}
              name="valor"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              variant="outlined"
              fullWidth
            />

            

            {dataMeta}
            <div>Data:</div>
            <input
              type="date"
              name="dataMeta"
              value={dataMeta}
              onChange={onChangeValue}
              style={{ padding: '10px', marginTop: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            />
          </S.Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="contained" color="primary" type="submit" onClick={onSubmit}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateMetas;
