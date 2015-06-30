var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

// define the schema for our cocktail model
var CocktailSchema = new Schema({
	cocktail: {
		drinkName:  String,
		alcType:  String,
	  	// user:  String,
	  	ingredients:   String,
	  	alcLevel:  Number,
	  	// 	comments: [{ body: String, date: Date }],
	  	date: { type: Date, default: Date.now },
	  	meta: {
	    votes: Number, default: 0,
	    favs:  Number, default: 0,
	  }
	}
}, { collection: 'cocktails' });
// create the model for drinks and expose it to our app
module.exports = { Cocktail: mongoose.model('Cocktail', CocktailSchema) };