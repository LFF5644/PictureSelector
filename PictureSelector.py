import platform	# get platform name Windows, Linux
import ctypes	# Change Background
import random	# get random numbers
import json 	# read json files
import time		# let the programm sleep
import os		# is file; get path; get path sep

path=os.getcwd()
platform_name=platform.system()
pathSeb=os.sep
configFile_imgList="imgs.json"

file=open(configFile_imgList,"r")
imgArray=json.loads(file.read())
file.close()

def loadJsonFile(filename):
	file=open(configFile_imgList,"r")
	result=json.loads(file.read())
	file.close()
	return result

def setBackgroundImg(img):
	if(len(img)>=2 and img[0]!="/" and img[1]!=":"):
		img=path+pathSeb+img
	#print("IMG PATH: "+img)
	ctypes.windll.user32.SystemParametersInfoW(20,0,img,0)

imgArray=loadJsonFile(configFile_imgList)

print("Programm is started!\n"+str(len(imgArray))+" Bilder Geladen!")
while True:
	time.sleep(60*3)
	if(len(imgArray)==0):
		print("")
		print("Alle Bilder angezeigt! Bilder werden geldaden...")
		imgArray=loadJsonFile(configFile_imgList)
		print(f"Es wurden {len(imgArray)} Bilder erfolgreich geladen!\n")
	index=random.randint(0,len(imgArray)-1)
	print(f"NEUES BILD: Bild: {index}, Bilder: {len(imgArray)}")
	setBackgroundImg(imgArray[index])
	imgArray.pop(index)