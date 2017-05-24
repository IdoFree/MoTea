/**
 * Created by Administrator on 2017-05-23.
 */
var ido = require('./ido2');
var app = new ido();
app.get("/",function (req,rsp) {
    rsp.send("hello world");
    console.log('enter path /');
});
app.listen(8080,function () {
    console.log('server listening on 8080');
});
