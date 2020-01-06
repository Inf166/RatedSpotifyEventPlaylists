const path = require('path');
const apiCredentials = require(path.join(__dirname, 'spotify.json'));

const SpotifyWebApi = require('spotify-web-api-node');

// https://open.spotify.com/track/TRACKID?XYZ
// spotify:track:TRACKID
const REGEX = /^(https:\/\/open.spotify.com\/track\/|spotify:track:)([a-zA-Z0-9]+)(.*)$/;

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

    this.getTrack = function(trackURI) {
        return new Promise((resolve, reject) => {
            let validURI = trackURI.match(REGEX);
            if (validURI) {
                let trackID = validURI[2];

                this.getAccessToken().then(() => {
                    this.spotifyApi.getTrack(trackID).then(data => {
                        let trackInfo = data.body;
                        let name = trackInfo.name;
                        let artist = trackInfo.artists[0] || 'Unknown';
                        let duration_ms = trackInfo.duration_ms;
                        let popularity = trackInfo.popularity;
        
                        this.spotifyApi.getAudioFeaturesForTrack(trackID).then(data => {
                            let audioFeatures = data.body;
                            let acousticness = audioFeatures.acousticness;
                            let danceability = audioFeatures.danceability;
                            let energy = audioFeatures.energy;
                            let instrumentalness = audioFeatures.instrumentalness;
                            let liveness = audioFeatures.liveness;
                            let loudness = audioFeatures.loudness;
                            let speechiness = audioFeatures.speechiness;
                            let valence = audioFeatures.valence;
                            let tempo = audioFeatures.tempo;
        
                            let trackData = {
                                name: name,
                                artist: artist,
                                duration_ms: duration_ms,
                                popularity: popularity,
                                acousticness: acousticness,
                                danceability = danceability,
                                energy = energy,
                                instrumentalness = instrumentalness,
                                liveness = liveness,
                                loudness = loudness,
                                speechiness = speechiness,
                                valence = valence,
                                tempo = tempo
                            };
    
                            resolve(trackData);
                        }).catch(err => {
                            reject(err);
                        });
                    }).catch(err => {
                        reject(err);
                    });
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject('Invalid Track ID');
            }
        });
    }
}