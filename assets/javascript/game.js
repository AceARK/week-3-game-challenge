// *** Variable declarations ***

var wordObjectEasy = {                                                                      // object of arrays (for additional content on keys)
// if required, use key instead of traversing to the 0th element for getting currentWord
    "mutant" 		: ["When evolution skips ahead"],
    "sentinel" 		: ["'Targeting systems locked. Terminate all units.'"],
    "wolverine" 	: ["'You caged the wrong animal. Bub.'"],
    "cyclops" 		: ["This guy's the leader in comics but so not in the movies."],
    "magneto"		: ["'Peace was never an option.'"],
    "juggernaut"	: ["Never stopping once started"],
    "adamantium"	: ["Think claws"],
    "mystique"		: ["Is she the Good guy, or the Bad guy? You choose."],
    "sabretooth"	: ["Named after a extinct animal"],
    "jean grey"		: ["'Live, Scott. Live.'"],
    "professor x"	: ["The solo last letter in this word is the first letter of the game's theme."],
    "beast"			: ["Intelligent and strong"],
    "nightcrawler"	: ["He goes up in a puff of black smoke to any place he can see."],
    "telepathy"		: ["Helps in reading people's thoughts"],
    "telekinesis"	: ["Moving objects with the mind"],
    "phoenix"		: ["An omega level mutant. Cosmic power incarnate."]
};

var wordObjectHard = {                                                                        // object of arrays (for additional content on keys)
    "phoenix force"	: ["Immortal mutable cosmic entity"],
    "hank mccoy"	: ["He doesn't need to get angry to be big and blue."],
    "teleportation"	: ["If you're stuck in traffic, you'd be thinking of having this power."],
    "emma frost"	: ["White queen"],
    "archangel"		: ["Wings"],
    "james logan"	: ["'You actually go outside in these things?'"],
    "scott summers"	: ["'What would you prefer? Yellow spandex?'"],
    "soulsword"		: ["Emobiment of Illyana's power and her 'soul'"],
    "ororo munroe"	: ["Someone's real name. Say it right or she'll make it rain."],
    "kurt wagner"	: ["Other name for the nightcrawler"],
    "kitty pryde"	: ["This name has relation to these words - kitten, lion pride"],
    "erik lehnsherr": ["His name before he founded the Brotherhood of Mutants."],
    "raven"			: ["The name Charles called her"],
    "marvel girl"	: ["Another alias for the omega level version of Jean Grey"],
    "dark phoenix"  : ["Manifestation of the suppressed evil in jean grey"] 
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
var wordsUsedInCurrentSession = [];
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
        wordsUsedInCurrentSession = [];
        $("#info").queue(function(){
            if(hardMode){
               $("#info").html("Mode change detected"); 
            }
            setTimeout(function(){$("#info").html("Game mode: Easy")}, 1500);
            $("#info").dequeue();
        });
        hardMode = false;
        reset();
        getWordArray();
        lettersOfWordArray = getNewWord();
        showBlank(lettersOfWordArray);
        
    });

    // Changing game mode to Hard
    $(".hard").on("click", function() {
    	$("#modeChangeSound")[0].play();
        wordsUsedInCurrentSession = [];
        $("#info").queue(function(){
           if(!hardMode){
               $("#info").html("Mode change detected"); 
            }
            setTimeout(function(){$("#info").html("Game mode: Hard")}, 1500);
            $("#info").dequeue();
        });
        hardMode = true;
        reset();
        getWordArray();
        lettersOfWordArray = getNewWord();
        showBlank(lettersOfWordArray);
      
    });

    // Getting hints on Hint button click
    $(".hint").on("click", function(){
    	$("#hintResetSound")[0].play();
    	if(hardMode) {
    		$("#hintDiv").html(wordObjectHard[currentWord][0]);
    	}else {
			$("#hintDiv").html(wordObjectEasy[currentWord][0]);
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
            wordsUsedInCurrentSession = [];
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
                    $("#wordImage").attr("src","assets/images/wordimages/"+currentWord+".jpg");
                    $("#imageName").html(currentWord);
                    $("#wordImage").fadeIn(400);
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
    $("#wordImage").fadeOut(4000);
    setTimeout(function(){$("#imageName").html("")}, 4000);
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
    // To get rid of repetitive words in current gaming session
    while(wordsUsedInCurrentSession.indexOf(wordArray[wordArrayIndex]) != -1){
        console.log("Random duplicate detected");
        wordArrayIndex = Math.floor(Math.random() * wordArray.length);
    }
    currentWord = wordArray[wordArrayIndex];
    wordsUsedInCurrentSession.push(currentWord);
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
