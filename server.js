const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require ('axios');

const server= express();
const port = 3000;
const {connection} = require('./database.js');
const {homepage} = require('./pages/homepage.js');


server.use(bodyParser.json());
server.use(cors());

// ------------- ROUTING ---------------

// homepage
router.get('/', (req, res) => {
    homepage(res);
})


router.post('/new-movie', (req, res) => {
    console.log(req.body);
    res.status(201).json(req.body);
    
})

router.post('/movie-list', (req, res) => {
    console.log(req.body);
    res.status(201).json(req.body);
})

server.use(router);
server.listen(port, () => {
    console.log(`Node Server is running on port ${port}`);
}); 