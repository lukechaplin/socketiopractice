//creates the app variable for using express - package that lets us use get/post etc and routes for restful api calls, brackets at end makes express run automatically
const app = require("express")();
//creates a variable that means we have created a server that can handle http requests, passing in app (which is the express package means can use things like GET etc - so using all its functionality and the server can actually do stuff
const http = require("http").createServer(app);
//creates variable that allows us to use socket io package and again linked to http - http passed into it so it can be used (so the server - or more precisely the port the server is listening/running on this what socket io will run on)
//have to use cors, we use something called an options parameter to add in an array of origins for client (front end) so confirm which client ports are allowed to interact with the server port
const io = require("socket.io")(http, {
	cors: { origin: ["http://localhost:3000"] },
});

//this is a function that runs every time front end (client) connects to server and provides a socket instance for each of these connections
//io.on method listening for an emit event from the client (front end) side that was called 'message'
//io.emit method will then take that 'message' event and broadcast that back out to the client (front end} side
io.on("connection", (socket) => {
	socket.on("message", ({ name, message }) => {
		io.emit("message", { name, message });
	});
});

//makes server run on port 4000
http.listen(4000, function () {
	console.log("listening on port 4000");
});
