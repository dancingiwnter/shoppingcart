var express = require('express');
var config = require("../config.js");
var router = express.Router();


var priceprocessor = function(){};
 


var getpricestr = function(price){
	if(config.unit == 'ct'){
		return '$' + price/100;		
	}
};

var getitemprice = function(item, itemnumber, iteminfo){
	if(config.fruits[item].promotion){
		if(config.fruits[item].promotion == "threefortwo"){
			iteminfo.promotion = "-" + Math.floor(itemnumber/3) + 'x' + getpricestr(config.fruits[item].price);
			return config.fruits[item].price * (itemnumber - Math.floor(itemnumber/3));
		} 
	}
	else{
		return config.fruits[item].price * itemnumber;
	}
};


priceprocessor.getpriceinfo = function(){
	var priceinfo = [];
	
	for(item in config.fruits){
		itempriceinfo = {};
		itempriceinfo.name = item;
		itempriceinfo.price = getpricestr(config.fruits[item].price);
		itempriceinfo.promotion = config.fruits[item].promotion;
		if(itempriceinfo.promotion){			
			itempriceinfo.promotion = config.promo_map[itempriceinfo.promotion];
		}
		priceinfo.push(itempriceinfo);
	}
	return priceinfo;	
};

priceprocessor.getreceiptinfo = function(shoppinglist){
	var totalprice = 0;
	var receiptinfo ={};
	receiptinfo.pricelist = []; 
	
	for(item in shoppinglist){
		if(shoppinglist[item] != 0){
			var iteminfo = {
					"name": item,
					"price": shoppinglist[item] + 'x' + getpricestr(config.fruits[item].price)
				};
				totalprice =  totalprice + getitemprice(item, parseInt(shoppinglist[item]), iteminfo);
				receiptinfo.pricelist.push(JSON.stringify(iteminfo));			
		}
		
	}
	if(receiptinfo.pricelist.length > 0){
		receiptinfo.totalprice = getpricestr(totalprice);		
	}
	else{
		receiptinfo = null;
	}

	return receiptinfo;
};

module.exports = priceprocessor;