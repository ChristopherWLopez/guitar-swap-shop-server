const express = require('express');
const { useRoutes } = require();
const { authRoutes } = require();

const server = express();

server.get('./home', (_, res)=>res.send('Youre Home!'));
