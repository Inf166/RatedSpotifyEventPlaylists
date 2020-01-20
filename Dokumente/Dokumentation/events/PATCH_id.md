# Aktualisieren eines Events
```
    PATCH /events/:eventID
```
Aktualisiert ein existierendes [Event](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/README.md).

## Parameter
### Path-Parameter
* eventID

### JSON Body Parameter
* Erwartet ein JSON-Objekt mit einer oder mehreren neuen Informationen: `name, location, date, topic`

## Beispiel
### Request
```
    PATCH /events/5e1c837fbdadea02805e1298
```
### Request Body
```json
{
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
    "result": "Event Updated."
}
```