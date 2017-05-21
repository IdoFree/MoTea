/**
 * Created by Administrator on 2017-05-21.
 */
var fs=require("fs");

//<%foreach var item = ${result}%>
var foreach_patt = /<%foreach\s+var\s+item\s*=\s*\$\{([a-zA-Z]+)\}%>/g;

exports.Render = Render;

function Render(response){
    this.response = response ;
    var render = function(fname,options){
        fs.readFile(fname,function(err,data ){
            if(err) throw  err;

        });
        this.response.write();

        this.response.end();
    }

}


function lexemer(input){
    var token;

}
