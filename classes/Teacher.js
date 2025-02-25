import { Exam } from "./Exam.js";

export class Teacher {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

	createExam(title, questions) {
		return new Exam(title, questions);
	}
}
