var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"BZX",
		name:"BTC",
		multiplier:1,
		default:true,
		values:["", "bzx", "BZX"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mBZX",
		multiplier:1000,
		values:["mbzx"],
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
	name:"Bitcoin Zero",
	ticker:"BZX",
	logoUrl:"/img/logo/bzx.svg",
	siteTitle:"Bitcoin Zero Explorer",
	nodeTitle:"Bitcoin Zero Full Node",
	nodeUrl:"https://bitcoinzerox.net/",
	demoSiteUrl: "https://ltc.chaintools.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 4000000,
	targetBlockTimeSeconds: 150,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"BZX":currencyUnits[0], "mBZX":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "322bad477efb4b33fa4b1f0b2861eaf543c61068da9898a95062fdb02ada486f",
	genesisCoinbaseTransactionId: "31f49b23f8a1185f85a6a6972446e72a86d50ca0e3b3ffe217d0c2fea30473db",
	genesisCoinbaseTransaction: {
		"txid":"31f49b23f8a1185f85a6a6972446e72a86d50ca0e3b3ffe217d0c2fea30473db",
		"hash":"31f49b23f8a1185f85a6a6972446e72a86d50ca0e3b3ffe217d0c2fea30473db",
		"blockhash":"322bad477efb4b33fa4b1f0b2861eaf543c61068da9898a95062fdb02ada486f",
		"version":2,
		"locktime":0,
		"size":168,
		"vsize":168,
		"time":1485785935,
		"blocktime":1485785935,
		"vin":[
			{
				"prev_out":{
					"hash":"0000000000000000000000000000000000000000000000000000000000000000",
					"n":4294967295
				},
				"coinbase":"04ffff001d0104404e592054696d65732030352f4f63742f32303131205374657665204a6f62732c204170706c65e280997320566973696f6e6172792c2044696573206174203536"
			}
		],
		"vout":[
			{
				"value":"50.00000000",
				"n":0,
				"scriptPubKey":{
					"hex":"040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9 OP_CHECKSIG",
					"type":"pubkey",
					"reqSigs":1,
					"addresses":[
						"Ler4HNAEfwYhBmGXcFP2Po1NpRUEiK8km2"
					]
				}
			}
		]
	},
	historicalData: [
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/bitcoin-zero/",
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

		var index = Math.floor(blockHeight / 840000);

		return eras[index];
	}
};