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

def setBackgroundImg(img):
	if(len(img)>=2 and img[0]!="/" and img[1]!=":"):
		img=path+pathSeb+img
	#print("IMG PATH: "+img)
	ctypes.windll.user32.SystemParametersInfoW(20,0,img,0)

print("Programm is started!")
while True:
	time.sleep(10)
	index=random.randint(0,len(imgArray)-1)
	print("change backgraound img to "+str(index))
	setBackgroundImg(imgArray[index])