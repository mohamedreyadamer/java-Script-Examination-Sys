export class Question {
	constructor(text, choices, correctAnswer, image, timeLimit) {
		this.text = text;
		this.choices = choices;
		this.correctAnswer = correctAnswer;
		this.image = image;
		this.timeLimit = timeLimit;
	}

	isCorrectAnswer(answer) {
		return answer === this.correctAnswer;
	}
}


