const express = require('express');
let router = express();
const { getData, makeUrl, redirectUrl } = require('../controllers');
const { setContact } = require('../controllers/contactControllers');
router.get('/getURLData', getData);
router.post('/makeUrl', makeUrl);
router.get('/:shortURL', redirectUrl);
router.post('/contact', setContact);

module.exports = router;
