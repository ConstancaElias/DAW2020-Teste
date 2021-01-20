//Batismo controller

var Batismo = require('../models/batismo')

// Devolve a lista dos Batismos com os campos: date, title e ref
module.exports.list = () => {
    return Batismo
            .find({},{date:1,title:1,ref:1})
            .exec()
}

// Devolve apenas uma lista com os nomes dos batisados
module.exports.listBatisados = nome =>{
    return Batismo
            .aggregate([
              { $addFields: {
                  "batisado": { $regexFind: { input: "$title", regex: ".*?" } }
               }
              }, 
               {$group: {
                _id: "$_id",
                Batisados: {
                  $addToSet: { batisado: "$batisado"},
                }
              }}, {$sort: {
                batisado: 1
              }}]).exec();
}

// Devolve a lista de Batismos realizados no ano YYYY
module.exports.listporAno = ano =>{
    return Batismo
            .find({date :{$regex: ano}})
            .exec()
}

// Devolve a informação completa de um Batismo
module.exports.get = id =>{
    return Batismo
            .find({_id: id})
            .exec()
}