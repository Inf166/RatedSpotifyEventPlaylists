# Event
```
    GET /events/:eventID
```
Gibt ein einzelnes [Event](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/README.md) zurück.

## Query-Parameter
### Path-Parameter
* eventID

## Beispiel
### Request
```
    GET /events/5e1c837fbdadea02805e1298
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
        "topic": "TECHNOOO",
        "sets": [
            {
            "_id": "5e1c887abdadea02805e1299",
            "name": "JOREK",
            "description": "Only the best selected, handpicked Techno please"
            },
            {
            "_id": "5e1c955716b08a06ff4ff0c0",
            "name": "Weska",
            "description": "Just a boi playin some music"
            }
        ],
    }
}
```