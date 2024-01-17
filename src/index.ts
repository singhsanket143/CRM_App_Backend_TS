import express , { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import ServerConfig from './config/server.config';
import apiRouter from './routes';

const app : Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api', apiRouter);

app.get('/ping', (req: Request, res: Response) => {
    res.json({msg: 'ok'});
})

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server started at PORT: ${ServerConfig.PORT}`);
})