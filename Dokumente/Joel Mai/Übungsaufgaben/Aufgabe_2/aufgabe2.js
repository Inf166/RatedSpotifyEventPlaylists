var bewertungen = []; 
var aktuelleBewertung = 0;
var maxRating = 5;

function Bewertung(name, bewertung){
    this.name = name;
    this.bewertung = bewertung;
}

function calcNewRating(neueBewertung){
    aktuelleBewertung = (aktuelleBewertung+neueBewertung)/2;
}

function neueBewertung(name, bewertung){
    let neueBewertung = new Bewertung(name, bewertung);
    bewertungen.push(neueBewertung);
    calcNewRating(neueBewertung.bewertung);
}

function shootingStars (stars){
    let output = ``;
    for(let i =0; i<stars; i++){
        output = output.concat(' ★');
    }
    return output;
}

function giveRating(){
    console.log(`Die aktuelle Bewertung ist: ${aktuelleBewertung}`);
    console.log("Oder in Sternen:"+shootingStars(aktuelleBewertung));
}

const readline = require('readline'); 
const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout
});

function askforrating(){
    let fresheName;
    let fresheBewertung;
    rl.question('Bitte geben Sie ihren Namen an:', (answer) => {
        if(answer){
            fresheName = answer;
            rl.question('Mit wie vielen Sternen bewerten Sie unsere App?', (answer) => {
                if (!answer || isNaN(answer) || answer < 0 || answer > maxRating) {
                    console.log(`Sie haben eine ungültige Bewertung abgegeben!\nBitte bewerten Sie die App mit 0 bis ${maxRating} Sternen.`);
                } else {
                    console.log(`Vielen Dank für Ihre Bewertung von ${answer} Sternen!`);
                    fresheBewertung = answer;
                    neueBewertung(fresheName, fresheBewertung);
                    giveRating();
                }
                rl.close();
            });
        } else {
            console.log(`Sie haben einen ungültige Namen abgegeben!\nBitte versuchen Sie es erneut.`);
            rl.close();
        }          
    });
}

askforrating();