// Einbindung von dem eigenen 'cities_module' Modul
const cm = require('./cities_module'); 

cm.getCities().then(() => {                                         // Liefert die Liste aller Städte
    cm.findCity('Düren').then(() => {                               // Liefert die Gewünschte Stadt
        cm.deleteCity('Düren').then(() => {                         // Löscht die gewünschte Stadt aus der dem JSON File
            cm.getCities().then(() => {
                cm.addCity('Düren', '90733', 'NRW').then(() => {    // Fügt die Stadt wieder dem JSON File hinzu
                    cm.getCities().then(() => {
                        printUsers();                               // Aufgabe 4 - 
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

// Einbinden des File-System Modul
const fs = require('fs');

// Ausgabe aller Nutzer
function printUsers() {
    console.log(' ');                                                               // Ausgabentrennung

    var cities;                                                                     // Städte Variable
    var users;                                                                      // Nutzer Variable

 
        fs.readFile('cities.json', 'utf8', ( err , data ) => {             // Einlesen der Städte 
            if ( err ) throw( err );                                                // Bei Fehler Abbruch
            cities = JSON.parse(data);                                              // Übergeben an die Variable

            fs.readFile('users.json', 'utf8', ( err , data ) => {          // Einlesen der Nutzer
                if ( err ) throw( err );                                            // Bei Fehler Abbruch
                users = JSON.parse(data);                                           // Übergeben an die Variable

                users.forEach( ( user ) => {                                      // Für jeden Nutzer
                    let einwohnerzahl;                                              // temporäre Variable für die Einwohner
                    let bundesland;                                                 // temporäre Variable für das Bundesland
                    cities.forEach( ( city ) => {                                 // Falls die Stadt des Nutzers
                        if (city.stadtname === user.wohnort) {                          // in der Liste der Städte vorkommt
                            einwohnerzahl = city.einwohnerzahl;                         // sollen die temporären Variablen
                            bundesland = city.bundesland;                           // mit den Werten aus der Liste gefüllt werden.
                        }
                    });
                                                                                    // Ausgabe aller Daten
                    console.log(`Vorname: ${user.vorname}\nNachname: ${user.nachname}\nE-Mail: ${user.email}\nWohnort: ${user.wohnort}\nEinwohnerzahl: ${einwohnerzahl}\nBundesland: ${bundesland}\n-----`);
                })

            });
        });
                                                              // Bei Fehler
        console.error( err );                                                        // Abbruch und Melden

}