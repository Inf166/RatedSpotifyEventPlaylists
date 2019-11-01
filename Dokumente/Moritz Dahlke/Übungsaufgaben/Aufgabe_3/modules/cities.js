const fs = require('fs'); // Einbindung des File-System Moduls
const citiesFile = './json/cities.json'; // Pfad zur .json-Datei

// Funktion zur Auflistung aller Städte
exports.getCities = () => {
    return new Promise((resolve, reject) => { // Funktion als Promise für einfache/angenehme Verkettung
        try { // Try/Catch Block zum Auffangen von Fehlern -> Eigentlich 'redundant' da der Promise geeignete Fehler wirft.
            fs.readFile(citiesFile, 'utf8', (err, data) => { // Lesen der .json-Datei
                if (err) reject(err);
    
                var list = [];
                JSON.parse(data).forEach((city) => {
                    list.push(city.name);
                });
    
                console.log(`Städte: ${list.join(', ')}`);
    
                resolve();
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Funktion zur Suche nach einer Stadt
exports.findCity = (name) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(citiesFile, 'utf8', (err, data) => {
                if (err) reject(err);
        
                var found = false;
                JSON.parse(data).forEach((city) => {
                    if (city.name === name) found = true;
                });
        
                if (found) console.log(`Die Stadt '${name}' wurde gefunden.`);
                else console.log(`Die Stadt '${name}' wurde nicht gefunden.`);
    
                resolve();
            }); 
        } catch (e) {
            reject(e);
        }
    } );
}

// Funktion zur Löschung einer Stadt
exports.deleteCity = (name) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(citiesFile, 'utf8', (err, data) => {
                if (err) reject(err);
        
                var cities = JSON.parse(data);
                cities.forEach((city, index, list) => {
                    if (city.name === name) list.splice(index, 1);
                });
    
                var json = JSON.stringify(cities, null, 4);
                fs.writeFile(citiesFile, json, 'utf8', (err) => {
                    if (err) reject(err);
    
                    console.log(`Die Stadt '${name}' wurde erfolgreich gelöscht.`);
    
                    resolve();
                });
            });
        } catch (e) {
            reject(e);
        }
    });
}

// Funktion zum Hinzufügen einer Stadt
exports.addCity = (name, einwohner, bundesland) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(citiesFile, 'utf8', (err, data) => {
                if (err) reject(err);
    
                var cities = [];
                cities = JSON.parse(data);
    
                cities.push({name: name, einwohner: einwohner, bundesland: bundesland});
        
                var json = JSON.stringify(cities, null, 4);
                fs.writeFile(citiesFile, json, 'utf8', (err) => {
                    if (err) reject(err);
    
                    console.log(`Die Stadt '${name}' wurde erfolgreich hinzugefügt.`);
    
                    resolve();
                });
            }); 
        } catch (e) {
            reject(e);
        }   
    });
}