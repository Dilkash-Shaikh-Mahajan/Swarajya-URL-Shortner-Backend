const express = require('express');
let router = express();
const { getData, makeUrl, redirectUrl } = require('../controllers');
router.get('/getURLData', getData);
router.post('/makeUrl', makeUrl);
router.get('/:shortURL', redirectUrl);

module.exports = router;
