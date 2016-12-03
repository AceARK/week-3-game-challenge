var wordObject = {
	word1 : ["cardinal", "pic1.jpg", "tweet tweet whistle"],
	word2 : ["towhee", "pic2.jpg", "whistle tweet"],
	word3 : ["bluejay", "pic3.jpg", "tweeeeeeeeeeeet"]
};

var wordArray = [wordObject.word1, wordObject.word2, wordObject.word3];

// declaring variables
var blankWord = []; // variable to hold blank word for initial display
var usedLettersList = ""; // variable to store letters guessed by user
var guessesLeft = 0;
var score = 0;
var currentWord = "";
var wordArrayIndex = 0;
var alphabets = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};

// Code snippet #1 -> Accepting user input and printing to html
document.onkeyup = function(event) {
	var userInput = String.fromCharCode(event.keyCode).toLowerCase();
	// Code snippet #4 -> Letter exclusion from list of choices to press (assessing whether letter used or not)
	// local variable array of letters, to splice and remove used letters.
	var usedLettersArray = [];
	var arrayOfLetters = alphabets; // ***** remove this when code to get new word comes.*******
	usedLettersArray.push(arrayOfLetters.splice(indexOf(userInput),1)); // code to remove userInput from list of arrayOfLetters and add to usedLettersArray
	document.getElementById("guessedLetters").innerHTML = usedLettersArray.toString().toUpperCase(); // printing used letters to html

	// Not allowing invalid characters
	if(alphabets.indexOf(userInput) == -1) {
		alert("Invalid input. Try typing a letter of the English alphabet instead!");
		return;
	}
	// Checking if userInput is one of the already inputed letters
	if(usedLettersArray.indexOf(userInput) == -1) {
		// rest of the code to check whether letter is in word, and print partial word etc.
		
	}

}// end of document.onkeyup **** to be changed after completing code snippets ******

// Code snippet #2 -> Updating score and guessesLeft to html
function printGuessesLeft(){
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}
function printScore(){
	document.getElementById("score").innerHTML = score;
}

// Code snippet #3 -> Getting words from object array to guess against
wordArrayIndex = Math.floor(Math.random() * wordArray.length);
currentWord = wordArray[wordArrayIndex][0];
var lettersOfWordArray = currentWord.toCharArray(); // converting current word to array for rest of code (Code snippet #6)
// If user gets answer, 
document.getElementById("pic").innerHTML = wordArray[wordArrayIndex][1];
document.getElementById("description").innerHTML = wordArray[wordArrayIndex][2];



// Code snippet #5 -> Checking if userInput is in currentWord
if(lettersOfWordArray.indexOf(userInput) != -1){
	// rest of code to find where in the word the letter is, and display it in place of blankword
	for(var i=0; i<lettersOfWordArray.length; i++){
		replaceAtIndex = lettersOfWordArray.indexOf(userInput);
		// run function to replace userInput wherever necessary in blankWord
		showBlank(blankWord,replaceAtIndex,userInput);
	}
	guesses--;
	printGuessesLeft();
}


// Code snippet #6 -> to show blanks corresponding to no. of letters in word to guess 

// configuring blanks to display based on word to guess
showBlank(); // ***** change position of this when complete code configured ****
// function to fill blankword with _ equal to letters in word to be guessed
function showBlank(){
	for (var i=0; i<lettersOfWordArray.length; i++){
		blankWord.push("_");
	}
	printBlankNow(blankWord);
	
}

// Code snippet #7?? Displaying partial word (overriding showBlank() to include args)
function showBlank(blankWord,index,letter){
	for (var i=0; i<blankWord.length; i++){
		if(i == index){
			blankWord.push(letter);
		}
		else{
			blankWord.push("_");
		}
	}
	printBlankNow(blankWord);
}

// function to prepare a text printable to html everytime blankWord is updated with user's correctly guessed letter
function printBlankNow(blankWord){
	for (var i=0; i<blankWord.length; i++){
		printableBlank = printableBlank + " " + blankWord[i];
		// inserting partial word into html 
		document.getElementById("word").innerHTML = printableBlank;
	}
}

// Code snippet #7 -> Displaying partial word
// function replace(string,index,letter){
// 	string = string.substr(0,index) + letter + string.substr(index + 1);
// 	stringArray = string.toCharArray(); // converting string to array to pass to printBlankNow function
// 	printBlankNow(stringArray); // call printBlankNow to print directly to html
// }