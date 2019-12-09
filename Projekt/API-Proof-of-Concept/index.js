const exampleTrackID = '4YVVZmgNA9TA9V1vxYogCl';

const Config = require('./config.json');

const SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: Config.Spotify.clientID,
    clientSecret: Config.Spotify.clientSecret
});

var tokenExpirationTime;
function getSpotifyAccessToken() {
    return new Promise((resolve, reject) => {
        spotifyApi.clientCredentialsGrant().then(
            (data) => {
                tokenExpirationTime = new Date().getTime() / 1000 + data.body['expires_in'];
                spotifyApi.setAccessToken(data.body['access_token']);
                updateSpotifyAccessToken();
                resolve();
            },
            (err) => {
                reject(err.message);
            }
        );
    });
}

function updateSpotifyAccessToken() {
    setInterval(function() {
        var timeLeft = Math.floor(tokenExpirationTime - new Date().getTime() / 1000);
        //console.log(timeLeft + 'Seconds');
        if (timeLeft <= 1000) {
            clearInterval(this);

            getSpotifyAccessToken().catch((err) => {
                console.error(err);
            });
        }
    }, 1000);
}

getSpotifyAccessToken().then(() => {
    console.log("[Spotify] Got Access Token.");
    spotifyApi.getTrack(exampleTrackID).then((data) => {
        var res = data.body;
        console.log(`[Track Info] Name: ${res.name}, Artist: ${res.artists[0].name}, Length: ${res.duration_ms / 1000} Seconds, Popularity: ${res.popularity}`);

        spotifyApi.getAudioFeaturesForTrack(exampleTrackID).then((data) => {
            var res = data.body;
            console.log(`[Track Features] Danceability: ${res.danceability}`);
        }).catch((err) => {
            console.error(err);
        });
    }).catch((err) => {
        console.error(err);
    })
}).catch((err) => {
    console.error(err);
})