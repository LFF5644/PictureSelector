const wallpaper=require("wallpaper");
const images=require("./imgs.json");

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

changeRandomBackground();
setInterval(changeRandomBackground,1000*60*3);
