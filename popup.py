import tkinter
def info(text,title="Info",buttons=["Exit"]):
	result=None
	def buttonClick(entry):
		nonlocal result
		if len(entry)>1:
			closeWindow=entry[1](entry)
			if closeWindow==True:
				result=entry[0]
				window.destroy()
		else:
			result=entry[0]
			window.destroy()

	font="Arial 18"
	bg=None
	fg="black"
	
	window=tkinter.Tk()
	window.title(title)
	window["background"]=bg

	label_text=tkinter.Label(window,text=text,font=font,bg=bg,fg=fg)
	label_text.pack(padx=10,pady=10)

	if type(buttons)==str:
		buttons=[buttons]

	frame_buttons=tkinter.Frame(window,bg=bg)
	frame_buttons.pack()

	for entry in buttons:
		if type(entry)==str:
			entry=[entry]
		button=tkinter.Button(frame_buttons,text=entry[0],command=lambda: buttonClick(entry),font=font,bg="gray",fg=fg)
		button.pack(padx=10,pady=10,ipadx=5,ipady=5,side=tkinter.LEFT)

	window.mainloop()
	return result

if __name__=="__main__":
	print(info("Bitte als Modul Importiren!",buttons="Schließen"))
