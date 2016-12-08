
// *** Variable declarations ***

var wordObjectEasy = {
	
	word1 : ["mutant", "pic2.jpg", "whistle tweet"],
	word2 : ["sentinel", "pic3.jpg", "tweeeeeeeeeeeet"],
	word3 : ["wolverine", "pic3.jpg", "tweeeeeeeeeeeet"],
	word4 : ["cyclops", "pic3.jpg", "tweeeeeeeeeeeet"],
	word5 : ["magneto", "pic3.jpg", "tweeeeeeeeeeeet"],
	word6 : ["juggernaut", "pic3.jpg", "tweeeeeeeeeeeet"],
	word7 : ["adamantium", "pic3.jpg", "tweeeeeeeeeeeet"],
	word8 : ["mystique", "pic3.jpg", "tweeeeeeeeeeeet"],
	word9 : ["sabretooth", "pic3.jpg", "tweeeeeeeeeeeet"],
	word10 : ["jean grey", "pic3.jpg", "tweeeeeeeeeeeet"],
	word11 : ["professor x", "pic3.jpg", "tweeeeeeeeeeeet"],
	word12 : ["beast", "pic3.jpg", "tweeeeeeeeeeeet"],
	word13 : ["nightcrawler", "pic3.jpg", "tweeeeeeeeeeeet"],
	word14 : ["telepathy", "pic3.jpg", "tweeeeeeeeeeeet"],
	word15 : ["telekinesis", "pic3.jpg", "tweeeeeeeeeeeet"],
	word16 : ["phoenix", "pic3.jpg", "tweeeeeeeeeeeet"]
};

var wordObjectHard = {
	word1 : ["phoenix force", "pic3.jpg", "tweeeeeeeeeeeet"],
	word2 : ["hank mccoy", "pic3.jpg", "tweeeeeeeeeeeet"],
	word3 : ["teleportation", "pic3.jpg", "tweeeeeeeeeeeet"],
	word4 : ["emma frost", "pic3.jpg", "tweeeeeeeeeeeet"],
	word5 : ["archangel", "pic3.jpg", "tweeeeeeeeeeeet"],
	word6 : ["james logan", "pic3.jpg", "tweeeeeeeeeeeet"],
	word7 : ["scott summers", "pic3.jpg", "tweeeeeeeeeeeet"],
	word8 : ["soulsword", "pic3.jpg", "tweeeeeeeeeeeet"],
	word9 : ["ororo monroe", "pic3.jpg", "tweeeeeeeeeeeet"],
	word10 : ["kurt wagner", "pic3.jpg", "tweeeeeeeeeeeet"],
	word11 : ["kitty pryde", "pic1.jpg", "tweet tweet whistle"],
	word12 : ["eric lehnsherr", "pic1.jpg", "tweet tweet whistle"],
	word13 : ["raven", "pic1.jpg", "tweet tweet whistle"],
	word14 : ["marvel girl", "pic1.jpg", "blahblahblah"]
};
// array to store indices of wordObject
var wordArray = [];

// To store words from wordObject dynamically
for(var key in wordObjectEasy){
	console.log("wordObjectEasy - " + wordObjectEasy[key]);
	wordArray.push(wordObjectEasy[key][0]);
	}

console.log("wordarray " + wordArray);
var blankWord = []; // variable to hold blank word for initial display
var guessesLeft = 10;
var wins = 0;
var losses = 0;
var currentWord = "";
var wordArrayIndex = 0;
const alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var lettersOfWordArray = [];
// local variable array of letters, to splice and remove used letters.
var usedLettersArray = [];
var arrayOfLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]; // ***** remove this when code to get new word comes.*******

// *** Hangman logic begins ***

