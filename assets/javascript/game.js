var wordObject = {
	word1 : ["cardinal", "pic1.jpg", "tweet tweet whistle"],
	word2 : ["towhee", "pic2.jpg", "whistle tweet"],
	word3 : ["bluejay", "pic3.jpg", "tweeeeeeeeeeeet"]
};

var wordArray = [wordObject.word1, wordObject.word2, wordObject.word3];

// declaring variables
var blankWord = ""; // variable to hold blank word for initial display
var usedLettersList = ""; // variable to store letters guessed by user
var guessesLeft = 0;
var score = 0;
var currentWord = "";
var wordArrayIndex = 0;
var alphabets = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};

// Code snippet #1 -> Accepting user input and printing to html
document.onkeyup = function(event) {
	var userInput = String.fromCharCode(event.keyCode).toLowerCase();
	usedLettersList = usedLettersList + " " + userInput;
	document.getElementById("guessedLetters").innerHTML = usedLettersList;

}

// Code snippet #2 -> Updating score and guessesLeft to html
document.getElementById("guessesLeft").innerHTML = guessesLeft;
document.getElementById("score").innerHTML = score;


// Code snippet #3 -> Getting words from object array to guess against
wordArrayIndex = Math.floor(Math.random() * wordArray.length);
currentWord = wordArray[wordArrayIndex][0];
// If user gets answer, 
document.getElementById("pic").innerHTML = wordArray[wordArrayIndex][1];
document.getElementById("description").innerHTML = wordArray[wordArrayIndex][2];


// Code snippet #4 -> Letter exclusion from list of choices to press (assessing whether letter used or not)
// local variable array of letters, to splice and remove used letters.
var arrayOfLetters = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};
var usedLettersArray = arrayOfLetters.spice(indexOf(userInput));

// Not allowing invalid characters
if(alphabets.indexOf(userInput) == -1) {
	alert("Invalid input. Type a letter of the English alphabet.");
	return;
}
// Checking if userInput is one of the already inputed letters
if(usedLettersArray.indexOf(userInput) == -1) {
	// rest of the code to check whether letter is in word, and print partial word etc.
	
}


// Code snippet #5 -> Checking if userInput is in currentWord
if(currentWord.indexOf(userInput) != -1){
	// rest of code to find where in the word the letter is, and display it in place of blankword
}


// Code snippet #6 -> to show blanks corresponding to no. of letters in word to guess 
showBlank();
// function to fill blankword with _ equal to letters in word to be guessed
function showBlank(){
	for (var i =0; i<wordArray.length; i++){
		blankWord = blankWord + "_" + " ";
	}
	// inserting blanks into html 
	document.getElementById("word").innerHTML = blankWord;
}


// Code snippet #7 -> Displaying partial word