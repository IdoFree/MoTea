/**
 * Created by Administrator on 2017-05-24.
 */

var fs = require("fs");
var http = require('http');
var url = require('url');
var renderEng = require('ido');

//<%foreach var item = ${result}%>
var foreach_patt = /<%foreach\s+var\s+item\s*=\s*\$\{([a-zA-Z]+)\}%>([\s\S]*)<%\/foreach%>/g;
var attr_patt = /\$\{(\w[a-zA-Z0-9]*)\}/g;
var static_patt = /public\/.+/g;
var getMapper = {};



function Ido (){
    console.log("enter constructor");

}
Ido.prototype.get = function(url,callback){
    getMapper[url] = callback;

};

Ido.prototype.listen = function(port,callback){
    if(!port){
        port = 8080;//default port
    }
    http.createServer( function (request, response) {
        //filter the request method to choose what method to use
        console.log(request.headers);
        console.log(request.method);
        console.log(request.rawHeaders);
        console.log(request.url);
        var pathname = url.parse(request.url).pathname;
        if(static_patt.test(request.url)){
            console.log('get static file '+pathname.substr(1))
            //return the static file directly

            handleStaticFile(pathname.substr(1),response);
            return;

        }



        if(request.method == 'GET'){
            var cb = getMapper[request.url];
            if(cb){
                // add a send method for convenient send data;
                response.send = function(data){
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(data);
                };

                response.render = function(fpath,options ){
                    if(options){
						renderEng.render(response,fpath,options);
                    }else{
                        handleStaticFile(fpath,response);

                    }
                };
                cb(request, response) ;
            }else{
                //no such path register in get method
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end("no such path ");
            }

        }

    }).listen(port);
    if(callback instanceof  Function){
        callback();
    }
};

Ido.prototype.handleStaticFile =function (file_path,response){
    fs.readFile(file_path, "utf-8",function(err,data){
        if (err) {
            console.log(err);
            // HTTP status code : 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end("no such path ");
        }else{
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        }


    });



};
module.exports = Ido;