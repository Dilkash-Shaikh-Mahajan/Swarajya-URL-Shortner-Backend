const express = require('express');
const app = express();
const cors = require('cors');
var ip = require('ip');
const routes = require('./routes');
const Routes = require('./routes/index');
const db = require('./config');
db();
require('dotenv').config();
const PORT = process.env.PORT || 5786;
console.log(ip.address());
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type',
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});
app.use(cors());
app.use(express.json());
app.use('/', Routes);
app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
