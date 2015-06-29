var mongoose = require('mongoose');

// define the schema for our drink model
var drinkSchema = mongoose.Schema({

	name:  String,
  	user: String,
  	ingredients:   String,
  	comments: [{ body: String, date: Date }],
  	date: { type: Date, default: Date.now },
  	meta: {
    votes: Number, default: 0,
    favs:  Number, default: 0,
  }

});
// create the model for drinks and expose it to our app
module.exports = mongoose.model('Drink', drinkSchema);