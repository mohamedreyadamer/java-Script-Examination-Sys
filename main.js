import { Student } from "./classes/Student.js";
import { Teacher } from "./classes/Teacher.js";
import { Exam } from "./classes/Exam.js";
import { Question } from "./classes/Question.js";


const teacher = new Teacher(1, "Mr. Ahmed");
const questions = [
	new Question("?...السيدة الملقبة بجدة العرب هي ", ["السيدة هاجر", "السيدة سارة", "السيدة خديجة"], "السيدة هاجر", "./image/1ph.webp", 10),
	new Question("?....الحيوان الأسرع في العالم، هو.", ["النمر", "الثعلب", "الفهد"], "الفهد", "image/2ph.webp", 10),
	new Question("يُلقب بسفينة الصحراء، فمن هو؟!", ["الأسد", "الجمل", "الارنب"], "الجمل", "image/4ph.jpg", 10),
	new Question("في أي دولة تقع الأهرامات؟!"
		, ["مصر", "سوريا", "الكويت"], "مصر", "image/5ph.jpg", 10),

	new Question("ما هو أول بيت وضع للناس؟",
		["المسجد الحرام", "المسجد النبوي", "المسجد الأقصى"],
		"المسجد الحرام",
		"image/6ph.jpg",
		10),

	new Question("ما هي أعظم آية في القرآن الكريم؟",
		["آية الكرسي", "سورة الفاتحة", "سورة الإخلاص"],
		"آية الكرسي",
		"image/7ph.jpg",
		10),

	new Question("من هو النبي الذي ابتلعه الحوت؟",
		["يوسف عليه السلام", "يونس عليه السلام", "موسى عليه السلام"],
		"يونس عليه السلام",
		"image/8ph.jpg",
		10),

	new Question("ما هو اسم والدة النبي محمد ﷺ؟",
		["عائشة بنت أبي بكر", "آمنة بنت وهب", "خديجة بنت خويلد"],
		"آمنة بنت وهب",
		"image/9ph.jpg",
		10),

	new Question("كم عدد أركان الإسلام؟",
		["ثلاثة", "خمسة", "سبعة"],
		"خمسة",
		"image/10ph.png",
		10)


];

const exam = teacher.createExam("E Exam", questions);
const student = new Student(101, "Ali");

//select elm
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const bulletsContainer = document.getElementById("bullets-container");
const resultContainer = document.getElementById("result-container");
const timerElement = document.getElementById("timer");

let timer;


function loadQuestion() {
	clearInterval(timer);
	if (!exam.isFinished()) {
		const q = exam.getCurrentQuestion();
		questionContainer.innerHTML = `<h3>${q.text}</h3>`;

		if (q.image) {
			questionContainer.innerHTML += `<img src="${q.image}" alt="Question Image" class="question-image">`;
		}

		q.choices.forEach((choice, index) => {
			questionContainer.innerHTML += `
                <div class="answer">
                    <input type="radio" id="answer_${index}" name="question" value="${choice}" />
                    <label for="answer_${index}">${choice}</label>
                </div>
            `;
		});

		startTimer(q.timeLimit);
		nextBtn.style.display = "none";
	} else {
		showResult();
	}
}


function startTimer(seconds) {
	let timeLeft = seconds;
	updateTimer(timeLeft);
	nextBtn.style.display = "none";

	timer = setInterval(() => {
		timeLeft--;
		updateTimer(timeLeft);

		if (timeLeft === 0) {
			clearInterval(timer);
			nextQuestion();
		}
	}, 1000);
}
function updateTimer(time) {
	timerElement.textContent = `00:${String(time).padStart(2, "0")}`;
}

function nextQuestion() {
	const selected = document.querySelector("input[name='question']:checked");
	if (selected) {
		exam.checkAnswer(selected.value);
	}

	exam.nextQuestion();
	updateBullets();

	if (exam.isFinished()) {
		nextBtn.style.display = "none";
		showResult();
	} else {
		loadQuestion();
	}
}





questionContainer.addEventListener("change", () => {
	if (document.querySelector("input[name='question']:checked")) {
		nextBtn.style.display = "block";
	}
});


nextBtn.addEventListener("click", () => {
	const selectedAnswer = document.querySelector("input[name='question']:checked");
	if (selectedAnswer) {
		exam.checkAnswer(selectedAnswer.value);
	}
	exam.nextQuestion();
	updateBullets();
	loadQuestion();
});


function updateBullets() {
	bulletsContainer.innerHTML = "";
	questions.forEach((_, i) => {
		bulletsContainer.innerHTML += `<span class="${i < exam.currentIndex ? 'on' : ''}"></span>`;
	});
}


// function showResult() {
// 	resultContainer.innerHTML = `<span>You answered ${exam.score} out of ${questions.length} correctly!</span>`;
// }
function showResult() {
	nextBtn.style.display = "none";
	// percentage
	const scorePercentage = (exam.score / questions.length) * 100;

	resultContainer.innerHTML = `
        <canvas id="resultCanvas" width="150" height="150"></canvas>
        <p>${scorePercentage.toFixed(1)}% Correct</p>
    `;

	const canvas = document.getElementById("resultCanvas");
	const ctx = canvas.getContext("2d");
	const radius = 60;
	const center = 75;
	// Convert percentage
	const endAngle = (scorePercentage / 100) * 2 * Math.PI;

	// background circle
	ctx.strokeStyle = "#ddd";
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.arc(center, center, radius, 0, 2 * Math.PI);
	ctx.stroke();

	//  progress circle in green
	ctx.strokeStyle = "#4CAF50";
	ctx.beginPath();
	ctx.arc(center, center, radius, -0.5 * Math.PI, endAngle - 0.5 * Math.PI);
	ctx.stroke();
}



loadQuestion();
