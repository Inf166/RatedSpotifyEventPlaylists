# Set
```
    GET /sets/:setID
```
Gibt ein einzelnes [Set](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/README.md) zurück.

## Parameter
### Path-Parameter
* setID

### Query-Parameter
* orderBy - Liefert nach einem Parameter absteigend sortierte Requests innerhalb des Response.

## Beispiel
### Request
```
    GET /sets/5e1c887abdadea02805e1299
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
		"event": {
			"_id": "5e1c837fbdadea02805e1298",
			"name": "Gryphon pres. Weska [Drumcode], Klines, Sven Sossong, uvm"
		},
		"name": "JOREK",
		"description": "Only the best selected, handpicked Techno please",
		"requests": [
			{
				"votes": 1,
				"_id": "5e1c894dbdadea02805e129a",
				"track_id": "3XzyCdaoAlFQeVke2QjyuT",
				"name": "Deadly Kiss - Jorek Remix",
				"artist": "Luigi Gori",
				"duration_ms": 472727,
				"popularity": 0,
				"acousticness": 0.0306,
				"danceability": 0.685,
				"energy": 0.788,
				"instrumentalness": 0.928,
				"liveness": 0.179,
				"loudness": -9.147,
				"speechiness": 0.0441,
				"valence": 0.0373,
				"tempo": 132.003,
				"key": 2
			}
		],
	}
}
```