//import
var express = require('express');
var server = express();
var fs = require('fs');
const PORT = 8080;

var data= fs.readFileSync('Contacts.json');
var contacts = JSON.parse(data);
console.log(contacts);

server.use(express.json());


server.get('/all',findall);
server.get('/', mainmenu);
server.post('/add/:nom/:prenom/:tel/:mail?', addContact);
server.get('/search/:nom', searchContact);
server.put('/update/:nom/:nnom/:prenom/:tel/:mail?', updateContact);
server.delete('/delete/:nom',deleteContact);

function mainmenu(request,response){
  var reply;
  reply = {
    "/all": "Afficher tous les contacts",
    "/search/nom" : "Afficher un contact par nom ",
    "/delete/nom": "Supprimer un contact ",
    "/add/nom/prenom/tel/mail" : "Ajouter un contact ",
    "/update/nom/nouveau nom/prenom/tel/mail": "Mettre à jour un contact "
  }
  response.send(reply);
}

function findall(request,response){
  response.send(contacts);
}

function addContact(request,response){
  var data = request.params;
  contacts.push(data);
  var madata=JSON.stringify(contacts,null,2);
  fs.writeFile('Contacts.json',madata,finished);
  function finished(err){
    console.log('done');
  }
  response.send(contacts);
}

function updateContact(req,res){
var nom =req.params.nom;
let con = contacts.find(con=>con.nom==nom);
con.nom=req.params.nnom;
con.prenom=req.params.prenom;
con.tel=req.params.tel;
con.mail=req.params.mail;
var madata=JSON.stringify(contacts,null,2);
fs.writeFile('Contacts.json',madata,finished);
function finished(err){
  console.log('done');
}
res.send(contacts);
}

function deleteContact(req,res){
  var name = req.params.nom;
  var con = contacts.find(contact => contact.nom===name);
  if(con){
      contacts= contacts.filter((contact)=>contact!==con);
  }
  else {
    res.send("Ce contact n'existe pas");
  }
  var madata=JSON.stringify(contacts,null,2);
  fs.writeFile('Contacts.json',madata,finished);
  function finished(err){
    console.log('done');
  }
  res.send(contacts);
}

function searchContact(request,response){
  var nom = request.params.nom;
  var con= contacts.find(con=> con.nom==nom);
  if(con){
    response.send(con);
  }
  else{
    response.send("Ce contact n'existe pas");
  }
}

function listening(){
  console.log('Server est en marche');
}
server.listen(PORT, listening());
