var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'teamoshary520',
    database: 'motea'
});


exports.openConnection = function () {
    console.log('connection open');
    connection.connect();
    return connection;
};

exports.getConnection = function () {
    return connection;
}

exports.close = function () {
    connection.end();
    console.log('connection end');
}



