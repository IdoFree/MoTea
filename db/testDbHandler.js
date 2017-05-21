/**
 * Created by Administrator on 2017-05-20.
 */
var handler = require("./dbHandler");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('insert data? ',function (answer){
    console.log("enter call back");
    if(answer == "Y"){
        console.log("insert data");
        handler.openConnection();
        var params = ["shuiguo2",12,"水果"];
        handler.insertGoods(params,function(err, result){
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }

            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);
            console.log('INSERT ID:',result);
            console.log('-----------------------------------------------------------------\n\n');
        });

    }else{
        console.log("not insert");
    }
rl.close();


});




