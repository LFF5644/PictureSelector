# Hintergrund Automatisch wekseln
Diese Programm Wekselt dein Desktop Hintergrund automatisch!

## So gehts
- [Python Downloaden](https://www.python.org/downloads/)
- [NodeJS Downloaden](https://nodejs.org/de/download/)
- eigene bilder in den `imgs` ordner paken
- prüfen ob bilder dem angegebenen formart in `imgTypes.json` entsprechen wenn nicht dann einfach hinzufügen
- dann `imgToConfig.js` ausführen mit nodejs `node imgToConfig.js`
- zum starten des eigendlichen programmes `PictureSelector.py` mit python ausführen `python3 PictureSelector.py`

## Ohne Terminal staten
- eine `*.bat` datei erstellen
- darin den `PictureSelector.py` ausführen aber mit python**w** `pyw PictureSelector.py`
- diese `bat` datei dann nur noch **einemal** ausführen
- zum beenden den taskmgr öffnen und `pyw.exe` beenden!

## Automartischer Autostart
- `WIN + R` drücken dann in das fenster `shell:startup` eingeben jz öffnet sich der startup ordner **alle** dateinen und verknüpfungen die sich hir befinden werden beim starten/anmelden ausgeführt
- dann eine verknüpfung erstellen
- rechtsklick eigenschaften auf diese
- dann bei ziel `cmd /c "start pyw.exe <PATH>\PictureSelector.py"` eintragen bei path dann den ort im explorer vom `PictureSelector`
- in ausführen in dann den path von `PictureSelector`
- dann bei ausführen `minimirt` auswählen
- wer will kann sich noch ein icon auswählen

<img width="303" alt="Screenshot" src="https://user-images.githubusercontent.com/109358910/218263953-92e10018-2384-4a25-a550-83531af94ab5.png">
