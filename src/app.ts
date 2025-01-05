require("dotenv").config();

import express from 'express';
import config from 'config';
import router from './router';
import db from '../config/db';
import Logger from '../config/logger';
import morganMiddleware from './middleware/morganMiddleware';

const app = express();

app.use(express.json());

app.use(morganMiddleware);

const port = config.get<number>('port');

app.use("/api/", router);

app.listen(port, async ()=>{
    await db();
    Logger.info('Aplicação está funcionando na porta: ' + port);
});

