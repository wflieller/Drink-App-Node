var mongoose = require('mongoose');


// define the schema for our drink model
var cocktailSchema = mongoose.Schema({

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

});

// Static method example
cocktailSchema.statics.findById = function(id, cb) {
    return this.findOne({'_id' : id })
    .exec(cb);
};
// create the model for drinks and expose it to our app
module.exports = mongoose.model('Cocktail', cocktailSchema);