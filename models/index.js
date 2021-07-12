const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
	longURL: {
		type: String,
		required: true,
	},
	shortURL: {
		type: String,
	},
	clickURL: {
		type: Number,
		default: 0,
	},
});
module.exports = mongoose.model('swarajyashortUrl', urlSchema);
