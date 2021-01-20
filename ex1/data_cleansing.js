var jsonfile = require('jsonfile')

var files = jsonfile.readFileSync("./batismos.json")

for (var i = 0; i < files.length; i++){
    files[i]["_id"] = files[i]["ref"].replace(/\//g, "_"); 
    pai = files[i]["title"].match(/Pai: [^;]*/)
    mae = files[i]["title"].match(/Mãe: [^;]*/)

    //retirar "Pai: ". O nome do pai só começa no índice 5
    files[i]["pai"] = pai[0].substring(5)

    //retirar "Mãe: ". O nome da mãe só começa no índice 5
    files[i]["mae"] = mae[0].substring(5)
}

 
jsonfile.writeFileSync("./batismos_fixed.json",files)