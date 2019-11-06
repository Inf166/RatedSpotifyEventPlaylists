const Cities = require('./modules/cities.js'); // Einbindung vom eigenen 'cities' Modul

Cities.getCities().then(() => { // Gibt eine Liste aller Städte aus
    Cities.findCity('Leipzig').then(() => { // Gibt das Ergebnis der Suche nach einer Stadt aus
        Cities.deleteCity('Leipzig').then(() => { // Löscht eine Stadt aus der Liste
            Cities.getCities().then(() => {
                Cities.addCity('Leipzig', '571088', 'Sachsen').then(() => { // Fügt die Stadt wieder hinzu.
                    Cities.getCities().then(() => {
                        printUsers(); // Funktion für den in Aufgabe 4 (Aufgabenblatt 3) geforderten Aufruf.
                    }).catch(err => console.error(err));
                }).catch(err => console.error(err));
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }).catch(err => console.error(err));
}).catch(err => console.error(err));

/*
    Aufgabe 3: Errors - Eigenschaften von try/catch in Javascript und Lösungsansatz
    In asynchronen Callbacks lassen sich keine Fehler durch try/catch abfangen.
    Stattdessen geben Callbacks im Fall eines Fehlers ein Error-Objekt zurück.
    ( In diesem Fall führt dies mittels 'reject()' zur Beendigung der Promises )
*/

const fs = require('fs');
function printUsers() {
    console.log('-----');

    var cities;
    var users;

    fs.readFile('./json/cities.json', 'utf8', (err, data) => {
        if (err) throw(err);
        cities = JSON.parse(data);

        fs.readFile('./json/users.json', 'utf8', (err, data) => {
            if (err) throw(err);
            users = JSON.parse(data);

            users.forEach((user) => {
                let einwohner;
                let bundesland;
                cities.forEach((city) => {
                    if (city.name === user.wohnort) {
                        einwohner = city.einwohner;
                        bundesland = city.bundesland;
                    }
                });

                console.log(`Vorname: ${user.vorname}\nNachname: ${user.nachname}\nE-Mail: ${user.email}\nWohnort: ${user.wohnort}\nEinwohner: ${einwohner}\nBundesland: ${bundesland}\n-----`);
            })

        });
    });
}