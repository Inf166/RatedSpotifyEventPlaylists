//Author: Joel Mai
//Aufgabe 1. Name ausgeben via Console

console.log('Joel Mai'); // gibt meinen Namen aus

//Aufgabe 2. Konstante App

const maxAppRating = 5; // maximal mögliche Best-Bewertung
var currentAppRating; // die aktuelle App Bewertung
var currentAppRatings; // die aktuelle Anzahl der Bewertungen

currentAppRating = 3;   // Wertzuweisung weil 'NUN' Weisen Sie diesen Variablen und ihrer Konstante nun Werte zu, mit denen sie in den folgenden Aufgaben arbeiten.
currentAppRatings = 3; // Wertzuweisung

function shootingStars (stars){         // Diese Funktion wandelt die Number in hübsche Zeichen um
    let output = ``;
    for(let i =0; i<stars; i++){
        output = output.concat(' ★');
    }
    return output;
}

function giveStats(){                   // Für zunkünftige Calls hier schonmal eine function
    console.log(' ');
    console.log('Neue Bewertung:'); 
    console.log(`Aktuelle Bewertung: (${currentAppRating}) ${shootingStars(currentAppRating)}`);
    console.log(`${currentAppRatings} Bewertungen insgesamt`);
    console.log(`Maximale mögliche Bewertung: (${maxAppRating}) ${shootingStars(maxAppRating)}`);
}

giveStats();

// Simulierte Bewertung:
currentAppRatings++;
currentAppRating++;

giveStats();

// Neuer Typ zugewisen:
currentAppRating='> it does not break';   // let kann die kompatiblen Werte einfach annehmen 
console.log(currentAppRating);            // nur meine Funktion würde crashen
currentAppRating = 4;

// maxAppRating = 6; // Javascript bricht ab weil const keine neuen Werte bekommen darf (heißt ja auch constant und nicht switcherooo)

// Aufgabe 3

// Einbinden des readline moduls
const readline = require('readline');  // Readline Modul einbinden für Bewertungseingabe Macht man eigentlich ganz oben im Doc
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

var ratings = [];                                   // Array mit allen Bewertungen für Durchschnitt
let x = 0;
while(x<=(currentAppRatings-1)){
    ratings[x] = 3;
    x++;
}

// --> Aufgabe 5. Funktionen Auslagern
function calcNewRating (rating){                    // Funktion ausgelagert
    return new Promise((resolve, reject) => {
        let ratingIsRightInt = (rating) => Number.isInteger(rating);
        if(ratingIsRightInt){
            if(rating <= maxAppRating){
                // ratings[currentAppRatings]=rating;              // Neue Bewertung eingetragen
                ratings.push(rating);              // Neue Bewertung eingetragen
                let newrating = 0;
                ratings.forEach((item, index, array) => {
                    newrating += item; 
                });
                // for(let i = 0; i<currentAppRatings; i++){
                //     newrating = newrating + ratings[i];         // Alle zusammen addieren
                // }
                currentAppRatings++;                            // Jetzt die Bewertungen um 1 neue addieren für richtige Summe
                newrating = (newrating / currentAppRatings);    // Durchschnitt berechnen
                currentAppRating = Math.floor(newrating);       // Boom Schakalaka
                resolve('Bewertung erfolgreich abgeschlossen');
            } else {
                reject('Fehler: Bewertung überschreitet die maximal erlaubte Bewertung');
            }
        } else {
            reject('Fehler: Bewertung ist keine Zahl');
        }
    });
}

// Aufgabe 3. Still going
rl.question('Wie würden Sie die App bewerten?', (rating) => {    
    calcNewRating(rating).then((message)=>{
        giveStats();
        console.log(message);
    }).catch((error)=>{
        console.log(error);
    });              // hier war mal die Funktion calcNewRating
        
});

//Aufgabe 4. MILLIONEN BEWERTUNGEN oder vlt nur 20
rl.question(`Wie viele Bewertungen sollen generiert werden?`, function(so){
    for(let mebeme = 0; mebeme<so; mebeme++){
        let mesee = Math.floor((Math.random() * (maxRating + 1)));
        console.log(mesee);
        calcNewRating(mesee);
        giveStats();
    }
});

