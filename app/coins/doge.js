var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"DOGE",
		multiplier:1,
		default:true,
		values:["", "doge", "DOGE"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mDOGE",
		multiplier:1000,
		values:["mdoge"],
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
	name:"Dogecoin",
	ticker:"DOGE",
	logoUrl:"/img/logo/doge.png",
	siteTitle:"Dogecoin Explorer",
	nodeTitle:"Dogecoin Full Node",
	nodeUrl:"https://bitcoinzerox.net/",
	demoSiteUrl: "https://explorer.doge.zelcore.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 40000000,
	targetBlockTimeSeconds: 150,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"DOGE":currencyUnits[0], "mDOGE":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHashesByNetwork:{
		"main":    "1a91e3dace36e2be3bf030a65679fe821aa1d6ef92e7c9902eb318182c355691"
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":    "5b2a3f53f605d62c53e62932dac6925e3d74afa5a4b459745c36d42d0ed26a69"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"txid":"5b2a3f53f605d62c53e62932dac6925e3d74afa5a4b459745c36d42d0ed26a69",
			"hash":"5b2a3f53f605d62c53e62932dac6925e3d74afa5a4b459745c36d42d0ed26a69",
			"blockhash":"1a91e3dace36e2be3bf030a65679fe821aa1d6ef92e7c9902eb318182c355691",
			"version":1,
			"locktime":0,
			"size":0,
			"vsize":0,
			"time":0,
			"blocktime":0,
			"vin":[
				{
				}
			],
			"vout":[
				{
				}
			]
		}
	},
	historicalData: [
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/dogecoin/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"usd":responseBody[0].price_usd};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(75) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 100000);

		return eras[index];
	}
};