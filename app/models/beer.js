var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

 var User = require('./user.js');

// var User = require('./user.js');

// define the schema for our drink model
var beerSchema = new Schema({

	drinkName:  String,
	drinkType:  String,
  	user: {type: ObjectId, ref: 'UserSchema'},
  	abv:   Number,
  	brand: String,
  	date: { type: Date, default: Date.now },
    votes: Number, default: 0,
    favs:  Number, default: 0,
});

// Static method example
beerSchema.statics.findById = function(id, cb) {
    return this.findOne({'_id' : id })
    .exec(cb);
};

beerSchema.statics.findAll = function(beers, cb) {
    return this.findAll({'beers' : beers})
    .exec(cb);
};

// create the model for drinks and expose it to our app
module.exports = mongoose.model('Beer', beerSchema);
