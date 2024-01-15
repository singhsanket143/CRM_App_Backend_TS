import express , { Express, Request, Response } from 'express';

import ServerConfig from './config/server.config';

const app : Express = express();

app.get('/ping', (req: Request, res: Response) => {
    res.json({msg: 'ok'});
})

app.listen(ServerConfig.PORT, () => {
    console.log(`Server started at PORT: ${ServerConfig.PORT}`)
})