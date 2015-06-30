var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

// define the schema for our drink model
var BeerSchema = new Schema({
	beer: {
	drinkName:  String,
	drinkType:  String,
  	// user:  String,
  	abv:   Number,
  	brand: String,
  	// comments: [{ body: String, date: Date }],
  	date: { type: Date, default: Date.now },
  	meta: {
	    votes: Number, default: 0,
	    favs:  Number, default: 0,
  	}
  }
},  { collection: 'beers' });
// create the model for drinks and expose it to our app
module.exports = { Beer: mongoose.model('Beer', BeerSchema) };
