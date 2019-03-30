var btc = require("./coins/btc.js");
var ltc = require("./coins/ltc.js");
var bzx = require("./coins/bzx.js");
var grs = require("./coins/grs.js");

module.exports = {
	"BTC": btc,
	"LTC": ltc,
	"BZX": bzx,
	"GRS": grs
,
	"coins":["BTC", "LTC", "BZX", "GRS"]
};