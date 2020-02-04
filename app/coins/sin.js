var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"SIN",
		multiplier:1,
		default:true,
		values:["", "sin", "SIN"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mSIN",
		multiplier:1000,
		values:["msin"],
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
	name:"SINOVATE",
	ticker:"SIN",
	logoUrl:"/img/logo/SIN.svg",
	siteTitle:"SINOVATE Explorer",
	nodeTitle:"SINOVATE  Full Node",
	nodeUrl:"https://sinovate.io/",
	demoSiteUrl: "https://explorer.sin.zelcore.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 40000000,
	targetBlockTimeSeconds: 15,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"SIN":currencyUnits[0], "mSIN":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "000032bd27c65ec42967b7854a49df222abdfae8d9350a61083af8eab2a25e03",
	genesisCoinbaseTransactionId: "c3555790e3804130514a674f3374b451dce058407dad6b9e82e191e198012680",
	genesisCoinbaseTransaction: {
		"txid":"c3555790e3804130514a674f3374b451dce058407dad6b9e82e191e198012680",
		"hash":"c3555790e3804130514a674f3374b451dce058407dad6b9e82e191e198012680",
		"blockhash":"000032bd27c65ec42967b7854a49df222abdfae8d9350a61083af8eab2a25e03",
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
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/sinovate/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"usd":responseBody[0].price_usd};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(3283) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 210000000);

		return eras[index];
	}
};
