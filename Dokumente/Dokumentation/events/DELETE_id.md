# Löschen eines Events
```
    DELETE /events/
```
Löscht ein existierendes [Event](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/README.md) zurück.

## Parameter
### JSON Body Parameter
* Erwartet ein JSON-Objekt mit folgenden Informationen: `eventID`

## Beispiel
### Request
```
    DELETE /events/
```
### Request Body
```json
{
	"eventID": 5e1c837fbdadea02805e1298
}
```

### Response
```json
{
	"status": {
		"status_code": 200,
		"status_text": "OK"
	},
	"result": "Event Deleted."
}
```