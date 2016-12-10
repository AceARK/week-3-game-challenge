// *** Variable declarations ***

var wordObjectEasy = {
// if required, use key instead of traversing to the 0th element for getting currentWord
    "mutant" 		: ["pic2.jpg", "whistle tweet"],
    "sentinel" 		: ["pic3.jpg", "tweeeee sentinel eeeeeeet"],
    "wolverine" 	: ["pic3.jpg", "tweeeeeeeeeeeet"],
    "cyclops" 		: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "magneto"		: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "juggernaut"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "adamantium"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "mystique"		: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "sabretooth"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "jean grey"		: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "professor x"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "beast"			: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "nightcrawler"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "telepathy"		: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "telekinesis"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "phoenix"		: [ "pic3.jpg", "tweeeeeeeeeeeet"]
};

var wordObjectHard = {
    "phoenix force"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "hank mccoy"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "teleportation"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "emma frost"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "archangel"		: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "james logan"	: ["pic3.jpg", "tweee hard mode eeeeeeeeet"],
    "scott summers"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "soulsword"		: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "ororo monroe"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "kurt wagner"	: [ "pic3.jpg", "tweeeeeeeeeeeet"],
    "kitty pryde"	: [ "pic1.jpg", "tweet tweet whistle"],
    "eric lehnsherr": [ "pic1.jpg", "tweet tweet whistle"],
    "raven"			: [ "pic1.jpg", "tweet tweet whistle"],
    "marvel girl"	: [ "pic1.jpg", "blahblahblah"]
};

// array to store indices of wordObject
var wordArray = [];
var hardMode = false;
var hintUsedForCurrentWord = false;
var blankWord = []; // variable to hold blank word for initial display
var guessesLeft = 8;
var wins = 0;
var losses = 0;
var currentWord = "";
var wordArrayIndex = 0;
const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var lettersOfWordArray = [];
// local variable array of letters, to splice and remove used letters.
var usedLettersArray = [];
var arrayOfLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // ***** remove this when code to get new word comes.*******

// *** Hangman logic begins ***

