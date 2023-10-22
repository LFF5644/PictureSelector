const images=require("./imgs.json");
const socketIo=require("socket.io");
const wallpaper=require("wallpaper");

function randomIndex(max){
	return Math.min(max,Math.floor(Math.random()*max));
}
async function changeRandomBackground(){
	if(imagesToShow.length===0) imagesToShow=images.filter(Boolean);
	const index=randomIndex(imagesToShow.length-1);
	const img=imagesToShow.splice(index,1)[0];
	await wallpaper.set(img);
	return img;
}

let imagesToShow=images.filter(Boolean);
let currentImage=null;

const fn=async ()=>{
	const image=await changeRandomBackground();
	currentImage=image;
	console.log("new image is: "+image);
}

fn();
const time=1000*60*3;
let interval=setInterval(fn,time);

const server=new socketIo.Server(34460);
server.on("connection",client=>{
	const id=client.id;
	console.log("Client Connected! "+id);
	client.emit("currentImage",currentImage);
	client.on("next",async cb=>{
		await fn();
		clearInterval(interval);
		interval=setInterval(fn,time);
		cb(true);
	})
});
