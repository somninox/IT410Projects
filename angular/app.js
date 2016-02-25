(function() {
	var app = angular.module('app', []);

	app.controller('AppController', [function() {
		var answer = Math.round(Math.random() * 100);

		this.guess = 50;

		this.guesses = [];

		this.remaining = 7;

		this.message = '';

		this.reveal;

		this.checkGuess = function(e) {
			e.preventDefault();
			this.remaining--;
			if(this.guess == answer){
				this.message = 'You are so right!';
				this.done = true;
			}
			else if(this.guess < answer){
				this.message = "Guess higher";
			}
			else if(this.guess > answer){
				this.message = "Guess lower";
			}
			if(this.remaining === 0){
				this.reveal = answer;
				this.done = true;
			}

			this.guesses.push(this.guess);
			
		}
	}])
})();