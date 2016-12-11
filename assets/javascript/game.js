// *** Variable declarations ***

var wordObjectEasy = {
// if required, use key instead of traversing to the 0th element for getting currentWord
    "mutant" 		: [ "pic2.jpg", "When evolution skips ahead"],
    "sentinel" 		: [ "pic3.jpg", "'Targeting systems locked. Terminate all units.'"],
    "wolverine" 	: [ "pic3.jpg", "'You caged the wrong animal. Bub.'"],
    "cyclops" 		: [ "pic3.jpg", "This guy's the leader in comics but so not in the movies."],
    "magneto"		: [ "pic3.jpg", "'Peace was never an option.'"],
    "juggernaut"	: [ "pic3.jpg", "Never stopping once started"],
    "adamantium"	: [ "pic3.jpg", "Think claws"],
    "mystique"		: [ "pic3.jpg", "Is she the Good guy, or the Bad guy? You choose."],
    "sabretooth"	: [ "pic3.jpg", "Named after a extinct animal"],
    "jean grey"		: [ "pic3.jpg", "'Live, Scott. Live.'"],
    "professor x"	: [ "pic3.jpg", "'The solo last letter in this word is the first letter of the game's theme."],
    "beast"			: [ "pic3.jpg", "Intelligent and strong"],
    "nightcrawler"	: [ "pic3.jpg", "He goes up in a puff of black smoke to any place he can see."],
    "telepathy"		: [ "pic3.jpg", "Helps in reading people's thoughts"],
    "telekinesis"	: [ "pic3.jpg", "Moving objects with the mind"],
    "phoenix"		: [ "pic3.jpg", "An omega level mutant. Cosmic power incarnate."]
};

var wordObjectHard = {
    "phoenix force"	: [ "pic3.jpg", "Immortal mutable cosmic entity"],
    "hank mccoy"	: [ "pic3.jpg", "He doesn't need to get angry to be big and blue."],
    "teleportation"	: [ "pic3.jpg", "If you're stuck in traffic, you'd be thinking of having this power."],
    "emma frost"	: [ "pic3.jpg", "White queen"],
    "archangel"		: [ "pic3.jpg", "Wings"],
    "james logan"	: [ "pic3.jpg", "'You actually go outside in these things?'"],
    "scott summers"	: [ "pic3.jpg", "'What would you prefer? Yellow spandex?'"],
    "soulsword"		: [ "pic3.jpg", "Emobiment of Illyana's power and her 'soul'"],
    "ororo munroe"	: [ "pic3.jpg", "Someone's real name. Say it right or she'll make it rain."],
    "kurt wagner"	: [ "pic3.jpg", "Other name for the nightcrawler"],
    "kitty pryde"	: [ "pic1.jpg", "This name has relation to these words - kitten, lion pride"],
    "eric lehnsherr": [ "pic1.jpg", "His name before he founded the Brotherhood of Mutants."],
    "raven"			: [ "pic1.jpg", "The name Charles called her"],
    "marvel girl"	: [ "pic1.jpg", "Another alias for the omega level version of Jean Grey"]
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
			lettersOfWordArray = getNewWord();
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
    lettersOfWordArray = getNewWord();

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

        // Not allowing invalid characters or numbers
        if (alphabets.indexOf(userInput) == -1) {
            $("#alertText").html("Invalid input. Choose a letter of the English alphabet.");
            $(".alert").slideToggle(700);
            return; // go back and wait for new key press
        }
        // User input is an alphabet
        // Check if it has already been pressed by the user. If yes, return and wait for another key press
        else if (usedLettersArray.indexOf(userInput) != -1) {
            return;
        }
        // UserInput is not one of previously typed letters
        else {

            // 4. Letters used updated

           // code to remove userInput from list of arrayOfLetters and add to usedLettersArray
            arrayOfLetters.splice(arrayOfLetters.indexOf(userInput), 1);
            usedLettersArray.push(userInput);
            
            $("#guessedLetters").html(usedLettersArray.toString().toUpperCase()); // printing used letters to html
            

            // 5. Check if letter is in word chosen

            // When userInput is a letter in currentWord
            if (lettersOfWordArray.indexOf(userInput) != -1) {

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

             


                // 8. If word is complete, "You win" message, wins incremented, guesses reset, display details about word.

                if (blankWord.indexOf("_") == -1) {
                 
                    wins++;
                 
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
                  
                    // get new word and print blanks for it
                    lettersOfWordArray = getNewWord();
                  
                
                    showBlank(lettersOfWordArray);
                    return;
                }

                // 8.a. If word is not complete, go back to wait for key press.
                else {
                  
                    return;
                }
            }

            // 7. If letter is not in word, reduce guesses.	
            else {
               
                guessesLeft--;
                $("#guessesLeft").html(guessesLeft);
                if(guessesLeft == 1 && !hintUsedForCurrentWord && !hardMode){
                	$(".hint").prop('disabled', true);
                }
             

                // 7.a. If guesses = 0, "You lose" message.

                if (guessesLeft === 0) {
                  
                    losses++;
                  
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
                  
                    // get new word and print blanks for it
                    lettersOfWordArray = getNewWord();
              
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
	  
	    wordArray.push(key);
		}
	}else {
		for (var key in wordObjectEasy) {
	
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
    $("#hintDiv").html("");
    $("#hintDiv").collapse("hide");
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
