var http = require("http");
var url = require("url");

function start (route, handle) {
	function onRequest(request, response) {
		console.log("Request received.");
		var pathname =url.parse(request.url).pathname;
		var postData = "";
		console.log("Request for " + pathname + " received.");

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("received POST data chunck '" + postDataChunk + "'.");
		});

		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});


		route(handle, pathname, response);
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started and is listenning on port 8888...");
}

exports.start = start;

