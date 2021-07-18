const URL = require('../models');
const shortid = require('shortid');
//post request from form in Home.js
module.exports.makeUrl = (req, res) => {
	//get the url from the form

	let longURL = req.body.longURL;

	//check if the url is in the right format
	var urlRegex =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;

	console.log('checking URL for validity');
	if (!urlRegex.test(longURL)) {
		//send error message if invalid string
		return res.json({ success: false, error: 'Invalid Url' });
	} else {
		//check if the url is in the database already
		console.log('URL is valid');
		console.log('checking if URL already exist in database');
		var findExistingEntry = URL.findOne(
			{ longURL },
			{ longURL: 1, shortURL: 1 },
		).then(function (response) {
			//return the shortened URL if already in collection
			if (response) {
				console.log('already here');
				console.log(response);
				console.log(response.shortURL);
				return res.status(200).json({ success: true, response });
				// return res.send({
				// 	data,
				// });
			} else {
				console.log('did not find URL in database');
				console.log('checking document count');
				//check the short_url count in the database
				var documentCount = URL.find()
					.countDocuments()
					.then((data) => {
						console.log('current document count is: ' + data);
						console.log('making new object from Schema');

						//generate random number 1-100
						var newId = shortid.generate();
						//append doc number to end of newId
						// newId = parseInt('' + newId + data);

						//make the object to store
						var urlToShorten = new URL({
							longURL,
							shortURL: newId,
						});

						console.log('saving new object');

						//save the new object
						urlToShorten.save((err, response) => {
							if (err) {
								console.log('error to databse: ' + err);
								return res
									.status(400)
									.json({ success: false, error: err });
							}
							console.log('success, response is: ' + response);
							return res
								.status(200)
								.json({ success: true, response });
						});
					});
			}
		});
	}
};

//get request to update number of URL made in database
module.exports.getData = (req, res) => {
	console.log('checking database for data');
	URL.find((err, data) => {
		if (err) {
			console.log('error checking databse for data');
			return res.json({ success: false, error: err });
		}

		return res.json(data.length);
	});
};

// Get input from client - Route parameters
module.exports.redirectUrl = (req, res, next) => {
	//check the database for the shortened url
	// console.log(req.params.shortURL);
	var redirect = URL.findOne({
		shortURL: req.params.shortURL,
	}).then(function (data, err) {
		if (err) {
			console.log('got an error: ' + err);
		}
		if (!data) {
			res.send('Invalid URL');
		} else {
			data.clickURL = data.clickURL + 1;
			data.save(function (err, updatedUser) {
				if (err) throw err;

				res.redirect(data.longURL);
			});
		}
	});
};
// /
