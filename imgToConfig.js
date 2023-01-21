const fs=require("fs");

const configFile_imgList="imgs.json";
const configFile_allowedImgTypes="imgTypes.json";

const imgs=JSON.parse(fs.readFileSync(configFile_imgList,"utf-8"));
const imgTypes=JSON.parse(fs.readFileSync(configFile_allowedImgTypes,"utf-8"));

const imgs_folder=fs.readdirSync("imgs")
    .filter(item=>fs.lstatSync("imgs/"+item).isFile())
    .filter(item=>item.split(".").length==1?false:imgTypes.some(i=>i==item.split(".")[1].toLowerCase()))
    .map(item=>"imgs/"+item)

fs.writeFileSync(configFile_imgList,JSON.stringify(imgs_folder,null,2).split("  ").join("\t"))
