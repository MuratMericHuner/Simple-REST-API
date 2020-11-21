let app = require("./index.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

describe('Test de notre API', () => {
  describe("GET /", () => {
    it("Retourner le menu", (done) =>{
      chai.request('http://localhost:8080')
        .get('/')
        .end((err, response)=> {
          response.should.have.status(200);
        done();
        })
    })
  })

  describe("GET /all", () => {
    it("Retourner tous les contacts", (done) =>{
      chai.request('http://localhost:8080')
        .get('/all')
        .end((err, response)=> {
          response.should.have.status(200);
        done();
        })
    })
  })

  describe("GET /search/:nom", () => {
    it("Retourner contact par nom", (done) =>{
      const nom = "HUNER";
      chai.request('http://localhost:8080')
        .get('/search/' + nom)
        .end((err, response)=> {
        response.should.have.status(200);
        done();
        })
    })
  })

  describe("POST /add/:nom/:prenom/:tel/:mail?", () => {
    it("Ajouter un nouveau contact", (done) =>{
      const nom = "Ozmen";
      const prenom = "Can";
      const tel = "010101";
      const mail ="gmail";
      chai.request('http://localhost:8080')
        .post('/add/'+nom+"/"+prenom +"/"+tel+"/"+mail)
        .end((err, response)=> {
          response.should.have.status(200);
        done();
        })
    })
  })

  describe("PUT /update/:nom/:prenom/:nnom/:nprenom/:tel/:mail?", () => {
    it("Mettre à jour un contact", (done) =>{
      const nom ="Ozmen";
      const prenom= "Can";
      const nnom = "OZMEN";
      const nprenom = "Can";
      const tel = "010101";
      const mail ="hotmail";
      chai.request('http://localhost:8080')
        .put('/update/'+nom+"/"+prenom+"/"+nnom+"/"+nprenom +"/"+tel+"/"+mail)
        .end((err, response)=> {
          response.should.have.status(200);
        done();
        })
    })
  })

  describe("DELETE /delete/:nom/:prenom", () => {
    it("Supprimer un contact", (done) =>{
      const nom = "OZMEN";
      const prenom = "Can";
      chai.request('http://localhost:8080')
        .delete('/delete/'+nom+"/"+prenom)
        .end((err, response)=> {
          response.should.have.status(200);
        done();
        })
    })
  })
})
