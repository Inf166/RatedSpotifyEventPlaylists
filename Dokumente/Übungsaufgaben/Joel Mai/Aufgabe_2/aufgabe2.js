var bewertungen = [];

function Ratings(nameofrating){                                                    //Aufgabe 2
	this.name = nameofrating;
    this.bewertungen = [];
    this.lastrating = () => {return `${this.bewertungen[0].name}: ${this.bewertungen[0].bewertung} Sterne`};
    this.maxRating = 5;
    this.aktuelleBewertung = 0;
    this.calcNewRating =  () => {                                                   //Aufgabe 3 & 4
        this.aktuelleBewertung = 0;
        this.bewertungen.forEach((item) => {
            console.log(parseInt(item.bewertung));
            this.aktuelleBewertung += parseInt(item.bewertung); 
        });
        console.log(this.aktuelleBewertung);
        this.aktuelleBewertung = this.aktuelleBewertung / this.bewertungen.length;
        console.log(this.aktuelleBewertung);
        return this.aktuelleBewertung;
    };
}	
var ratings = new Ratings('My App');
// var aktuelleBewertung = 0;
var maxRating = 5;

function Bewertung(name, bewertung){												//Aufgabe 1
    this.name = name;                                                               //Aufgabe 2
    this.bewertung = bewertung;                                                     // In dem Eine Bewertung auch ein Objekt ist und diese im Array Ratings gespeichert werden
}

// function calcNewRating(neueBewertung){
//     aktuelleBewertung = (aktuelleBewertung+neueBewertung)/2;
// }

function neueBewertung(name, bewertung){											//Aufgabe 1
    let neueBewertung = new Bewertung(name, bewertung);
    ratings.bewertungen.unshift(neueBewertung);
    ratings.calcNewRating();
}

function shootingStars (stars){
    let output = ``;
    for(let i =0; i<stars; i++){
        output = output.concat(' ★');
    }
    return output;
}

function giveRating(){
	console.log(`Aktuelle Bewertungen: ${ratings.bewertungen.length}`);				//Aufgabe 1
	console.log(`Die letzte Bewertung ist von ${ratings.lastrating()}`);	                //Aufgabe 1
    console.log(`Die aktuelle Bewertung ist: ${ratings.aktuelleBewertung}/${maxRating}`);
    console.log('Oder in Sternen:'+shootingStars(ratings.aktuelleBewertung));
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
                if (!answer || isNaN(answer) || answer < 0 || answer > ratings.maxRating) {
                    console.log(`Sie haben eine ungültige Bewertung abgegeben!\nBitte bewerten Sie die App mit 0 bis ${maxRating} Sternen.`);
                } else {
                    console.log(`Vielen Dank für Ihre Bewertung von ${answer} Sternen!`);
                    fresheBewertung = parseInt(answer, 10);
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

// neueBewertung('Joel', 4);
// neueBewertung('Maximilian', 3);
// neueBewertung('Mai', 1);

askforrating();

//Aufgabe 5
//world kann ja nicht von der anderen Funktion benutzt werden weil sie ja lokal ist. also muss ich tricksen

// const hello = 'hello';

// function konkateniert(){
//     const world = 'World'; 
//     console.log(hello + ' ' + world);
//     return world;
// }

// function konkateniert2(){
//     console.log(konkateniert() + ' ' + hello);
// }
// konkateniert2();