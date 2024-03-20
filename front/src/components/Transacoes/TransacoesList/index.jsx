import * as S from './style';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { compareAsc } from 'date-fns';

export const TransacoesList = () => {
    const [transacoes, setTransacoes] = useState([]);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: ''
    });

    useEffect(() => {
        const getTransacoes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/transacoes/`, {
                   headers: {
                       Authorization: `Bearer ${token}`
                   }
                });
                setTransacoes(response.data.data);
            } catch (error) {
                setNotification({
                    open: true, 
                    message: error.response.data.message,
                    severity: 'error'
                });
            }
        };
        getTransacoes();
    }, []); 

    return (
        <S.TableContainer component={S.Paper} style={{marginTop: '20px'}}>
            <S.Table sx={{ minWidth: 650 }} aria-label="simple table">
                <S.TableHead>
                    <S.TableRow>
                        <S.TableCell>Descrição</S.TableCell>
                        <S.TableCell align="right">Transação</S.TableCell>
                        <S.TableCell align="right">Data</S.TableCell>
                        <S.TableCell align="right">Situação</S.TableCell>
                        <S.TableCell align="right">Valor</S.TableCell>
                    </S.TableRow>
                </S.TableHead>
                <S.TableBody>
                    {transacoes.map((transacao) => (
                        <S.TableRow
                            key={transacao.descricao}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <S.TableCell component="th" scope="row">
                                {transacao.descricao}
                            </S.TableCell>
                            <S.TableCell align="right">{transacao.tipo}</S.TableCell>
                            <S.TableCell align="right">
                                {transacao.data ? new Intl.DateTimeFormat('pt-BR', 
                                { day: 'numeric', month: 'short', year: 'numeric' }
                                ).format(new Date(transacao.data)) : ''}
                            </S.TableCell>
                            <S.TableCell align="right">{compareAsc(new Date(), new Date(transacao.data)) === 1 ? 'Realizada' : 'Planejada'}</S.TableCell>
                            <S.TableCell align="right">{transacao.valor}</S.TableCell>
                        </S.TableRow>
                    ))}
                </S.TableBody>
            </S.Table>
        </S.TableContainer>
    );
};

export default TransacoesList;
