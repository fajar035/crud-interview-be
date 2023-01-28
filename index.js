require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mainRouter = require('./src/routers/mainRouter');

const server = express();
const host = 'http://localhost:';
const port = process.env.PORT || 8000;
const logger = morgan(
  ':method : url :status :res[content-length] - :response-time ms'
);
const corsOptions = {
  origin: [process.env.HOSTFRONTEND, process.env.HOSTDEPLOYFRONTEND],
  allowedHeaders: ['content-type'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
};
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger);
server.use(mainRouter);
server.listen(port, () => {
  console.log(`Server running at : ${host}${port}`);
});
