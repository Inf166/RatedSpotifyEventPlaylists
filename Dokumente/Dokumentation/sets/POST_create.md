# Erstellen eines Sets
```
    POST /sets/
```
Erstellt und gibt ein neues [Set](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/README.md) zurück.

## Parameter
### JSON Body Parameter
* Erwartet ein JSON-Objekt mit folgenden Informationen: `eventID, name, description`

## Beispiel
### Request
```
    POST /sets/
```
### Request Body
```json
{
	eventID: "5e1c837fbdadea02805e1298",
	name: "JOREK",
	description: "Only the best selected, handpicked Techno please"
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
        "_id": "5e1c887abdadea02805e1299",
        "name": "JOREK",
        "description": "Only the best selected, handpicked Techno please"
    }
}
```