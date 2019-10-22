# Lernportfolio - Joel Mai - 11118561 - inf166
### Lernplan

|Defizit            |Was kann ich tun?                                                          |Wann?      |Fortschritt    | 
|---                |---                                                                        |---        |---            |
|JavaScript Basics  |[JavaScript Basics](https://www.w3schools.com/Js/)                         |7.10.2019  |Done           |
|JavaScript Errormsg|[JavaScript Error Messages](https://www.youtube.com/watch?v=FJQPEhMVSiY)   |14.10.2019 |Done           |
|JavaScript Promises|[JavaScript Promises](https://www.youtube.com/watch?v=DHvZLI7Db8E)         |18.10.2019 |Done           |
|NodeJS Introduction|[NodeJS Introduction](https://www.youtube.com/watch?v=TlB_eWDSMt4)         |22.10.2019 |Done           |
|NodeJS Express     |[Express Tutorial](https://www.youtube.com/watch?v=ndKRjmA6WNA)            |22.10.2019 |Done           |
|NodeJS Tutorials   |[Node JS Tutorial](https://www.w3schools.com/nodejs/)                      |25.10.2019 | TODO          |
|NodeJS Tutorials   |[Node JS Modules](https://www.w3schools.com/nodejs/nodejs_modules.asp)     |25.10.2019 | TODO          |
|NodeJS Tutorials   |[Node JS Events](https://www.w3schools.com/nodejs/nodejs_events.asp)       |25.10.2019 | TODO          |

## 07.10.2019 NodeJS & Rest Intro
### JavaScript
Variablen sind hier ganz anders als in Java, es gibt die Datentypen:
- var = sind die globalen, im ganzen Dokument verwendbaren Variablen
- let = ist eine temporäre funktionsabhängige Variable
- const = das selbe wie let nur einmal wert zuweisbar
  
Mögliche Datentypen für diese sind:
- Boolean
- Null
- Undefined
- Number
- String  

Zusätzlich aber erst später behandelt:
- Symbol & Object

### Aufgabenblatt und meine Einschätzung
Ich habe nach wie vor grundlegende Kenntnisse zu den hier vorgestellten Themen, brauche jedoch noch ein wenig Auffrischung bei den Libaries von Javascript. Manchmal musste ich nach gucken wie die Modules heißen oder wie ihre Syntax ist, aber an sich kein Problem gewesen.  
### Übungsblatt 1
Was lief gut?
- Programming Basics sind vorhanden
Was lieft schlecht?
- Keine Ahnung, bin noch am einarbeiten in JS
Fazit?
- JavaScript Kenntnisse aufholen

## 14.10.2019 Workshop
### Repository
- teamrepository
- repo soll private sein
- issues zur kommunikation mit betreuer mario faske
- wiki zur dokumentation
  - warum was wie gemacht wurde
- Unter Allgemeinen Materialien ES6 Workshop
- Anforderungen an das Projekt:
  - Daten aus externer Quelle in unseren Service integrieren
  - Daten aufbereiten und dann mit Node anbieten
### Übungsblatt 1
Was lief gut?
- JavaScript/Programming Basics sind vorhanden
Was lieft schlecht?
- Seltsame Runtime Errors.
- Nicht konsistente Ergebnisse
Fazit?
- Arrow Functions, Error Logs und Promises erforschen.

## 21.10.2019 Workshop
### Übungsblatt 1
Was lief gut?
- JavaScript/Programming Basics sind vorhanden
Was lieft schlecht?
- Arrow Functions
- Error Logs
- JS Promises 
Fazit?
- Alle Defizite sind aufgeholt.
- Lernplan wird weiter verfolgt.


# Projektidee - Angesagte Tracks für Gigs
[Domänenmodell](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Dom%C3%A4nmodell.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1nUmifaM56_n7nxeiCYORzCqlMw7wBz29%26export%3Ddownload)

## Beschreibung:
Nutzer können an eine Schnittstelle Tracks senden(über Links von Soundcloud, Beatport, Spotify, Youtube).
Der Service zählt die Vorschläge und Metadaten der Tracks und bietet dann eine Auflistung den Nutzern an. 
Diese Auflistung kann man mit Parametern filtern. Wie zum Beispiel Genre, Score, Thema, BeatsPerMinute.
Aufsteigend oder Absteigend.  
Der Service muss daher über die Links, die ID der Tracks erhalten und so über eine API-Schnittstelle 
die notwendigen Daten von den Anbietern abfragen.  
Als Interface für die Vorschläge dachten wir an einen Telegram-bot.  
Als Interface für die Abfrage dachten wir an ein Scoreboard im Web über http.   

## Ziel:
Das Ziel ist es, den Musikgeist der Zeit auf einem Scoreboard abzubilden und so demokratisch wie möglich 
Tracks aufzulisten.

## Mehrwert:
DJ's und Veranstalter können so einen Überblick über gefragte Genres und Themen erhalten und ihr Set oder Veranstaltungen anpassen.
