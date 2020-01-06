const maxRating = 5; // Maximale Bewertung

var ratingCount = 0; // Anzahl an Bewertungen
var ratingTotal = 0; // Gesamtwert aller Bewertungen
var ratingData = ['Campus Planer Bewertung', ratingCount, 0]; // Anlegen eines Array für Aufgabe 1 (Aufgabenblatt 2)

// Erstelle Konstruktor für Rating Objekte
function Rating(name) {
    this.name = name;
    this.count = 0;
    this.last = 0;
    this.total = 0;
    this.average = () => {
        if (this.count == 0) return 0;
        return (this.total / this.count).toFixed(2);
    };
}
var ratings = new Rating('Campus Planer Bewertung');
console.log(`Object Info > Name der Bewertung: ${ratings.name}`); // Ausgabe des Namens der Bewertung

/*
    Wie könnte man nun mehrere Bewertungen mit unterschiedlichen Namen abspeichern?
    -> Bspw. könnte man mittels der Konstruktorfunktion mehrere Objekte erstellen und in einem Array speichern.
*/

// Funktion zur Berechnung der Bewertung
function calcRating() {
    if (ratingCount == 0) return 0;
    return (ratingTotal / ratingCount).toFixed(2);
}

console.log(`Maximale Bewertung: ${maxRating} | Anzahl an Bewertungen: ${ratingCount} | Gesamtbewertung: ${calcRating()}`);

const readline = require('readline'); // Verwendung des 'readline' Moduls von nodeJS zur einfacheren Konsoleneingabe.
const rl = readline.createInterface({ // Initialisierung des readline-Interfaces
    input: process.stdin,
    output: process.stdout
});

// Aufforderung zur Konsoleneingabe einer Bewertung
rl.question('Mit wie vielen Sternen bewerten Sie unsere App? ', (answer) => {
    // Validierung der Antwort. ( Fehler: leer, NaN, < 0, > maxRating - Keine einzelnen Fehlermeldungen... )
    if (!answer || isNaN(answer) || answer < 0 || answer > maxRating) {
        console.log(`Sie haben eine ungültige Bewertung abgegeben!\nBitte bewerten Sie die App mit 0 bis ${maxRating} Sternen.`);
    } else {
        // Bewertung erfolgreich
        console.log(`Vielen Dank für Ihre Bewertung von ${answer} Sternen!`);
        let newRating = parseInt(answer, 10);

        ratingCount++; // Erhöhe Anzahl an Bewertungen
        ratingTotal += newRating; // Erhöhe Gesamtwert aller Bewertungen

        ratingData[1] = ratingCount; // Speichere Anzahl an Bewertungen im Array
        ratingData[2] = newRating; // Speichere letzte Bewertung im Array

        ratings.count = ratingCount; // Speichere Anzahl an Bewertungen im Objekt
        ratings.last = newRating; // Speichere letzte Bewertung im Objekt
        ratings.total = ratingTotal; // Speichere Gesamtwert aller Bewertungen auch im Objekt

        console.log(`Bewertungen: ${ratingCount} | Neue Bewertung: ${answer} | Gesamtbewertung: ${calcRating()}`);
        //console.log(`Array Info > Länge des Arrays: ${ratingData.length} | Lezte Bewertung: ${ratingData[2]}`);
        ratingSimulation(5); // Führe 5 Simulationen aus   
    }
    rl.close();
});

// Funktion für Simulationen von Bewertungen
function ratingSimulation(count) {
    console.log(`Führe ${count} Simulationen durch:`);
    for (let i = 0; i < count; i++) {
        let newRating = Math.floor(Math.random() * (maxRating + 1)); // Zufälliger Wert zwischen 0 und maxRating
        ratingCount++;
        ratingTotal += newRating;

        ratingData[1] = ratingCount; // Aktualisiere auch hier die Daten im Array
        ratingData[2] = newRating;

        ratings.count = ratingCount; // Aktualisiere auch hier die Daten im Objekt
        ratings.last = newRating;
        ratings.total = ratingTotal;

        console.log(`Bewertungen: ${ratingCount} | Neue Bewertung: ${newRating} | Gesamtbewertung: ${calcRating()}`);
    }

    // Gebe Array Daten nach der Simulation aus
    console.log(`Array Info > Länge des Arrays: ${ratingData.length} | Lezte Bewertung: ${ratingData[2]}`);
    // Gebe Objekt Daten nach der Simulation aus
    console.log(`Object Info > Bewertungen: ${ratings.count} | Lezte Bewertung: ${ratings.last} | Gesamtbewertung: ${ratings.average()}`);

    //scopeFunctions(); // Seperate Funktion für Aufgabe 5 (Aufgabenblatt 2) zum schnellen Auskommentieren
}

/*
const hello = 'Hello';
function concatWorldHello() {
    const world = ' World';
    return world.concat(hello); // Ausgabe falsch herum.
}

function concatHelloWorld() {
    //const world = ' World';
    return hello.concat(world); // Error, wenn 'world' nicht definiert. Sonst korrekt.
}

function scopeFunctions() {
    console.log(concatWorldHello());
    console.log(concatHelloWorld());
}
*/