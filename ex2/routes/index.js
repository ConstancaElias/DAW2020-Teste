var express = require('express');
var router = express.Router();
var axios = require('axios')
const app = require('../app');

var api = "http://clav-api.di.uminho.pt/v2/classes"
var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDgxMGM2NDFhYmQ1NDU0MDZkZmRkMSIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJkYXcyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMTE1MDM5NiwiZXhwIjoxNjExMTc5MTk2fQ.ITjWrqFXoWQICWQqoNx91j8zmEjTVule9ZeAZX9q83ARzeShOFqqIG-Zti-E3MC1gv95ulH0IfkDKikfpHb_JEKH8z9H-StIBs-shGGLMhvvojWgLjBHby370JTffp4v1E0XpScMEP3lOp8eI270bSwpMisBn8hfFm5cIr6JMjR34hadRYCW-EPtKWXDiINlePOKXB5L2Kgqb3-Zvj1Tsv3Z5cM4bXVTggg3EgztpxdDx7pkP0-6pODwttHCZqF2nyYNpwL2vvid9TpgQ7wKL4ZxnrhB6lfBSpH7cwrWbLrZDkeX7gd1CD9dkScuTwDp4q2tCksMA8begpoXe3ryRw"

//GET /api/obras
router.get('/', function(req, res){
  var termosIndice = 
  res.render('index', {view: "initial"})
})

router.get('/classes', function(req, res){
  axios.get(api+ '?token='+ token)
    .then(dados=> {
      dados = dados.data
      res.render('index',{view: "classes", lista: dados})
    })
    .catch(erro => res.render('error',{error:erro}))
})

router.get('/classes/:id', function(req, res){
  axios.get(api + '/' + req.params.id + '?token='+ token)
    .then(dados=> {
      dados = dados.data
      res.render('index',{view: "classe", classe: dados, filhos: dados.filhos, nivel: dados.nivel, termos: dados.termosInd})
    })
    .catch(erro => res.render('error',{error:erro}))
})

router.get('/termosIndice', function(req, res){
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token=" + token)
    .then(dados=> {
      dados = dados.data
      res.render('index',{view: "termosIndice", lista: dados})
    })
    .catch(erro => res.render('error',{error:erro}))
})


module.exports = router;
