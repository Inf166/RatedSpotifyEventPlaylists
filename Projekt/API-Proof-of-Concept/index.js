// Include Config (Spotify APP Credentials)
const Path = require('path');
const Config = require(Path.join(__dirname, 'config.json'));

// Einbindung des Spotify-Web-API-Moduls
const SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: Config.Spotify.clientID,
    clientSecret: Config.Spotify.clientSecret
});

// Demo Track ID
const exampleTrackID = '7JoVRy6b5AqggrBcSQ27wV';

// Zeitpunkt, an dem das Access Token seine Gültigkeit verliert
var tokenExpirationTime;

// Funktion zum Abrufen des Access Token
function getSpotifyAccessToken() {
    return new Promise((resolve, reject) => {
        spotifyApi.clientCredentialsGrant().then(
            (data) => {
				// Aktualisiere das Ende der Gültigkeit
                tokenExpirationTime = new Date().getTime() / 1000 + data.body['expires_in'];
                
				// Speichere/Setze Access Token im API Objekt
				spotifyApi.setAccessToken(data.body['access_token']);
				
				// Starte Update Funktion
                updateSpotifyAccessToken();
				
				// Beende Promise erfolgreich
                resolve();
            },
            (err) => {
				// Ein Fehler ist aufgetreten und es konnte kein Access Token abgerufen werden
                // Beende Promise nicht erfolgreich
				reject(err.message);
            }
        );
    });
}

// Funktion zur Aktualisierung des Access Token (Token Refresh Deprecated?)
function updateSpotifyAccessToken() {
	// Prüfe jede Sekunde, ob das Token aktualisiert werden muss
    setInterval(function() {
		// Gültigkeit in Sekunden
        var timeLeft = Math.floor(tokenExpirationTime - new Date().getTime() / 1000);
		
		// Aktualisiere (Überschreibe) Token, wenn es nicht mehr lange gültig ist
        if (timeLeft <= 100) {
            clearInterval(this);

            getSpotifyAccessToken().catch((err) => {
                console.error(err);
            });
        }
    }, 1000);
}

// Rufe API Access Token ab
getSpotifyAccessToken().then(() => {
    console.log("[Spotify] API Zugriff erhalten.");
	
	// Rufe allgemeine Daten zu einem Track ab
    spotifyApi.getTrack(exampleTrackID).then((data) => {
        var trackInfo = data.body;
        console.log(`[Track Info] Name: ${trackInfo.name}, Artist: ${trackInfo.artists[0].name}, Length: ${trackInfo.duration_ms / 1000} Seconds, Popularity: ${trackInfo.popularity}`);

		// Rufe Audio Features zu einem Track ab
        spotifyApi.getAudioFeaturesForTrack(exampleTrackID).then((data) => {
            var audioFeatures = data.body;
            console.log(`[Audio Features] Danceability: ${audioFeatures.danceability}`);
        }).catch((err) => {
            console.error(err);
        });
    }).catch((err) => {
        console.error(err);
    })
}).catch((err) => {
    console.error(err);
})