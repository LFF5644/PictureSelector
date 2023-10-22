const io=require("socket.io-client");

const socket=io("http://localhost:34460");
socket.on("connect",()=>{
	console.log("connected!");
});
socket.on("currentImage",image=>{
	console.log("currentImage is: "+image);
	socket.disconnect();
});
socket.on("disconnect",()=>{
	console.log("connection closed!");
});
