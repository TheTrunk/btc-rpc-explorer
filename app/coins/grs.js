var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"GRS",
		multiplier:1,
		default:true,
		values:["", "grs", "GRS"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mGRS",
		multiplier:1000,
		values:["mgrs"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"Groestlcoin",
	ticker:"GRS",
	logoUrl:"/img/logo/grs.svg",
	siteTitle:"Groestlcoin Explorer",
	nodeTitle:"Groestlcoin Full Node",
	nodeUrl:"https://bitcoinzerox.net/",
	demoSiteUrl: "https://ltc.chaintools.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 40000000,
	targetBlockTimeSeconds: 150,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"GRS":currencyUnits[0], "mGRS":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHashesByNetwork:{
		"main":    "00000ac5927c594d49cc0bdb81759d0da8297eb614683d3acb62f0703b639023"
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":    "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"txid":"3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"hash":"3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"blockhash":"00000ac5927c594d49cc0bdb81759d0da8297eb614683d3acb62f0703b639023",
			"version":1,
			"locktime":0,
			"size":168,
			"vsize":168,
			"time":1395342829,
			"blocktime":1395342829,
			"vin":[
			],
			"vout":[
			]
		}
	},
	historicalData: [
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/groestlcoin/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"usd":responseBody[0].price_usd};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		// https://github.com/Groestlcoin/groestlcoin/blob/master/src/groestlcoin.cpp#L59
		var premine = new Decimal8(240640);
		var genesisBlockReward = new Decimal8(0);
		var minimumSubsidy = new Decimal8(5);
		function GetBlockSubsidy() {
			var nSubsidy = new Decimal8(512);
			// Subsidy is reduced by 6% every 10080 blocks, which will occur approximately every 1 week
			var exponent = Math.floor((blockHeight / 10080));
			for (var i = 0; i < exponent; i++){
					nSubsidy = nSubsidy.times(47);
		    	nSubsidy = nSubsidy.dividedBy(50);
			}
			if (nSubsidy < minimumSubsidy) {
				nSubsidy = minimumSubsidy;
			}
			return nSubsidy;
		}

		function GetBlockSubsidy120000() {
			var nSubsidy = new Decimal8(250);
			// Subsidy is reduced by 10% every day (1440 blocks)
			var exponent = Math.floor(((blockHeight - 120000) / 1440));
			for (var i = 0; i < exponent; i++){
					nSubsidy = nSubsidy.times(45);
		    	nSubsidy = nSubsidy.dividedBy(50);
			}
			if (nSubsidy < minimumSubsidy) {
				nSubsidy = minimumSubsidy;
			}
			return nSubsidy;
		}

		function GetBlockSubsidy150000() {
			var nSubsidy = new Decimal8(25);
			// Subsidy is reduced by 1% every week (10080 blocks)
			var exponent = Math.floor(((blockHeight - 150000) / 10080));
			for (var i = 0; i < exponent; i++){
					nSubsidy = nSubsidy.times(99);
		    	nSubsidy = nSubsidy.dividedBy(100);
			}
			if (nSubsidy < minimumSubsidy) {
				nSubsidy = minimumSubsidy;
			}
			return nSubsidy;
		}

		if (blockHeight == 0) {
			return genesisBlockReward;
		}
		if (blockHeight == 1) {
			return premine;
		}
		if (blockHeight >= 150000) {
			return GetBlockSubsidy150000();
		}
		if (blockHeight >= 120000) {
			return GetBlockSubsidy120000();
		}
		return GetBlockSubsidy();
	}
};