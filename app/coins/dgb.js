var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"DOGE",
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
];

module.exports = {
	name:"Digibyte",
	ticker:"DGB",
	logoUrl:"/img/logo/dgb.png",
	siteTitle:"Digibyte Explorer",
	nodeTitle:"Digibyte Full Node",
	nodeUrl:"https://digibyte.io/",
	demoSiteUrl: "https://explorer.dgb.zelcore.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 40000000,
	targetBlockTimeSeconds: 15,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"DGB":currencyUnits[0], "mDGB":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "7497ea1b465eb39f1c8f507bc877078fe016d6fcb6dfad3a64c98dcc6e1e8496",
	genesisCoinbaseTransactionId: "72ddd9496b004221ed0557358846d9248ecd4c440ebd28ed901efc18757d0fad",
	genesisCoinbaseTransaction: {
		"txid":"72ddd9496b004221ed0557358846d9248ecd4c440ebd28ed901efc18757d0fad",
		"hash":"72ddd9496b004221ed0557358846d9248ecd4c440ebd28ed901efc18757d0fad",
		"blockhash":"7497ea1b465eb39f1c8f507bc877078fe016d6fcb6dfad3a64c98dcc6e1e8496",
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
	},
	historicalData: [
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/digibyte/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"usd":responseBody[0].price_usd};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(8000) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 100000);

		return eras[index];
	}
};