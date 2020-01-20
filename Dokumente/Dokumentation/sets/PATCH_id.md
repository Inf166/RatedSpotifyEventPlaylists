# Aktualisieren eines Sets
```
    PATCH /sets/:setID
```
Aktualisiert ein existierendes [Set](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/README.md).

## Parameter
### Path-Parameter
* setID

### JSON Body Parameter
* Erwartet ein JSON-Objekt mit einer oder mehreren neuen Informationen: `event, name, description`

## Beispiel
### Request
```
    PATCH /sets/5e1c887abdadea02805e1299
```
### Request Body
```json
{
	description: "Nicht mehr Technooo"
}
```

### Response
```json
{
    "status": {
        "status_code": 200,
        "status_text": "OK"
    },
    "result": "Set Updated."
}
```