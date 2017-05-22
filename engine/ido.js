var fs=require("fs");

//<%foreach var item = ${result}%>
var foreach_patt = /<%foreach\s+var\s+item\s*=\s*\$\{([a-zA-Z]+)\}%>([\s\S]*)<%\/foreach%>/g;
var attr_patt = /\$\{\w[a-zA-Z0-9]*\}/g;
exports.Render = Render;

function Render(response,source){
    this.response = response ;
	
	
	
    var render = function(fname,options){
        fs.readFile(fname,function(err,data ){
            if(err) throw  err;
			data = data.toString()
			var matchRst = foreach_patt.exec(data);
			if(matchRst && matchRst.length > 1){
				//get the result set , and continue to retrieve the left String 
				var loopSetName = matchRst[1];
				var loopSet = options[loopSetName];
				var loopString = matchRst[2];
				var attrs = attr_patt.exec(loopString);
				if(attrs){
					//get the attr , and replace it from the resultSet;
					for(var i = 0; i < attrs.length ; i++){
						var attrVal = loopSet[attrs[i]]
						//replace the ${xx}
						data = replace_attr(data,attrs[i],attrVal);
					}
				}
				
				 
			}
			

        });
        this.response.write(data);

        this.response.end();
    }
	
	function replace_attr(data,attr_name,attr_val){
		var specific_attr_patt = "\$\{\s*"+attr_name+"\s*\}";
		specific_attr_patt = new RegExp(specific_attr_patt,"g");
		return data.replace(attr_patt,attr_val);
	}

}


function lexemer(input){
    var token;

}