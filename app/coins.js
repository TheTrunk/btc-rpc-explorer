var btc = require("./coins/btc.js");
var ltc = require("./coins/ltc.js");
var bzx = require("./coins/bzx.js");

module.exports = {
	"BTC": btc,
	"LTC": ltc,
	"BZX": bzx,

	"coins":["BTC", "LTC", "BZX"]
};