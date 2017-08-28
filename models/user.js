const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./../config/database');

//Userschema
const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		require: true
	},
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	}
});

//Here 'User' is Collection's name.
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getallUser = function(){
	User.find().all();
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	const query = {username: username}
	User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
	console.log(newUser);
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if(err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
} 

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	})
}