$(document).ready(function(event) {

	// Play sound for x doors sliding
	$(".cover").mouseenter(function() {
		setTimeout(function(){$("#xDoorSliding")[0].play()}, 1900);
	});

	// Displaying game mode Easy
	$("#info").html("Game mode: Easy");

    // Changing game mode to Easy
    $(".easy").on("click", function() {
    	$("#modeChangeSound")[0].play();
        hardMode = false;
        reset();
        getWordArray();
        lettersOfWordArray = getNewWord();
        showBlank(lettersOfWordArray);
        $("#info").queue(function(){
			$("#info").html("Mode change detected");
			setTimeout(function(){$("#info").html("Game mode: 'Easy'")}, 1500);
			$("#info").dequeue();
		});
        console.log("currentWord - " + currentWord);
    });

    // Changing game mode to Hard
    $(".hard").on("click", function() {
    	$("#modeChangeSound")[0].play();
        hardMode = true;
        reset();
        getWordArray();
        lettersOfWordArray = getNewWord();
        showBlank(lettersOfWordArray);
        $("#info").queue(function(){
			$("#info").html("Mode change detected");
			setTimeout(function(){$("#info").html("Game mode: 'Hard'")}, 1500);
			$("#info").dequeue();
		});
        console.log("currentWord - " + currentWord);
    });

    // Getting hints on Hint button click
    $(".hint").on("click", function(){
    	$("#hintResetSound")[0].play();
    	if(hardMode) {
    		$("#hintDiv").html(wordObjectHard[currentWord][1]);
    	}else {
			$("#hintDiv").html(wordObjectEasy[currentWord][1]);
			if(!hintUsedForCurrentWord){
				guessesLeft--;
			}
			hintUsedForCurrentWord = true;
			$("#guessesLeft").html(guessesLeft);
    	}
	});

	// Reset game on Reset button click
		$(".reset").on("click", function(){
			$("#hintResetSound")[0].play();
			reset();
			wins = 0;
			$("#wins").html(wins);
			losses = 0;
			$("#losses").html(losses);
			hardMode = false;
			getWordArray();
			console.log("Array of letters: " + arrayOfLetters);
			lettersOfWordArray = getNewWord();
			console.log("currentWord - " + currentWord);
			console.log("wordArray " + wordArray);
			showBlank(lettersOfWordArray);
			$("#info").queue(function(){
				$("#info").html("Game Reset");
				setTimeout(function(){$("#info").html("Game mode: Easy")}, 1500);
				$("#info").dequeue();
			});
			
		});

    // Pseudocode ->
    // 1. Computer chooses word

    getWordArray();
    console.log("wordarray " + wordArray);
    lettersOfWordArray = getNewWord();
    console.log("Letters of current word array: " + lettersOfWordArray);

    // 2. Displays word in blanks and guesses left

    showBlank(lettersOfWordArray);
    $("#guessesLeft").html(guessesLeft);

    // 3. User presses key

    // Accepting user input
    document.onkeyup = function(event) {
    	// Play sound on key input
    	$("#keyPressSound")[0].play();
    	// Hide any text from previous input or event
      	$(".alert").hide();
        var userInput = String.fromCharCode(event.keyCode).toLowerCase();
        console.log("User input: " + userInput);
        // Not allowing invalid characters or numbers
        if (alphabets.indexOf(userInput) == -1) {
            console.log("Not allowing invalid input: " + userInput);
            $("#alertText").html("Invalid input. Choose a letter of the English alphabet.");
            $(".alert").slideToggle(700);
           
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

           // code to remove userInput from list of arrayOfLetters and add to usedLettersArray
            arrayOfLetters.splice(arrayOfLetters.indexOf(userInput), 1);
            usedLettersArray.push(userInput);
            
            $("#guessedLetters").html(usedLettersArray.toString().toUpperCase()); // printing used letters to html
            

            // 5. Check if letter is in word chosen

            // When userInput is a letter in currentWord
            if (lettersOfWordArray.indexOf(userInput) != -1) {
                console.log("If user input is in current word");
                // local variable array to store indices where letter exists in word
                var replaceAtIndex = [];

                // 6. If letter is in current word, update letter in blanks.

                // Find where in the word the letter is and store it in index array
                for (var i = 0; i < lettersOfWordArray.length; i++) {
                    if (lettersOfWordArray[i] === userInput) {
                        replaceAtIndex.push(i);
                    }
                    // run function to replace userInput wherever necessary in blankWord
                    blankWord = replaceBlank(blankWord, replaceAtIndex, userInput);
                    
                }
                printBlankNow(blankWord);

                console.log("blankWord:" + blankWord + "guessesLeft" + guessesLeft);


                // 8. If word is complete, "You win" message, wins incremented, guesses reset, display details about word.

                if (blankWord.indexOf("_") == -1) {
                    console.log("if word is guessed");
                    wins++;
                    console.log("Wins " + wins);
                    $("#wins").html(wins);
                    $("#winSound")[0].play();
                    $("#info").queue(function(){
						$("#info").html("You win");
						setTimeout(function(){$("#info").html("New word updated")}, 1500);
						if(hardMode){
							setTimeout(function(){$("#info").html("Game mode: Hard")}, 2500);
						}
						else {
							setTimeout(function(){$("#info").html("Game mode: Easy")}, 2500);
						}
						$("#info").dequeue();
					});
                    reset();
                    console.log("guesses " + guessesLeft); // see if required (unlikely when tested) -> code to check if easy or hard mode, and supply wordobject to getNewWord()
                    // get new word and print blanks for it
                    lettersOfWordArray = getNewWord();
                    console.log("Current word: " + currentWord);
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
                $("#guessesLeft").html(guessesLeft);
                if(guessesLeft == 1 && !hintUsedForCurrentWord && !hardMode){
                	$(".hint").prop('disabled', true);
                }
                console.log("Guesses left: " + guessesLeft);

                // 7.a. If guesses = 0, "You lose" message.

                if (guessesLeft === 0) {
                    console.log("If guesses left = 0 and word not guessed ");
                    losses++;
                    console.log("Losses " + losses);
                    $("#losses").html(losses);
                    $("#loseSound")[0].play();
                    $("#info").queue(function(){
						$("#info").html("You lose");
						setTimeout(function(){$("#info").html("New word updated")}, 1000);
						if(hardMode){
							setTimeout(function(){$("#info").html("Game mode: Hard")}, 2500);
						}
						else {
							setTimeout(function(){$("#info").html("Game mode: Easy")}, 2500);
						}
						$("#info").dequeue();
					});
                    reset();
                    console.log("Guesses " + guessesLeft); 
                    // get new word and print blanks for it
                    lettersOfWordArray = getNewWord();
                    console.log("Current word: " + currentWord);
                    console.log("Letters of new word array " + lettersOfWordArray);
                    showBlank(lettersOfWordArray);
                }

            }

        }

    }; // end of document.onkeyup 

}); // end of document.ready 

// end of hangman logic


//  *** Function declarations ***  

// To store words from wordObject dynamically
function getWordArray() {
	wordArray = [];
	if(hardMode) {
		for (var key in wordObjectHard) {
	    console.log("wordObjectHard - " + wordObjectHard[key]);
	    wordArray.push(key);
		}
	}else {
		for (var key in wordObjectEasy) {
	    console.log("wordObjectEasy - " + wordObjectEasy[key]);
	    wordArray.push(key);
		}
	}
}

// Function to reset values required for next round
function reset() {
    guessesLeft = 8;
    arrayOfLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    blankWord = [];
    lettersOfWordArray = [];
    usedLettersArray = [];
    currentWord = "";
    hintUsedForCurrentWord = "";
    $(".hint").prop('disabled', false);
    $("#guessedLetters").html(usedLettersArray.toString().toUpperCase());
    $("#guessesLeft").html(guessesLeft);
}

// Function to get words from object array to guess against
function getNewWord() {
    wordArrayIndex = Math.floor(Math.random() * wordArray.length);
    currentWord = wordArray[wordArrayIndex];
    var lettersOfWordArray = Array.from(currentWord); // converting current word to array for rest of code (Code snippet #6)
    return lettersOfWordArray;
}

// Function to show blanks corresponding to no. of letters in word to guess 
function showBlank(lettersOfWordArray) {
    for (var i = 0; i < lettersOfWordArray.length; i++) {
        if (lettersOfWordArray[i] == " ") {
            blankWord.push(" ");
        } else {
            blankWord.push("_");
        }
    }
    printBlankNow(blankWord);

}

// Code snippet #2 -> Updating wins, losses and guessesLeft to html
function printGuessesLeft(guessesLeft) {
    $("#guessesLeft").html(guessesLeft);
}

function printWins(wins) {
    $("#wins").html(wins);
}

function printLosses(losses) {
    $("#losses").html(losses);
}

// To display partial word 
function replaceBlank(blankWord, index, letter) {
    for (var i = 0; i < index.length; i++) {
        for (var j = 0; j < blankWord.length; j++) {
            if (j == index[i]) {
                blankWord[j] = letter.toUpperCase();
            }
        }
    }
    // send altered blankWord back
    return blankWord;
}

// Function to prepare string to display blankWord after each correctly guessed letter update
function printBlankNow(blankWord) {
    var printableBlank = "";
    for (var i = 0; i < blankWord.length; i++) {
        printableBlank = printableBlank + " " + blankWord[i];
    }
    // inserting partial word into html 
    document.getElementById("word").innerHTML = printableBlank;
}

//  *** End of functions ***
