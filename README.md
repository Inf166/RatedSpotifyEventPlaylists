# Grundlagen des Webs - Praxis/Workshop Teil
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com)

# Dokumentation
## REST API - Siehe [REST Modellierung](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/wiki/REST-Modellierung)
### Authentifikation
Aktuell benötigt der Service keine Authentifikation und jeder Nutzer kann auf alle Funktionen zugreifen.  
Siehe [Anwendungslogik - Zukünftige/Mögliche Verbesserungen](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/wiki/Anwendungslogik#zuk%C3%BCnftigem%C3%B6gliche-verbesserungen)

### HTTP Requests / HTTP Anfragen
Alle API-Anfragen werden über einfache HTTP-Requests getätigt.  
Abhängig von der durchgeführten Aktion sind folgende Methoden möglich:
* `POST` Erstellt eine Ressource
* `GET` Liefert eine Ressource oder eine Liste von Ressourcen
* `PATCH` Aktualisiert eine Ressource
* `DELETE` Löscht eine Ressource  

Bei POST, PATCH und DELETE Requests muss die Anfrage im _body_ einen JSON-Payload mit bestimmten Informationen enthalten. Zusätzlich kann die URL bei einigen Anfrage über einen Pfad- oder Query-String verfügen. All dies wird in den folgenden Abschnitten erläutert.

### HTTP Responses / HTTP Antworten
Jeder Response enthält ein `status` und (wenn die Anfrage erfolgreich ist) ein `result` Objekt. `result` ist ein einfaches Objekt bei Einzelsatzanfragen und ein Array bei Listenanfragen. Das `status` Objekt enthält den HTTP `status_code` und den `status_text`. Wenn bei der Anfrage ein Fehler aufgetreten ist und kein `result` Objekt in der Antwort enthalten ist, gibt es stattdessen ein `error` Objekt mit näheren Informationen zum Fehler.  
Die Antwort auf einen GET-Request an `/events` könnte zum Beispiel so aussehen:

```json
{
  "status": {
    "status_code": 200,
    "status_text": "OK"
  },
  "result": [
    {
      "_id": "5e1c837fbdadea02805e1298",
      "name": "Gryphon pres. Weska [Drumcode], Klines, Sven Sossong, uvm",
      "location": "Mauerpfeiffer Lebacher Str 1-7a, 66113 Saarbrücken",
      "date": 18012019,
      "topic": "TECHNOOO"
    }
  ],
}
```

### HTTP Response Codes / HTTP Antwort Codes ( Status Codes )
Jeder Response wird mit einem der folgenden HTTP Status Codes beantwortet:
* `200` `OK` Die Anfrage war erfolgreich
* `400` `Bad Request` Die Anfrage war ungültig (Parameter, Daten, etc.)
* `404` `Not Found` Es wurde versucht auf eine Ressource zuzugreifen, die nicht existiert
* `500` `Internal Server Error` Beim Verarbeiten der Anfrage ist ein Error aufgetreten

### Request Modifiers / Anforderungsmodifikatoren
Bestimmte Anfrage können oder müssen mit zusätzlichen Informationen spezifiziert werden.  
Bei GET und PATCH Requests wird eine Ressource über einen Pfad-Parameter (in Form einer ID) identifiziert.  
Bei der Anfrage eines bestimmten Sets können mit Hilfe des Query-Parameters `orderBy` die Tracks sortiert werden.

### Ressources / Ressourcen
Für eine Übersicht und die Definition/Beschreibung von Ressourcen siehe [Anwendungslogik](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/wiki/Anwendungslogik).  

#### [Events](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/README.md)
* [`GET` Liefert eine Liste aller Events.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/GET_list.md)
* [`GET` Liefert Informationen zu einen bestimmten Event.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/GET_id.md)
* [`POST` Fügt ein neues Event hinzu.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/POST_id.md)
* [`PATCH` Aktualisiert Informationen eines bestimmten Events.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/PATCH_id.md)
* [`DELETE` Löscht ein bestimmtes Event.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/DELETE_id.md)

#### [Sets](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/README.md)
* [`GET` Liefert eine Liste aller Sets.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/GET_list.md)
* [`GET` Liefert Informationen zu einen bestimmten Set.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/GET_id.md)
* [`POST` Fügt ein neues Set hinzu.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/POST_id.md)
* [`PATCH` Aktualisiert Informationen eines bestimmten Sets.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/PATCH_id.md)
* [`DELETE` Löscht ein bestimmtes Set.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/DELETE_id.md)
  
#### [Requests](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/README.md)
* [`GET` Liefert eine Liste aller Requests.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/GET_list.md)
* [`GET` Liefert Informationen zu einen bestimmten Request.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/GET_id.md)
* [`POST` Fügt einen neuen Request hinzu.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/POST_id.md)
* [`DELETE` Löscht einen bestimmten Request.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/DELETE_id.md)

## Website / Client Demo
Folgt.