$(document).ready(function(event){

	// Changing game mode to easy
	$(".easy").on("click", function(){
		for(var key in wordObjectEasy){
		console.log("wordObjectEasy - " + wordObjectEasy[key]);
		wordArray.push(wordObjectEasy[key][0]);
		}
		reset();
		lettersOfWordArray = getNewWord();
		showBlank(lettersOfWordArray);
		console.log("currentWord - " + currentWord);
	});
	// Changing game mode to hard
	$(".hard").on("click", function(){
		for(var key in wordObjectHard){
		console.log("wordObjectHard - " + wordObjectHard[key]);
		wordArray.push(wordObjectHard[key][0]);
		}
		reset();
		lettersOfWordArray = getNewWord();
		showBlank(lettersOfWordArray);
		console.log("currentWord - " + currentWord);
	});

	// Getting hints on hint button click
	// $(".hint").on("click", function(){
	// 	$("#message").html(wordArray[wordArrayIndex].); //////// code to display hints i.e wordObject[2]
	// });

	// Pseudocode ->
	// 1. Computer chooses word

	lettersOfWordArray = getNewWord();
	console.log("Letters of current word array: " + lettersOfWordArray);

	// 2. Displays word in blanks

	showBlank(lettersOfWordArray); 

	// 3. User presses key

	// Accepting user input
	document.onkeyup = function(event) {
		var userInput = String.fromCharCode(event.keyCode).toLowerCase();
		console.log("User input: " + userInput);
		// Not allowing invalid characters or numbers
		if(alphabets.indexOf(userInput) == -1) {
			console.log("Not allowing invalid input: " + userInput);
			alert("Invalid input. Try typing a letter of the English alphabet instead!");
			console.log("Printing used letter array" + usedLettersArray.indexOf(userInput));
			return; // go back and wait for new key press
		}
		// User input is an alphabet
			// Check if it has already been pressed by the user. If yes, return and wait for another key press
			else if (usedLettersArray.indexOf(userInput) != -1) { 
				return;
			}
			// UserInput is not one of previously typed letters
			else { 
				console.log("user input is not among already inputed letters");

			// 4. Letters used updated

				console.log("Array of letters: " + arrayOfLetters);
				arrayOfLetters.splice(arrayOfLetters.indexOf(userInput),1); 
				usedLettersArray.push(userInput);
				// code to remove userInput from list of arrayOfLetters and add to usedLettersArray
				console.log("Array of letters after splice: " + arrayOfLetters);
				console.log("Alphabets after splice: " + alphabets);
				document.getElementById("guessedLetters").innerHTML = usedLettersArray.toString().toUpperCase(); // printing used letters to html
				console.log("Used letters array: " + usedLettersArray);

			// 5. Check if letter is in word chosen

				// When userInput is a letter in currentWord
				if(lettersOfWordArray.indexOf(userInput) != -1){
					console.log("If user input is in current word");
					// local variable array to store indices where letter exists in word
					var replaceAtIndex = [];

			// 6. If letter is in current word, update letter in blanks.

					// Find where in the word the letter is and store it in index array
					for(var i=0; i<lettersOfWordArray.length; i++){
						if(lettersOfWordArray[i] === userInput){
							replaceAtIndex.push(i);
						}
						// run function to replace userInput wherever necessary in blankWord
						console.log("Blank is going to be replaced at: " + replaceAtIndex);
						blankWord = replaceBlank(blankWord,replaceAtIndex,userInput);
						console.log("Blank word now: " + blankWord);
					}
					printBlankNow(blankWord);
					
					console.log("blankWord:" + blankWord + "guessesLeft" + guessesLeft);
					

			// 8. If word is complete, "You win" message, wins incremented, guesses reset, display details about word.

					if(blankWord.indexOf("_") == -1) {
						console.log("if word is guessed");
						wins++;
						console.log("Wins " + wins);
						printWins(wins);
						reset();
						printGuessesLeft(guessesLeft);
						console.log("guesses " + guessesLeft); 	// see if required (unlikely when tested) -> code to check if easy or hard mode, and supply wordobject to getNewWord()
						// get new word and print blanks for it
						lettersOfWordArray = getNewWord();
						console.log("Current word: "+ currentWord);
						console.log("Letters of new word array " + lettersOfWordArray);
						showBlank(lettersOfWordArray);
						return;
					}	

			// 8.a. If word is not complete, go back to wait for key press.
					
					else {
						console.log("if word not complete and guesses still left");
						return;
					}
				}

			// 7. If letter is not in word, reduce guesses.	

				else {
					console.log("if user input not in word");
					guessesLeft--;
					printGuessesLeft(guessesLeft);
					console.log("Guesses left: " + guessesLeft);

			// 7.a. If guesses = 0, "You lose" message.

					if(guessesLeft === 0) {
						console.log("If guesses left = 0 and word not guessed ");
						losses++;
						console.log("Losses " + losses);
						printLosses(losses);
						reset();
						printGuessesLeft(guessesLeft);
						console.log("Guesses " + guessesLeft);		// see if required -> code to check if easy or hard mode, and supply wordobject to getNewWord()
						// get new word and print blanks for it
						lettersOfWordArray = getNewWord();
						console.log("Current word: "+ currentWord);
						console.log("Letters of new word array " + lettersOfWordArray);
						showBlank(lettersOfWordArray);
					}
					
				}

			}

	};// end of document.onkeyup 

});// end of document.ready 

// end of hangman logic


//  *** Function declarations ***  

// Function to reset values required for next round
function reset(){
	guessesLeft = 10;
	arrayOfLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	blankWord = [];
	lettersOfWordArray = [];
	usedLettersArray = [];
	currentWord = "";
}

// Function to get words from object array to guess against
function getNewWord(){
	wordArrayIndex = Math.floor(Math.random() * wordArray.length);
	currentWord = wordArray[wordArrayIndex];
	var lettersOfWordArray = Array.from(currentWord); // converting current word to array for rest of code (Code snippet #6)
	return lettersOfWordArray;
}

// Function to show blanks corresponding to no. of letters in word to guess 
function showBlank(lettersOfWordArray){
	for (var i=0; i<lettersOfWordArray.length; i++){
		if(lettersOfWordArray[i] == " "){
			blankWord.push(" ");
		}
		else {
			blankWord.push("_");
		}
	}
	printBlankNow(blankWord);
	
}

// Code snippet #2 -> Updating wins, losses and guessesLeft to html
function printGuessesLeft(guessesLeft){
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}
function printWins(wins){
	document.getElementById("wins").innerHTML = wins;
}
function printLosses(losses){
	document.getElementById("losses").innerHTML = losses;
}

// To display partial word 
function replaceBlank(blankWord,index,letter){
	for(var i=0; i<index.length; i++){
		for (var j=0; j<blankWord.length; j++){
			if(j == index[i]){
				blankWord[j] = letter.toUpperCase();
			}
		}
	}
	// send altered blankWord back
	return blankWord;
}

// Function to prepare string to display blankWord after each correctly guessed letter update
function printBlankNow(blankWord){
	var printableBlank = "";
	for (var i=0; i<blankWord.length; i++){
		printableBlank = printableBlank + " " + blankWord[i];
	}
	// inserting partial word into html 
	document.getElementById("word").innerHTML = printableBlank;
}

//  *** End of functions ***