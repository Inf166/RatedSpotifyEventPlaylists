# Request
```
    GET /requests/:requestID
```
Gibt einen einzelnen [Request](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/README.md) zurück.

## Query-Parameter
### Path-Parameter
* requestID

## Beispiel
### Request
```
    GET /requests/5e1c894dbdadea02805e129a
```
### Response
```json
{
	"status": {
		"status_code": 200,
		"status_text": "OK"
	},
	"result": {
		"votes": 1,
		"_id": "5e1c894dbdadea02805e129a",
		"set": {
			"_id": "5e1c887abdadea02805e1299",
			"name": "JOREK"
		},
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
}
```