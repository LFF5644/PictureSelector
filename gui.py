import tkinter
import socketio
import popup

fontBig="Arial 25"
font="Arial 18"
entries=[]
url="http://localhost:34460"

def delateEntries():
	global entries
	for entry in entries:
		entry.destroy()

def button_next(buttons=[], callback=None):
	if not callback:
		print("Next Image ...")
		for button in buttons:
			button.config(state="disabled")

		client.emit("next",callback=lambda res: button_next(buttons,res))
	else:
		if callback is False: 
			label_info.config(text="Fehler!",foreground="red")
			label_info.grid()
		else:
			label_info.grid_forget()

		print("background image changed!")
		for button in buttons:
			button.config(state="normal")

def button_previous():
	client.emit("previous")

window=tkinter.Tk()
window.title("Picture-Selector")
#window.geometry("500x200")

label_info=tkinter.Label(window,text="Verbindet ...",font=fontBig)
label_info.grid(row=1,column=0,columnspan=1)

window.update()

client = socketio.Client()

@client.event
def connect():
	global entries
	print("Connected!")
	label_info.grid_forget() # hide label
	buttons=[]
	buttons.append(tkinter.Button(window,text="Next",command=lambda: button_next(buttons),font=fontBig))  
	buttons.append(tkinter.Button(window,text="Previous",command=lambda: button_previous(buttons),font=fontBig))

	for index in range(len(buttons)):
		button=buttons[index]
		button.grid(row=1,column=index,ipadx=10,ipady=10)
	entries+=buttons

@client.event
def connect_error(e):
	print("connect error! retry...")
	label_info.grid()
	label_info.config(text="Verbindung Fehler!\nErneut Verbinden ...")
	window.update()
	client.connect(url)

@client.event
def currentImage(image):
	print(image)

@client.event
def disconnect():
	print("reconnect ...")
	label_info.config(text="Verbindung wird erneut Hergestellt ...")
	label_info.grid()
	delateEntries()

client.connect(url)

window.mainloop()