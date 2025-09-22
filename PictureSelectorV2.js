//const fetch=require("node-fetch");
const fs=require("fs");
const os=require("os");
const wallpaper=require("wallpaper");

const INTERVAL_CHECK=60e3*5; // fetch every 5 min.
const URL_API_INFO="https://lff.one/web/pictureSelector/info.api";
const URL_API_IMAGE="https://lff.one/web/pictureSelector/image.api";
const TMP_FOLDER=os.tmpdir()+"/PictureSelector/";
const SYSTEM=os.type();
const ICON="./sysTray."+(SYSTEM==="Windows_NT"?"ico":"png");

let default_wallpaper=null;
let exit=false;
let img_current=0;
let img_get_next=0;
let lastFetch=0;
let systemTray=undefined;
let timeout_changeWallpaper=0;
let interval_check=0;
let tray=null;


try{
	systemTray=require("systray");
}catch(e){
	console.log("cant load module 'systray' maybe not installed or we on ANDROID?");
	console.log("require error message:",e);
}

// for old node versions
async function readFileAsync(...args){return new Promise((resolve,reject)=>{
	fs.readFile(...args,(error,data)=>{
		if(error) reject(error);
		else resolve(data);
	});
})}
async function writeFileAsync(...args){return new Promise((resolve,reject)=>{
	fs.writeFile(...args,(error)=>{
		if(error) reject(error);
		else resolve();
	});
})}
async function mkdirAsync(...args){return new Promise((resolve,reject)=>{
	fs.mkdir(...args,(error)=>{
		if(error) reject(error);
		else resolve();
	});
})}

async function setImg(id){
	if(fs.existsSync(TMP_FOLDER+id)){
		console.log("load wallpaper form cache...");
	}
	else{
		console.log("download wallpaper '"+id+"' ...");
		const head=await fetch(URL_API_IMAGE);
		const result=await head.arrayBuffer();
		console.log("wallpaper downloaded.");
		await writeFileAsync(TMP_FOLDER+id,Buffer.from(result));
	}
	console.log("apply wallpaper...");
	await wallpaper.set(TMP_FOLDER+id);
	img_current=id;
	console.log("wallpaper '"+id+"' applied.");
}
async function check(){
	console.log("fetching new infos from server...");
	const head=await fetch(URL_API_INFO);
	const result=await head.json();
	console.log("infos fetched.");
	if(result.current_picture!==img_current) setImg(result.current_picture);
	if(result.next_picture){
		clearTimeout(timeout_changeWallpaper);
		timeout_changeWallpaper=setTimeout(check,result.next_picture);
		img_get_next=Date.now()+result.next_picture;
	}
	lastFetch=Date.now();
	updateTray();
}

function updateTray(){
	if(!systemTray||!tray) return;
	const ID_LAST_CHECK=2;
	const ID_NEXT_IMG=3;

	tray.sendAction({
		type: "update-item",
		item:{
			title: "last-check: "+(new Date(lastFetch)).toLocaleTimeString(),
			enabled: false,
		},
		seq_id: ID_LAST_CHECK,
	});
	tray.sendAction({
		type: "update-item",
		item:{
			title: "next-wallpaper: "+(new Date(img_get_next)).toLocaleTimeString(),
			enabled: false,
		},
		seq_id: ID_NEXT_IMG,
	});
}

async function init(){
	await mkdirAsync(TMP_FOLDER,{recursive: true});
	if(systemTray){
		tray=new systemTray.default({
			menu:{
				icon: fs.readFileSync(ICON).toString("base64"),
				title: "Picture-Selector v2",
				tooltips: "auto change wallpaper program",
				items: [
					{
						title: "check for new background",
						tooltip:"fetch background manuell",
						//checked: false,
						enabled: true,
					},
					{
						title: "auto-check",
						tooltip:"automatic fetch background",
						checked: true,
						enabled: true,
					},
					{
						title: "last-check: Never",
						tooltip:"time of last fetch",
						//checked: false,
						enabled: false,
					},
					{
						title: "next-wallpaper: Never",
						tooltip:"time when u get next wallpaper",
						//checked: false,
						enabled: false,
					},
					{
						title: "quit",
						tooltip:"stop running the program in background",
						//checked: false,
						enabled: true,
					},
				],
			},
			debug: false,
			copyDir: true,
		});
		tray.onClick(action=>{
			if(action.seq_id===0) check();
			else if(action.seq_id===1){
				tray.sendAction({
					type: "update-item",
					item:{
						...action.item,
						title: "auto-check "+(!action.item.checked?"ON":"OFF"),
						checked: !action.item.checked,
					},
					seq_id: action.seq_id,
				});
				if(!action.item.checked){
					clearInterval(interval_check);
					setInterval(check,INTERVAL_CHECK);
					setTimeout(check,500);
				}
				else clearInterval(interval_check);
			}
			else if(action.seq_id===4) process.exit(0);
		})
	}

	try{default_wallpaper=await wallpaper.get()}
	catch(e){console.log("error cannot get default wallpaper.",e);}

	await check();
	interval_check=setInterval(check,INTERVAL_CHECK);
}
async function quit(){
	if(exit) return;
	exit=true;

	if(default_wallpaper){
		console.log("setting back to default wallpaper...");
		await wallpaper.set(default_wallpaper);
		console.log("default wallpaper set.");
	}
	process.exit();
}

// starts the program :)
init();

process.on("beforeExit",quit);
process.on("SIGINT",quit);
process.on("SIGTERM",quit);
process.on("SIGQUIT",quit);
