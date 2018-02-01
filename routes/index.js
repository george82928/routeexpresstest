var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
	res.status(200).send('OK!');
});
// Homepage/Client
// router.all('/*', function(req, res, next) {
// 	console.log('***********************************');
// 	console.log('send a http request!');
// 	// res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
// 	res.sendFile(path.join(__dirname, '../', '/public', 'index.html'));
// });

module.exports = router;
