const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const postRoutes = require('./routes/posts')
const { rmSync } = require('fs')
server.use('/posts', postRoutes)
server.get('/', (req, res) => res.send("Welcome to telegra.ph"))

module.exports = server