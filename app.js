var http = require('http');

var fs = require('fs');
var url = require('url');
var handler = require('./db/dbHandler');
var goodsDao= require("./db/goodsDao");
var render = require("./engine/ido");
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
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

// create server
http.createServer( function (request, response) {  
   // parse request params
   var pathname = url.parse(request.url).pathname;
   
   // output file name
   console.log("Request for " + pathname + " received.");
   
   // read file from file system
   fs.readFile(pathname.substr(1), "utf-8",function (err, data) {
      if (err) {
         console.log(err);
         // HTTP status code : 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP status code: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});


         // response data
         goodsDao.queryGoods(function(err,result){
            if(err){
               console.log('[SELECT ERROR] - ',err.message);
               return;
            }
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');
   //         render.render("",{});
            var dataString = data.toString();

            response.write(dataString.replace(/\{\{name\}\}/g,result[0].name));
            //  send response data
            response.end();
         });


      }
   });
}).listen(8081);


console.log('Server running at http://127.0.0.1:8081/');