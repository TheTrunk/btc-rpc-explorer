var btc = require("./coins/btc.js");
var ltc = require("./coins/ltc.js");
var bzx = require("./coins/bzx.js");
var grs = require("./coins/grs.js");
var doge = require("./coins/doge.js");
var dgb = require("./coins/dgb.js");
var sin = require("./coins/sin.js");
var bth = require("./coins/bth.js");

module.exports = {
	"BTC": btc,
	"LTC": ltc,
	"BZX": bzx,
	"GRS": grs,
	"DOGE": doge,
	"DGB": dgb,
	"SIN": sin,
	"BTH": bth,

	"coins":["BTC", "LTC", "BZX", "GRS", "DOGE", "DGB", "SIN", "BTH"]
};