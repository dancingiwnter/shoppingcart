var express = require('express');
var router = express.Router();

router.get ('/', function(req, res)
		{
			return res.render('goodbye', {
				title : 'Fruit Market'
			});
		});


module.exports = router;