import 'normalize.css';
import '../styles/index.scss';

var game = {
  counter: 0,
  buttons: ['#button1','#button2', '#button3', '#button4'],
  startButton: document.getElementById('start'),
  strictButton: document.getElementById('strict'),
  button1: document.getElementById('button1'),
  button2: document.getElementById('button2'),
  button3: document.getElementById('button3'),
  button4: document.getElementById('button4'),
  counterButton: document.getElementsByClassName('counter')[0],
  update: function(field) {
    field.innerHTML = game.counter;
  },
  buttonsInit: function() {
    button1.addEventListener('mouseover', function() {
      this.classList.add('hover');
    }),
    button1.addEventListener('mouseout', function() {
      this.classList.remove('hover');
    }),
    button1.addEventListener('click', function(event) {
      recordPlayerSeq(event.target.id);
    }),
    button2.addEventListener('mouseover', function() {
      this.classList.add('hover');
    }),
    button2.addEventListener('mouseout', function() {
      this.classList.remove('hover');
    }),
    button2.addEventListener('click', function(event) {
      recordPlayerSeq(event.target.id);
    }),
    button3.addEventListener('mouseover', function() {
      this.classList.add('hover');
    }),
    button3.addEventListener('mouseout', function() {
      this.classList.remove('hover');
    }),
    button3.addEventListener('click', function(event) {
      recordPlayerSeq(event.target.id);
    }),
    button4.addEventListener('mouseover', function() {
      this.classList.add('hover');
    }),
    button4.addEventListener('mouseout', function() {
      this.classList.remove('hover');
    }),
    button4.addEventListener('click', function(event) {
      recordPlayerSeq(event.target.id);
    }),
    game.strictButton.addEventListener('change', function () {
      if (this.checked) {
        game.strict = true;
      } else {
        game.strict = false;
      }
    }),
    game.startButton.addEventListener('change', function () {
      if (this.checked) {
        game.start = true;
        newGame();
      } else {
        game.start = false;
        clearGame();
      }
    })
  },
  newSeq: [],
  playerSeq: [],
  sounds: {
    button1Sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    button2Sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    button3Sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    button4Sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  start: false,
  strict: false
};

function newGame() {
  clearGame();
  console.log('New Game!');
  generateRandomSeq();
  //console.log(game.newSeq);
  game.update(game.counterButton);
  playSeq();
}

function clearGame() {
  game.newSeq = [];
  game.counter = 0;
  game.update(game.counterButton);
  emptyPlayerSeq();
}

function increaseCounter() {
  game.counter++;
  game.update(game.counterButton);
  playSeq();
}

function generateRandomSeq() {
  for (var i=0; i < 20; i++) {
    var rndNum = Math.floor(Math.random() * 4) + 1;
    game.newSeq.push('button' + rndNum);
  }
}

function playSeq() {
  var j = 1;
  var seq = setInterval(function() {
    if (j <= game.counter+1) {
      playButton(game.newSeq[j-1]);
    }
    j++;
    if (j >= game.newSeq.length) {
      clearInterval(seq);
    }
  }, 1200);
  
  emptyPlayerSeq();
}

function playButton(button) {
  document.getElementById(button).classList.add('hover');
  var btnSnd = button + 'Sound';
  game.sounds[btnSnd].play();
  setTimeout(function() {
      document.getElementById(button).classList.remove('hover');
  }, 1000);
}

function emptyPlayerSeq() {
  game.playerSeq = [];
}

function recordPlayerSeq(buttonPressed) {
  game.playerSeq.push(buttonPressed);
  playerTurn(buttonPressed);
} 

function playerTurn(move) {
  if (game.playerSeq[game.playerSeq.length-1] !== game.newSeq[game.playerSeq.length-1]) {
    if(game.strict){
      alert('Starting Over!');
      newGame();
    } else {
      alert('Wrong move! Try again!');
      playSeq();
    }
   } else {
      console.log('Nice!');
      var targ = move + 'Sound';
      game.sounds[targ].play();
      if (game.playerSeq.length === game.counter+1) {
        if(game.counter == 20){
          alert('You won!');
        } else {
          alert('Next round!');
          newRound();
        }
      }
    }
}

function newRound() {
  increaseCounter();
}

// initiate all buttons
game.buttonsInit();

if (module.hot) {
  module.hot.accept();
}
