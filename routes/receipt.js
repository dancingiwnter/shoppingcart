var express = require('express');
var router = express.Router();
var config = require("../config.js");
var priceprocessor = require("../priceprocessor/priceprocessor.js");

router.get ('/', function(req, res)
		{
			var receiptinfo = JSON.parse(JSON.stringify(req.query));

			if(typeof receiptinfo.pricelist == "string"){
				var info = JSON.parse(receiptinfo.pricelist);
				receiptinfo.pricelist = [];
				receiptinfo.pricelist.push(info);
			}
			else{
				for(var i = 0; i < receiptinfo.pricelist.length; i++){
					receiptinfo.pricelist[i] = JSON.parse(receiptinfo.pricelist[i]);
				}
				
			}

			return res.render('receipt', {
				title : 'Fruit Market',
				receiptinfo : receiptinfo
			});
		});


module.exports = router;