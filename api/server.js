const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const restrict = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const db = require("../database/dbConfig")
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "keep it secret",
    store: KnexSessionStore({
        knex: db,
        createTable: true
    })
}))

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict(), jokesRouter);

module.exports = server;
