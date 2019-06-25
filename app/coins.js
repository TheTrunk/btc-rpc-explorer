var btc = require("./coins/btc.js");
var ltc = require("./coins/ltc.js");
var bzx = require("./coins/bzx.js");
var grs = require("./coins/grs.js");
var doge = require("./coins/doge.js");

module.exports = {
	"BTC": btc,
	"LTC": ltc,
	"BZX": bzx,
	"GRS": grs,
	"DOGE": doge
,
	"coins":["BTC", "LTC", "BZX", "GRS", "DOGE"]
};