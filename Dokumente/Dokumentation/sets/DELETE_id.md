# Löschen eines Sets
```
    DELETE /sets/
```
Löscht ein existierendes [Set](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/README.md) zurück.

## Parameter
### JSON Body Parameter
* Erwartet ein JSON-Objekt mit folgenden Informationen: `setID`

## Beispiel
### Request
```
    DELETE /sets/
```
### Request Body
```json
{
	"setID": 5e1c887abdadea02805e1299
}
```

### Response
```json
{
	"status": {
		"status_code": 200,
		"status_text": "OK"
	},
	"result": "Set Deleted."
}
```