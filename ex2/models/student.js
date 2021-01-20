var mongoose = require('mongoose') //criar um apontador para a instancia criada no app.js

var studentSchema = new mongoose.Schema({
    _id: String,
    date: String,
    title: String,
    ref: String,
    href: String
});

module.exports = mongoose.model('casamento', studentSchema)