//import
var express = require('express');

var server = express();

server.get('/',function (req,res){
  res.setHeader('Content-Type','text/html');
  res.status(200).send('<h1> Api Test </h1>');
});

function listening(){
  console.log('Server Listen');
};
server.listen(8080, listening());
