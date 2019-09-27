const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
let dateFormat = require('dateformat');
const {join} = require('path');


const server= express();
const port = 3000;
const {connection} = require('./database.js');
const {homepage} = require('./pages/homepage.js');
const {list} = require ('./pages/list.js');
const {editMovie} = require ('./pages/edit.js');


server.use(bodyParser.json());
server.use(cors());

// ------------- ROUTING ---------------

// FRONT-END FORMS
router.get('/', (req, res) => {
    homepage(res);
})


router.get('/list', (req, res) => {
    connection.connect();
    connection.query(`SELECT * FROM movies`, (error, results) => {
        if(error) throw error;
        // list(res, list);
        res.status(201).send(results);
    })
})

router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    connection.connect();
    connection.query(`SELECT * FROM movies WHERE id=${id}`, (error, result) => {
        if(error) throw error;
        console.log('date :', dateFormat(result[0].date, "yyyy-MM-dd"));
        editMovie(res, result);
    })
})

// BACK-END API
router.post('/download-list', (req, res) => {
    connection.connect();
    connection.query(`SELECT * FROM movies`, (error, results) => {
        if(error) throw error;
        
        let text_file = '';
        let date = new Date();
        let week_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day_idx = date.getDay();
        let day = week_days[day_idx];
        let month = date.getMonth();
        console.log(date, day, month);
        
        results.forEach(data => {
            text_file = text_file + '|' + data.title + ' - ' + data.date;
        });
        console.log(text_file);
        res.status(201).json(results);

        fs.writeFile(`movies/movie_list_${day}_${month}.txt`, text_file, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing the Movie list to File.");
                return console.log(err);
            }    
            console.log("Movie list has been saved."); 
            res.status(201).json(results);
        });
    })
})

router.post('/new-movie', (req, res) => {
    connection.connect();
    connection.query(`INSERT INTO movies (title, date) VALUES ("${req.body.title}", "${req.body.creation_date}")`);

    res.status(201).json(req.body);
})

router.post('/edit-movie/:id', (req, res) => {
    const { id } = req.params;
    
    connection.connect();
    connection.query(`UPDATE movies SET title="${req.body.title}", date="${req.body.creation_date}" WHERE id=${id}`, (error, result) => {
        if(error) throw error;
        res.status(201).json(req.body);
    })
})

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    
    connection.connect();
    connection.query(`DELETE FROM movies WHERE id=${id}`, (error, result) => {
        if(error) throw error;
        res.status(201).send(`Movie with id ${id} has been deleted`);
    })
})



server.use(router);
server.listen(port, () => {
    console.log(`Node Server is running on port ${port}`);
}); 