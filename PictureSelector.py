import platform	# platform.system() == "Windows"
import ctypes	# Change Background
import os		# get path

path=os.getcwd()
platform_name=platform.system()
pathSeb=os.sep

def setBackgroundImg(img):
	if(len(img)>=2 and img[0]!="/" and img[1]!=":"):
		img=path+pathSeb+img
	print("IMG PATH: "+img)
	ctypes.windll.user32.SystemParametersInfoW(20,0,img,0)

setBackgroundImg(input("Bild Datei: "))
