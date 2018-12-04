// declare variables

var userGuess;

var wordGame = {
  wordBank: ["montreal", "toronto", "winnipeg", "edmonton", "vancouver", "calgary", "ottawa"],
  wordArray: [],
  answerArray: [],
  guesses: [],
  winCount: 0,
  loseCount: 0,
  guessCountLeft: 8,

  initGame: function() {

    this.guessCountLeft = 8;
    this.clearDisplay();
    this.answerArray = [];
    this.guesses = [];
    
    
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
    document.getElementById("guesses-left").innerHTML = this.guessCountLeft;
    document.getElementById("count-wins").innerHTML = this.winCount;
    document.getElementById("count-losses").innerHTML = this.loseCount;
    document.getElementById("wrong-guess").innerHTML =  " ";
    
  },

  clearDisplay: function() {
  // var display = document.getElementById("word-to-guess");
  
  // if (display.hasChildNodes()) {
  //   display.removeChild(display.childNodes[0]);
  // }

  document.getElementById("word-to-guess").innerHTML = " ";
},

  printGuess: function() {

    // var p = document.createElement("H2");
    // var char;
      
    for (var j = 0; j < this.answerArray.length; j++) {
      document.getElementById("word-to-guess").insertAdjacentText("beforeend", this.answerArray[j] + " ");
    //   char = document.createTextNode(this.answerArray[j] + " ");
    //   p.appendChild(char);
    //   document.getElementById("word-to-guess").appendChild(p);  
    } 
  },

  checkGuess: function() {  
    if (this.guesses.includes(userGuess)) {
      return;
    }
    else if (this.wordArray.includes(userGuess)) {
        this.guesses.push(userGuess);
        this.letterCorrect();
    }
    else {
        this.guesses.push(userGuess);
        this.letterWrong();
    }
  },

  letterCorrect: function() {
    for (var i = 0; i < this.wordArray.length; i++) {
        if (userGuess === this.wordArray[i]) {
            this.answerArray[i] = this.wordArray[i];
        }
    }
    this.clearDisplay();
    this.printGuess();

    if (!this.answerArray.includes("_")) {
      this.gameOver("win");
    }
  },

  letterWrong: function() {
    
    this.guessCountLeft--;
    
    document.getElementById("guesses-left").innerHTML = this.guessCountLeft;
    document.getElementById("wrong-guess").insertAdjacentText("beforeend", userGuess + " ");
    if (this.guessCountLeft === 0) {
      this.gameOver("lose");
    }
  },

  gameOver: function(result) {
    if (result === "lose") {
      this.loseCount++;
      document.getElementById("count-losses").innterHTML = this.loseCount;
      this.initGame();
    }
    else if (result === "win") {
      this.playSound();
      this.winCount++;
      document.getElementById("count-wins").innerHTML = this.winCount;
      this.initGame();
    }
  },

  playSound: function() {
    var myAudio = document.createElement("AUDIO");
    myAudio.src = "assets/sounds/win.mp3";
    myAudio.play();
  }

  

  

};



window.onload = function() {
    wordGame.initGame();

    document.onkeyup = function(event) {
        
    //   Determines which key was pressed.
    userGuess = event.key;
    console.log("guess: " + userGuess);
    wordGame.checkGuess();
}

}