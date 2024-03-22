import { Card } from '../Card';
import Grid from '@mui/material/Grid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Panel = () => {
    const [ somatorio, setSomatorio ] = useState({
        total: 0,
        receitas: 0,
        despesas: 0,
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

                const somatorio = {};

                for (const transacao of response.data.data) {
                    if (transacao.tipo === 'Receita') {
                        somatorio.receita = 
                        somatorio.receita ? 
                        somatorio.receita + 
                        transacao.valor : 
                        transacao.valor;
                    }

                    if (transacao.tipo === 'Despesa') {
                        somatorio.despesa = 
                        somatorio.despesa ? 
                        somatorio.despesa + 
                        transacao.valor : 
                        transacao.valor;
                    }
                }

                somatorio.saldo = somatorio.receita - somatorio.despesa;

                setSomatorio(somatorio);

            } catch (_) {}
        };
        getTransacoes();
    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card label="Saldo Atual" valor="R$250">
                        <AccountBalanceWalletIcon />
                    </Card>
                    <Card label="Receitas" valor="R$250">
                        <AccountBalanceWalletIcon />
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card label="Despesas" valor="R$250">
                        <AccountBalanceWalletIcon />
                    </Card>
                    <Card label="Metas" valor="R$ 250">
                        <AccountBalanceWalletIcon />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Panel;
