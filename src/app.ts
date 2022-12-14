import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';
import cors from 'cors'; 

const app = express();

import router from './routers/index';
import log from './utils/logger';


app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, '../', 'public')));
app.use('/images', express.static(path.join('C://', 'nabi-app', 'images')));

app.use('/api', router);

app.use((req, res, next) => {
    log.error('No Such a function: ', req);
    res.status(404).json({
        status: false,
        message: 'No Such a function'
    });
});


app.use(errorHandler);

app.listen(2015, () => {
    console.log('server is runing on 2015');
});