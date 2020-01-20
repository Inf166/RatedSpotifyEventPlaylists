# Löschen eines Requests
```
    DELETE /requests/
```
Löscht einen existierenden [Request](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/README.md) zurück.

## Parameter
### JSON Body Parameter
* Erwartet ein JSON-Objekt mit folgenden Informationen: `requestID`

## Beispiel
### Request
```
    DELETE /requests/
```
### Request Body
```json
{
	"requestID": 5e1c894dbdadea02805e129a
}
```

### Response
```json
{
	"status": {
		"status_code": 200,
		"status_text": "OK"
	},
	"result": "Request Deleted."
}
```