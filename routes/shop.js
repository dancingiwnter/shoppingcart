var express = require('express');
var querystring = require('querystring');
var router = express.Router();

var priceprocessor = require("../priceprocessor/priceprocessor.js");


var getpriceinfo = function(){
	return priceprocessor.getpriceinfo();
};

var getreceiptinfo = function(shoppinglist){
	delete shoppinglist.submitButton;
	var receiptinfo = priceprocessor.getreceiptinfo(shoppinglist);
	return receiptinfo;
};


router.get ('/', function(req, res)
		{			
			var priceinfo = getpriceinfo();
			return res.render('shop', {
				title : 'Fruit Market',
				groceries: priceinfo
			});
		});

router.post('/', function(req, res) 
		{
			var receiptinfo = getreceiptinfo(req.body);
			if(receiptinfo){
				const query = querystring.stringify(receiptinfo);
				return res.redirect('/shop/receipt/?' + query);				
			}
			else{
				return res.redirect('/shop/goodbye');	
			}
		});

module.exports = router;