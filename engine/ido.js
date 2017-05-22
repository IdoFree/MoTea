/**
 * Created by Administrator on 2017-05-21.
 */
var fs = require("fs");

//<%foreach var item = ${result}%>
var foreach_patt = /<%foreach\s+var\s+item\s*=\s*\$\{([a-zA-Z]+)\}%>([\s\S]*)<%\/foreach%>/g;
var attr_patt = /\$\{(\w[a-zA-Z0-9]*)\}/g;


exports.render = function (response, fname, options) {
    fs.readFile(fname, function (err, data) {
        if (err) {
            console.log(err);
            // HTTP status code : 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            // HTTP status code: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});

            data = data.toString();
            var matchRst = foreach_patt.exec(data);
            var loopString = matchRst[2];
            var attrs = attr_patt.exec(loopString);

            //for each the data set
            for(var i = 0; i< options.length; i++){
                if(!matchRst){
                    break;
                }
                var obj = options[i];
                if (matchRst && matchRst.length > 1) {
                    //get the result set , and continue to retrieve the left String
                   // var loopSetName = matchRst[1];
                    //var loopSet = obj[loopSetName];

                    if (attrs) {
                        //get the attr , and replace it from the resultSet;
                        for (var j = 1; j < attrs.length; j++) {
                            var attrVal = obj[attrs[j]];
                            if(attrVal){
                                //replace the ${xx}
                                console.log(data);
                                data = _replace_attr(data, attrs[j], attrVal);
                                console.log(data);
                            }
                        }
                    }


                }
            }

            response.write(data);

            response.end();
        }
    });

}

_replace_attr = function (data, attr_name, attr_val) {
    var specific_attr_patt = "\$\{\s*" + attr_name + "\s*\}";
    specific_attr_patt = new RegExp(specific_attr_patt, "g");
    return data.replace(attr_patt, attr_val);
}


