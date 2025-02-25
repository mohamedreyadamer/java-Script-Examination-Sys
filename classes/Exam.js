export class Exam {
	constructor(title, questions) {
		this.title = title;
		this.questions = questions;
		this.currentIndex = 0;
		this.score = 0;
	}

	getCurrentQuestion() {
		return this.questions[this.currentIndex];
	}

	checkAnswer(answer) {
		if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
			this.score++;
		}
	}

	nextQuestion() {
		this.currentIndex++;
	}

	isFinished() {
		return this.currentIndex >= this.questions.length;
	}
}

