var mongoose = require('mongoose');

// define the schema for our drink model
var beerSchema = mongoose.Schema({

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
});

// Static method example
beerSchema.statics.findById = function(id) {
    return this.find({'id' : id });
};

// create the model for drinks and expose it to our app
module.exports = mongoose.model('Beer', beerSchema);
