var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/:resource', function(req, res, next) {
	var resource = fs.readFileSync('public/' + req.baseUrl.replace(/.*\//, '') + '/' + req.params.resource);
	res.end(resource, 'binary');
});

module.exports = router;