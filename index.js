let http = require("http");
let fs = require("fs");
let path = require("path");

// visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types 
// for more MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
	'.jpg': 'image/jpg',	
}

const App = (req, res) => {
	let filePath = "." + req.url; // get the url of request
	if (filePath == "./")  filePath = "./index.html"; // if url == / respond with the index.html

	let fileExt = path.extname(filePath).toString().toLowerCase(); // get the extension of the requested file resource
	let contentType = mimeTypes[fileExt] || "application/octet-stream"; // get MIME type from file extension
	
	//this line is really not necessary, 
	// but because files to be sent are in my a seperate ./public directory
	// this keeps the project/folder structure neat
	let _file =path.join(__dirname, 'public', filePath);

	// read the file using  prepared _file
	fs.readFile(_file, (error, content) => {
		if (error) { // check for errors
			console.log(error);
			let { message } = error; // get error message
			return res.end(message, 'utf-8'); // end response with error message
		}
		
		// no errors
		// respond to the client with the file information
		res.writeHead(200, { 'Content-Type': contentType });
		res.end(content, 'utf-8');
	});

}

//create a server object:
http.createServer(App)
    .listen(3000)
    .on("error", error => {
		console.log('An error occured creating the server');
		console.log(error);
    })
    .on("listening", () => {
        console.log("Server running on port 3000");
    });