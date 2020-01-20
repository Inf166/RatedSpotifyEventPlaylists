# Set Liste
```
    GET /sets
```
Gibt eine Liste von allen [Sets](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/README.md) zurück.

## Query-Parameter
Keine

## Beispiel
### Request
```
    GET /sets
```
### Response
```json
{
	"status": {
		"status_code": 200,
		"status_text": "OK"
	},
	"result": [
		{
			"_id": "5e1c887abdadea02805e1299",
			"event": {
				"_id": "5e1c837fbdadea02805e1298",
				"name": "Gryphon pres. Weska [Drumcode], Klines, Sven Sossong, uvm"
			},
			"name": "JOREK",
			"description": "Only the best selected, handpicked Techno please"
		},
		{
			"_id": "5e1c955716b08a06ff4ff0c0",
			"event": {
				"_id": "5e1c837fbdadea02805e1298",
				"name": "Gryphon pres. Weska [Drumcode], Klines, Sven Sossong, uvm"
			},
			"name": "Weska",
			"description": "Just a boi playin some music"
		}
	],
}
```