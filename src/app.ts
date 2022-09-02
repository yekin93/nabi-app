import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';
 
const app = express();

import router from './routers/index';

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '../', 'public')));
app.use('/images', express.static(path.join('C://', 'nabi-app', 'images')));

app.use('/api', router);

app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: 'No Such a function'
    });
});


app.use(errorHandler);

app.listen(2015, () => {
    console.log('server is runing on 2015');
});