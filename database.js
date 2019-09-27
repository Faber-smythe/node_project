const mysql = require('mysql');

const connection = mysql.createConnection({
    gist : 'localhost',
    user : 'root',
    password : '',
    database : 'node_project_db',
})

module.exports = {connection} ;