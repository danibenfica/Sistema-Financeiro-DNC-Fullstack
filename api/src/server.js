import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import userRouter from './modules/user/user.route.js';
import authRouter from './modules/auth/auth.route.js';
import categoryRouter from './modules/categories/category.route.js';
import metaRouter from './modules/metas/meta.route.js';
import transactionRouter from './modules/transacoes/transacao.route.js';


import bearerToken  from 'express-bearer-token';
const app = express();
app.use(express.json());
app.use(cors());
app.use(bearerToken());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/categories', categoryRouter);
app.use('/metas', metaRouter);
app.use('/transacoes', transactionRouter);



app.get('/health', (_, res) => {
    return res.send('Sistema está Operacional!')
});

app.listen(8080,  async () => {
    console.log('Servidor rodando na porta 8080!');
})