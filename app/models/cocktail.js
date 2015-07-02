var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var User = require('./user.js');


// define the schema for our drink model
var cocktailSchema = new Schema({

	drinkName:  String,
	alcType:  String,
  	user: {type: ObjectId, ref: 'UserSchema'},
  	ingredients:   String,
  	alcLevel:  Number,
  	date: { type: Date, default: Date.now },
    votes: Number, default: 0,
    favs:  Number, default: 0,
});

// Static method example
cocktailSchema.statics.findById = function(id, cb) {
    return this.findOne({'_id' : id })
    .exec(cb);
};
// create the model for drinks and expose it to our app
module.exports = mongoose.model('Cocktail', cocktailSchema);