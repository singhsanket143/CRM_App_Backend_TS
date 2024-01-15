import express , { Express, Request, Response } from 'express';

import ServerConfig from './config/server.config';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app : Express = express();

app.get('/ping', (req: Request, res: Response) => {
    res.json({msg: 'ok'});
})

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server started at PORT: ${ServerConfig.PORT}`);
    const user = await prisma.user.findMany();
    console.log(user);
    console.log("End");
})