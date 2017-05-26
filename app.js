var http = require('http');

var fs = require('fs');
var url = require('url');
var handler = require('./db/dbHandler');
var goodsDao= require("./db/goodsDao");
var ido2 = require("./engine/ido2");
handler.openConnection();


//process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
   if (options.cleanup){
      console.log('clean');
      handler.close();
   }
   if (err) console.log(err.stack);
   if (options.exit){
      process.exit();
   }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:false}));

app.get("/",function(req,rsp.send();){
	rsp.send("home page");
});

var app = ido2();
app.listen(8080,function(){
	console.log('Server running at http://127.0.0.1:8081/');
});