var express = require('express');
var router = express.Router();

var Batismos = require("../controllers/batismo")

//GET /api/batismos
router.get('/batismos', function(req,res){
  Batismos.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

//GET /api/batismos/:id
router.get('/batismos/:id', function(req,res){
  Batismos.get()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

//GET /api/batismos/batisado
router.get('/batismos/batisado', function(req,res){
  Batismos.listBatisados()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router;
