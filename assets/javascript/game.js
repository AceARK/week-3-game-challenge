var wordObject = {
	word1 : ["dumbledore", "pic1.jpg", "tweet tweet whistle"],
	word2 : ["hagrid", "pic2.jpg", "whistle tweet"],
	word3 : ["hedwig", "pic3.jpg", "tweeeeeeeeeeeet"]
};
// array to store indices of wordObject
var wordArray = [wordObject.word1, wordObject.word2, wordObject.word3];
// declaring variables
var blankWord = []; // variable to hold blank word for initial display
var guessesLeft = 10;
var wins = 0;
var losses = 0;
var currentWord = "";
var wordArrayIndex = 0;
const alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var lettersOfWordArray = [];
// local variable array of letters, to splice and remove used letters.
var usedLettersArray = [""];
var arrayOfLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]; // ***** remove this when code to get new word comes.*******


$(document).ready(function(event){

	// 1. Computer chooses word

	lettersOfWordArray = getNewWord();
	console.log("Letters of current word array: " + lettersOfWordArray);
	// 2. Displays it in blanks

	showBlank(lettersOfWordArray); // ***** change position of this when complete code configured ****

	// 3. User presses key

	// Code snippet #1 -> Accepting user input and printing to html
	document.onkeyup = function(event) {
		var userInput = String.fromCharCode(event.keyCode).toLowerCase();
		// Code snippet #4 -> Letter exclusion from list of choices to press (assessing whether letter used or not)
		console.log("User input: " + userInput);
		// Not allowing invalid characters
		if(alphabets.indexOf(userInput) == -1) {
			console.log("Not allowing invalid input: " + userInput);
			alert("Invalid input. Try typing a letter of the English alphabet instead!");
			return;
		}
		console.log("Printing used letter array" + usedLettersArray.indexOf(userInput));
		// If userInput is not one of the already inputed letters
		if($.inArray(userInput,usedLettersArray) == -1) { ////////////////// BUG -> ALLOWING ALREADY TYPED LETTERS AND SPLICING FROM END OF ARRAY OF LETTERS ////////////////
			console.log("If user input is not among already inputed letters");
	// 4. Letters used updated
			console.log("Array of letters: " + arrayOfLetters);
			usedLettersArray.push(arrayOfLetters.splice(arrayOfLetters.indexOf(userInput),1)); // code to remove userInput from list of arrayOfLetters and add to usedLettersArray
			console.log("Array of letters after splice: " + arrayOfLetters);
			console.log("Alphabets after splice: " + alphabets);
			document.getElementById("guessedLetters").innerHTML = usedLettersArray.toString().toUpperCase(); // printing used letters to html
			console.log("Used letters array: " + usedLettersArray);

	// 5. Check if letter is in word chosen

			// Code snippet #5 -> For when userInput is a letter in currentWord
			if(lettersOfWordArray.indexOf(userInput) != -1){
				console.log("If user input is in current word");
				// array to store indices where letter exists in word
				var replaceAtIndex = [];

				// code to find where in the word the letter is and store it in index array

	// 6. If yes, update letter in blanks.
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
				

		// 8. If word is complete, "You win" message, wins incremented, guesses reset, display details on word.

				if(blankWord.indexOf("_") == -1) {
					console.log("if word is guessed");
					wins++;
					console.log("Wins " + wins);
					printWins(wins);
					reset();
					printGuessesLeft(guessesLeft);
					console.log("guesses " + guessesLeft);
					// If user gets answer, 
					document.getElementById("pic").innerHTML = wordArray[wordArrayIndex][1];
					document.getElementById("description").innerHTML = wordArray[wordArrayIndex][2];
					// get new word and print blanks for it
					lettersOfWordArray = getNewWord();
					console.log("Current word: "+ currentWord);
					console.log("Letters of new word array " + lettersOfWordArray);
					showBlank(lettersOfWordArray);
					return;
				}	
		// 8.a. If word not complete, go back to wait for key press.
				// else wait for key press	
				else {
					console.log("if word not complete and guesses still left");
					return;
				}
			}
	// 7. If letter not in word, reduce guesses.	
			else {
				console.log("if user input not in word");
				guessesLeft--;
				printGuessesLeft(guessesLeft);
				console.log("Guesses left: " + guessesLeft);

		// 7.a. If guesses = 0, "You lose" message. Else, go back to wait for key press.
				// Check if guesses left = 0 but word has not been guessed
				if(guessesLeft === 0) {
					console.log("If guesses left = 0 and word not guessed ");
					losses++;
					console.log("Losses " + losses);
					printLosses(losses);
					reset();
					printGuessesLeft(guessesLeft);
					console.log("Guesses " + guessesLeft);
					// get new word and print blanks for it
					lettersOfWordArray = getNewWord();
					console.log("Current word: "+ currentWord);
					console.log("Letters of new word array " + lettersOfWordArray);
					showBlank(lettersOfWordArray);
				}
				
			}

		}

	};// end of document.onkeyup 

});

//  *** Functions definitions ***  

function reset(){
	guessesLeft = 10;
	arrayOfLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	blankWord = [];
	lettersOfWordArray = [];
	usedLettersArray = [];
	currentWord = "";
}
// Code snippet #3 -> Getting words from object array to guess against
function getNewWord(){
	wordArrayIndex = Math.floor(Math.random() * wordArray.length);
	currentWord = wordArray[wordArrayIndex][0];
	var lettersOfWordArray = Array.from(currentWord); // converting current word to array for rest of code (Code snippet #6)
	return lettersOfWordArray;
}

// Code snippet #6 -> to show blanks corresponding to no. of letters in word to guess 
// function to fill blankword with _ equal to letters in word to be guessed
function showBlank(lettersOfWordArray){
	for (var i=0; i<lettersOfWordArray.length; i++){
		blankWord.push("_");
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

// Code snippet #7 -> Displaying partial word (overriding showBlank() to include args)
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

// function to prepare a text printable to html everytime blankWord is updated with user's correctly guessed letter
function printBlankNow(blankWord){
	var printableBlank = "";
	for (var i=0; i<blankWord.length; i++){
		printableBlank = printableBlank + " " + blankWord[i];
	}
	// inserting partial word into html 
	document.getElementById("word").innerHTML = printableBlank;
}

// Code snippet #7 -> Displaying partial word
// function replace(string,index,letter){
// 	string = string.substr(0,index) + letter + string.substr(index + 1);
// 	stringArray = string.toCharArray(); // converting string to array to pass to printBlankNow function
// 	printBlankNow(stringArray); // call printBlankNow to print directly to html
// }