
const fs = require ('fs');
const citiesFile = './cities.json';

// Exportierte Funktion getCities liefert die gelisteten Städte
exports.getCities = () => {
    return new Promise ( ( resolve , reject ) => {                  // Neues Promise 
        try { 
            fs.readFile( citiesFile , 'utf8' , ( err , data ) => {  // Einlesen des JSON-Files
                if ( err ) reject( err );                           // Bei Fehler Abbruch
    
                var list = [];                                      // Anlegen der auzugebenden Liste
                JSON.parse( data ).forEach(( city ) => {            // Für jedes JSON Objekt
                    list.push( city.stadtname );                    // Einfügen in die Liste
                });
    
                console.log(`All Cities: ${list.join(', ')}`);      // Ausgeben der Liste
    
                resolve();                                          // Promise einlösen
            });
        } catch ( err ) {                                           // oder bei Fehler -
            reject( err );                                          // Abbrechen und Melden
        }
    });
};

// Exportierte Funktion findCity liefert die gesuchte Stadt
exports.findCity = ( stadtname ) => {
    return new Promise( ( resolve , reject ) => {                   // Neues Promise 
        try {
            fs.readFile( citiesFile , 'utf8' , ( err , data ) => {  // Einlesen des JSON-Files
                if ( err ) reject( err );                           // Bei Fehler Abbruch
        
                var found = false;                                  // Variableninitialisierung auf Standard False
                JSON.parse( data ).forEach( ( city ) => {           // Einlesen des JSON Files
                    if ( city.stadtname === stadtname ) found = true;         // Jedes JSON Objekt durch gehen und Vergleichen
                });                                                 // Ob es die gesuchte Stadt ist und dann auf true setzen
                                                                    // Ausgabe auf der Console
                if ( found ) console.log (`The searched City '${stadtname}' was found.`);
                else console.log (`The searched City '${stadtname}'could not be found.`);
    
                resolve();                                          // Promise einlösen
            });                 
        } catch ( err ) {                                           // oder bei Fehler -
            reject( err );                                          // Abbrechen und Melden
        }
    } );
}

// Exportierte Funktion deleteCity löscht die gewünschte Stadt
exports.deleteCity = ( stadtname ) => {
    return new Promise( ( resolve , reject ) => {                   // Neues Promise 
        try {
            fs.readFile( citiesFile , 'utf8' , ( err, data ) => {   // Einlesen des JSON-Files
                if ( err ) reject( err );                           // Bei Fehler Abbruch
        
                var cities = JSON.parse( data );                    // Einlesen des JSON Files
                cities.forEach( ( city , index , list ) => {        // Für jedes JSON Objekt
                    if ( city.stadtname === stadtname ) list.splice( index , 1 );
                });                                                 // Falls Objekt equals der gesuchten Stadt
                                                                    // Objekt aus der Liste entfernen
                var json = JSON.stringify( cities , null , 4 );     // das JSON-File wieder schreiben 
                fs.writeFile( citiesFile , json , 'utf8' , ( err ) => {
                    if ( err ) reject( err );                       // Bei Fehler Abbruch
    
                    console.log(`The City '${stadtname}' is now deleted.`);
                                                                    // Ausgabe
                    resolve();                                      // Promise einlösen
                });
            });
        } catch ( err ) {                                           // oder bei Fehler -
            reject( err );                                          // Abbrechen und Melden
        }   
    });
}

// Exportierte Funktion addCity fügt die gewünschte Stadt dem JSON-File hinzu
exports.addCity = ( pstadtname , peinwohnerzahl , pbundesland ) => {
    return new Promise( ( resolve , reject ) => {                   // Neues Promise 
        try {
            fs.readFile( citiesFile , 'utf8' , ( err , data ) => {  // Einlesen des JSON-Files
                if ( err ) reject( err );                           // Bei Fehler Abbruch
    
                var cities = [];                                    // Anlegen des temporären Arrays
                cities = JSON.parse( data );                        // JSON Objekte hinzufügen
    
                cities.push({stadtname: pstadtname, einwohnerzahl: peinwohnerzahl, bundesland: pbundesland});
                                                                    // Neues Objekt anhängen
                var json = JSON.stringify( cities , null , 4 );     // In JSON File umwandeln
                fs.writeFile( citiesFile , json , 'utf8' , ( err ) => {
                    if ( err ) reject( err );                       // File schreiben
                                                                    // und bei Fehler abbrechen
                    console.log(`The City '${pstadtname}' was succsessfully appended.`);
                                                                    // Ausgabe
                    resolve();                                      // Promise einlösen
                });
            }); 
        } catch ( err ) {                                           // oder bei Fehler -
            reject( err );                                          // Abbrechen und Melden
        }   
    });
}
