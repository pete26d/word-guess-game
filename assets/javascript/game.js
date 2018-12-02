
// declare variables
var wrongGuesses = [];
var guessCount = 8;
var userGuess;
var correctLetter;


var wordGame = {
  wordBank: ["montreal", "toronto", "winnipeg", "edmonton", "vancouver", "calgary", "ottawa"],
  wordArray: [],
  answerArray: [],
  guesses: [],

  wordChooser: function() {

    // select word for user to guess from the wordbank  
    var answerChoice = Math.floor(Math.random() * this.wordBank.length);  
    var wordToGuess = this.wordBank[answerChoice];
    this.wordArray = wordToGuess.split("");
    console.log(this.wordArray);

    // create array to hold the users correct letter guesses in the correct place
    for (var i = 0; i < this.wordArray.length; i++) {
      this.answerArray[i] = "_";
    }

    // print the array to the word-to-guess div
    this.printGuess();
    
  },

  printGuess: function() {
    var p = document.createElement("H2");
    var char;
    
    for (var j = 0; j < this.answerArray.length; j++) {
      char = document.createTextNode(this.answerArray[j] + " ");
      p.appendChild(char);
      document.getElementById("word-to-guess").appendChild(p);  
    } 
  },

  checkGuess: function() {  
    if (this.guesses.includes(userGuess)) {
      return;
    }
    else if (this.wordArray.includes(userGuess)) {
        this.letterCorrect();
    }
    else this.letterWrong();
  },

  letterCorrect: function() {
    for (var i = 0; i < this.wordArray.length; i++) {
        if (userGuess === this.wordArray[i]) {
            this.answerArray[i] = this.wordArray[i];
        }
    }
    var blank = document.getElementById("word-to-guess");
    blank.removeChild(blank.childNodes[0]);
    this.printGuess();
  },

  letterWrong: function() {

  }
 
};



window.onload = function() {
    wordGame.wordChooser();

    document.onkeyup = function(event) {
        
    //   Determines which key was pressed.
    userGuess = event.key;
    console.log("guess: " + userGuess);
    wordGame.checkGuess();
}

}