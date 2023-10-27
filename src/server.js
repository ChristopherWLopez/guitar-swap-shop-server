const express = require('express');

const server = express();

server.get('./home', (_, res) =>res.send('Youre Home!'));


module.exports = {
    server,
};