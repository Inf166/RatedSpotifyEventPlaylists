# Erstellen eines Events
```
    POST /events/
```
Erstellt und gibt ein neues [Event](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/README.md) zurück.

## Parameter
### JSON Body Parameter
* Erwartet ein JSON-Objekt mit folgenden Informationen: `name, location, date, topic`

## Beispiel
### Request
```
    POST /events/
```
### Request Body
```json
{
	name: "Gryphon pres. Weska [Drumcode], Klines, Sven Sossong, uvm",
	location: "Mauerpfeiffer Lebacher Str 1-7a, 66113 Saarbrücken",
	date: 18012019,
	topic: "TECHNOOO"
}
```

### Response
```json
{
    "status": {
        "status_code": 200,
        "status_text": "OK"
    },
    "result": {
        "_id": "5e1c837fbdadea02805e1298",
        "name": "Gryphon pres. Weska [Drumcode], Klines, Sven Sossong, uvm",
        "location": "Mauerpfeiffer Lebacher Str 1-7a, 66113 Saarbrücken",
        "date": 18012019,
        "topic": "TECHNOOO"
    }
}
```