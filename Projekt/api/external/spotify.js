const path = require('path');
const apiCredentials = require(path.join(__dirname, 'spotify.json'));

const SpotifyWebApi = require('spotify-web-api-node');

// https://open.spotify.com/track/TRACKID?XYZ
// spotify:track:TRACKID

module.exports = function() {
    this.spotifyApi = new SpotifyWebApi({
        clientId: apiCredentials.clientID,
        clientSecret: apiCredentials.clientSecret
    });

    this.getAccessToken = function() {
        return new Promise((resolve, reject) => {
            this.spotifyApi.clientCredentialsGrant().then(
                (data) => {
                    // data.body['expires_in']
                    this.spotifyApi.setAccessToken(data.body['access_token']);
                    resolve();
                },
                (err) => {
                    reject(err.message);
                }
            );
        });
    }

    this.getTrack = function(trackID) {
        this.getAccessToken().then(() => {
            this.spotifyApi.getTrack(trackID).then(data => {
                let trackInfo = data.body;
                let name = trackInfo.name;
                let artists = trackInfo.artists;
                let duration = trackInfo.duration_ms;
                let popularity = trackInfo.popularity;
                console.log('Got Track Info.');

                this.spotifyApi.getAudioFeaturesForTrack(trackID).then(data => {
                    let audioFeatures = data.body;
                    let danceability = audioFeatures.danceability;
                    console.log('Got Audio Features.');
                }).catch(err => {
                    console.error(err);
                });
            }).catch(err => {
                console.error(err);
            });
        }).catch(err => {
            console.error(err);
        })
    }
}