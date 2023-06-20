let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

// Modèle de la matière
let MatiereSchema = Schema({
    id: Number,
    nom: String,
    image: String,
    professeur: String
});

MatiereSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('matieres', MatiereSchema);