import ctypes

def setBackgroundImg(img):
	ctypes.windll.user32.SystemParametersInfoW(20,0,img,0)

setBackgroundImg(input("Bild Datei: "))
