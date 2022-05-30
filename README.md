<p>
    <a href="https://badges.pufler.dev" alt="https://badges.pufler.dev">
        <img alt="https://badges.pufler.dev/updated/inf166/api-rated-spotify-event-playlists?style=for-the-badge&color=yellow"    src="https://badges.pufler.dev/updated/inf166/api-rated-spotify-event-playlists?style=for-the-badge&color=yellow">
    </a>
    <a href="https://badges.pufler.dev" alt="https://badges.pufler.dev">
        <img alt="https://badges.pufler.dev/created/inf166/api-rated-spotify-event-playlists?style=for-the-badge&color=green" src="https://badges.pufler.dev/created/inf166/api-rated-spotify-event-playlists?style=for-the-badge&color=green">
    </a>
</p>

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
  ]
}
```

### HTTP Response Codes / HTTP Antwort Codes ( Status Codes )
Jeder Response wird mit einem der folgenden HTTP Status Codes beantwortet:
* `200` `OK` Die Anfrage war erfolgreich
* `201` `Created` Die Anfrage war erfolgreich und es wurde eine neue Ressource erstellt
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
* [`POST` Fügt ein neues Event hinzu.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/POST_create.md)
* [`PATCH` Aktualisiert Informationen eines bestimmten Events.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/PATCH_id.md)
* [`DELETE` Löscht ein bestimmtes Event.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/events/DELETE_id.md)

#### [Sets](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/README.md)
* [`GET` Liefert eine Liste aller Sets.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/GET_list.md)
* [`GET` Liefert Informationen zu einen bestimmten Set.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/GET_id.md)
* [`POST` Fügt ein neues Set hinzu.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/POST_create.md)
* [`PATCH` Aktualisiert Informationen eines bestimmten Sets.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/PATCH_id.md)
* [`DELETE` Löscht ein bestimmtes Set.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/sets/DELETE_id.md)
  
#### [Requests](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/README.md)
* [`GET` Liefert eine Liste aller Requests.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/GET_list.md)
* [`GET` Liefert Informationen zu einen bestimmten Request.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/GET_id.md)
* [`POST` Fügt einen neuen Request hinzu.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/POST_create.md)
* [`DELETE` Löscht einen bestimmten Request.](https://github.com/Inf166/GDW1920_Mai_Dahlke_Inci/blob/master/Dokumente/Dokumentation/requests/DELETE_id.md)

## Website / Client Demo
### Usecase  
Für die einfache und übersichtliche Nutzung der Rest API wurde eine Website erstellt, welche die verschiedenen Anfragen über Formulare und HTTP Requests ermöglicht und die Antworten verarbeitet, sodass sie für Menschen lesbar/ersichtlich sind. Es wurde besonders auf Einfachheit und Verständlichkeit für den durchschnittlichen Benutzer geachtet.  

### Navigation  
Mögliche Operationen sind:  
* Event erstellen
* Set erstellen
* Request/Song-Vorschlag erstellen
* Suchen
* Löschen  

### Operationen  
#### Event erstellen  
Um ein Event zu erstellen benötigt man einen Namen, ein Thema, ein Datum (Format: ttmmyyyy) und eine Location.  

#### Set erstellen  
Um ein Set zu erstellen benötigt man eine EventID, um zu bestimmen zu welchem Event das Set gehört, einen Namen und eine Kurzbeschreibung (Beispiel: Genre, gewünschte Künstler, ...).  

#### Request/Song-Vorschlag erstellen
Um einen Song-Vorschlag zu erstellen benötigt man eine SetID, um den jeweiligen Track einem Set zuweisen zu können, sowie eine Spotify TrackID. Die SetID kann bspw. über die Suche ermittelt, oder durch externe Quellen erhalten werden. Die TrackID kann direkt aus Spotify entnommen werden. Mögliche Variationen sind dabei die Track-URL, sowie die eindeutige Track-URI.

#### Suchen  
Über einen Radio-Button (Auswahlbutton) kann der Typ der gesuchten Ressource und optional auch die gewünschte Filterung/Sortierung für Requests innerhalb eines Sets bestimmt werden. Für Einzelsatzanfragen kann außerdem eine ID angegeben werden. Die Filterung/Sortierung für Requests innerhalb eines Sets ist nur bei einer Einzelsatzanfrage möglich.  

#### Löschen
Über einen Radio-Button (Auswahlbutton) kann der Typ der zu löschenden Ressource bestimmt und im Anschluss die zugehörige ID angegeben werden.  

### Ausgabe  
Das Ausgabefenster gibt dem Nutzer eine leichte verständliche Rückmeldung darüber, ob eine POST oder DELETE Request erfolgreich war oder ob dabei ein Fehler aufgetreten ist. Bei GET Requests erfolgt die Ausgabe der Antwort von der API in Form von Tabellen.
