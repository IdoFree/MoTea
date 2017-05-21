/**
 * Created by Administrator on 2017-05-21.
 */
var dbHandler = require("./dbHandler");

var  connection = dbHandler.getConnection();

exports.queryGoods = function(callback){

    connection.query('SELECT * from goods', callback);
};

exports.insertGoods = function (params,callback) {
    var sql = "insert into goods(name,price,category) value(?,?,?)";
    connection.query(sql,params,callback);
};

