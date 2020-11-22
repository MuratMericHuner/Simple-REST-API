//imports
var express = require('express');// on utilise express pour faciliter les fonctionnalités API
var server = express();
var fs = require('fs'); // on utilise un fichier json pour sauvegarder les contacts donc on as besoin de fs de nodejs
const PORT = 8080; // on utilise le port 8080 localhost

var data= fs.readFileSync('Contacts.json');// on ouvre notre fichier contact
var contacts = JSON.parse(data);// on le parse pour pouvoir le modifier
server.use(express.json());

// les routes qu'on utilise pour gérer nos contacts .get c'est pour chercher, .post pour ajouter, .put pour mettre à jour et .delete pour supprimer
server.get('/all',findall);
server.get('/', mainmenu);
server.post('/add/:nom/:prenom/:tel/:mail?', addContact);
server.get('/search/:nom', searchContact);
server.put('/update/:nom/:prenom/:nnom/:nprenom/:tel/:mail?', updateContact);
server.delete('/delete/:nom/:prenom',deleteContact);

// notre menu principale, ce qu'on va voir quand on va lancer le serveur.
function mainmenu(request,response){
  var reply;
  reply = {
    "/all": "Afficher tous les contacts",
    "/search/nom" : "Afficher un contact par nom ",
    "/delete/nom/prenom": "Supprimer un contact ",
    "/add/nom/prenom/tel/mail" : "Ajouter un contact ",
    "/update/nom/prenom/nouveau nom/nouveau prenom/tel/mail": "Mettre à jour un contact "
  }
  response.send(reply);
}
// La méthode pour afficher tous les contacts
function findall(request,response){
  response.send(contacts);
}
//la méthode pour ajouter un contact, la variable data prend les données saisies dans l'url et on la sauvegarde dans le fichier contact aprés
function addContact(request,response){
  var data = request.params;
  contacts.push(data);
  //on transforme contact en string pour pourvoir l'écrire dans le fichier json
  var madata=JSON.stringify(contacts,null,2);
  fs.writeFile('Contacts.json',madata,finished);
  function finished(err){
    console.log('Ajouté');
  }
  response.send(contacts);
}
//La méthode pour mettre à jour un contact
function updateContact(req,res){
//on trouve le contact qu'on veut modifier par son nom et prenom écris dans l'url
var nom =req.params.nom;
var prenom = req.params.prenom;
var con = contacts.find((con => con.nom===name) && (con => con.prenom===prenom));
//et on le met à jour avec le nouveau nom, prenom et numéro de télephone saisis dans l'url. Le mail est optionnel.
con.nom=req.params.nnom;
con.prenom=req.params.nprenom;
con.tel=req.params.tel;
con.mail=req.params.mail;
//on transforme contact en string pour pourvoir l'écrire dans le fichier json
var madata=JSON.stringify(contacts,null,2);
fs.writeFile('Contacts.json',madata,finished);
function finished(err){
  console.log('Mis à jour');
}
res.send(contacts);
}
//La méthode pour supprimer un contact
function deleteContact(req,res){
  // on trouve le contact par son nom et prenom
  var name = req.params.nom;
  var prenom = req.params.prenom
  var con = contacts.find((contact => contact.nom===name) && (contact => contact.prenom===prenom));
  if(con){
    // on met à jour les contacts en filtrant(enlévant) le contact qu'on ne veut plus
      contacts= contacts.filter((contact)=>contact!==con);
  }
  else {
    res.send("Ce contact n'existe pas");
  }
  //on transforme contact en string pour pourvoir l'écrire dans le fichier json
  var madata=JSON.stringify(contacts,null,2);
  fs.writeFile('Contacts.json',madata,finished);
  function finished(err){
    console.log('Supprimé');
  }
  res.send(contacts);
}
//La méthode pour chercher un contact précis
function searchContact(request,response){
  // on cherche le contact qu'on veut trouver par son nom
  var nom = request.params.nom;
  var con= contacts.find(con=> con.nom==nom);
  if(con){
    response.send(con);
  }
  else{
    response.send("Ce contact n'existe pas");
  }
}
//on démarre le serveur dans le port 8080
function listening(){
  console.log('Server est en marche');
}
server.listen(PORT, listening());
