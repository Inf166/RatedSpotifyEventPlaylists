//console.log('inf155');

const maxRating = 5;
var ratingCount = 0;
var ratingTotal = 0;

// Funktion zur Berechnung der Bewertung
function calcRating() {
    if (ratingCount == 0) return 0;
    return (ratingTotal / ratingCount).toFixed(2);
}

console.log(`Maximale Bewertung: ${maxRating} | Anzahl an Bewertungen: ${ratingCount} | Gesamtbewertung: ${calcRating()}`);

/* 
Was macht Javascript, wenn Sie eine der Variablen einen anderen Typ zuweisen?
    -> Der Variable wird sowohl der neue Typ, als auch der neue Wert zugewiesen.

Was passiert, wenn Sie ihrer Konstante, nachdem Sie diese deklariert haben, einen neuen Wert zuweisen?
    -> Javascript/nodeJS wird einen Fehler auswerfen, da einer Konstanten kein neuer Typ oder Wert zugewiesen kann.
*/

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
        ratingCount++; // Erhöhe Anzahl an Bewertungen
        ratingTotal += parseInt(answer, 10); // Speichere Bewertung
        console.log(`Anzahl an Bewertungen: ${ratingCount} | Neue Bewertung: ${answer} | Gesamtbewertung: ${calcRating()}`);
        ratingSimulation(5); // Führe 5 Simulationen aus   
    }
    rl.close();
});

// Funktion für Simulationen von Bewertungen
function ratingSimulation(count) {
    console.log(`Führe ${count} Simulationen durch:`);
    for (let i = 0; i < count; i++) {
        let rating = Math.floor(Math.random() * (maxRating + 1)); // Zufälliger Wert zwischen 0 und maxRating
        ratingCount++;
        ratingTotal += rating;
        console.log(`Bewertungen: ${ratingCount} | Neue Bewertung: ${rating} | Gesamtbewertung: ${calcRating()}`);
    }
}