let currentQuestionIndex = 0;
const questions = [
    {
        question: "Ai dễ thương nhất nhà?",
        options: ["Kim Thư", "Chị Thư", "Minh Thư", "Tuấn Anh", "Thảo Nhi", "Chị My"],
        answer: 3
    },
    {
        question: "Ngồi kế ai lạnh nhất nhà(mát mát)?",
        options: ["Chị My", "Tuấn Anh", "Thảo Nhi", "Chị Thư", "Minh Thư", "Kim Thư"],
        answer: 1
    },
    {
        question: "Ai là người trẻ nhất nhà?",
        options: ["Tuấn Anh", "Minh Thư", "Thảo Nhi", "Chị Thư", "Chị My", "Kim Thư"],
        answer: 0
    }
];

const musicBefore = new Audio('music_before.mp3');
const musicAfter = new Audio('music_after.mp3');
const correctAnswerSound = new Audio('correct_answer.mp3');
const clapSound = new Audio('clap.mp3');

window.onload = function() {
    document.getElementById("closeButton").style.display = 'none';
    document.getElementById("quizSection").style.display = 'none';
    document.getElementById("resultCard").style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    const wrongAnswerBtn = document.querySelectorAll('.option.wrong');

    wrongAnswerBtn.forEach(button => {
        button.addEventListener('mouseenter', () => {
            moveButton(button);
        });

        button.addEventListener('mouseleave', () => {
            button.style.position = 'static';
        });
    });
});

function moveButton(button) {
    const moveInterval = setInterval(() => {
        const randomX = Math.random() * (window.innerWidth - button.offsetWidth);
        const randomY = Math.random() * (window.innerHeight - button.offsetHeight);

        button.style.position = 'absolute';
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
    }, 100);

    button.addEventListener('mouseleave', () => {
        clearInterval(moveInterval);
        button.style.position = 'static';
    });
}

function startQuiz() {
    document.getElementById("startSection").style.display = "none";
    document.getElementById("quizSection").style.display = "block";
    musicBefore.play();
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const options = document.querySelectorAll(".option");
    questionElement.innerText = questions[currentQuestionIndex].question;
    options.forEach((option, index) => {
        if (questions[currentQuestionIndex].options[index] !== undefined) {
            option.innerText = questions[currentQuestionIndex].options[index];
            option.style.display = 'inline-block';
            option.classList.remove("correct", "wrong", "disabled");
        } else {
            option.style.display = 'none';
        }
    });
    document.getElementById("result").innerText = "";
    document.getElementById("next").style.display = "none";
}

function checkAnswer(selected) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const options = document.querySelectorAll(".option");

    if (selected === correctAnswer) {
        options[selected].classList.add("correct");
        document.getElementById("result").innerText = "Đúng rồi!";
        correctAnswerSound.play();
        clapSound.play();
    } else {
        options[selected].classList.add("wrong");
        options[correctAnswer].classList.add("correct");
        document.getElementById("result").innerText = "Sai rồi!";
    }

    options.forEach(option => option.classList.add("disabled"));
    document.getElementById("next").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        document.getElementById("quizSection").style.display = "none";
        document.getElementById("resultCard").style.display = "flex";
        document.body.classList.remove("background-quiz");
        document.body.classList.add("background-message");
    }
}

function showMessage() {
    const message = document.getElementById("hiddenMessage");
    const showButton = document.getElementById("showMessageBtn");
    const closeButton = document.getElementById("closeButton");
    const music = document.getElementById("backgroundMusic");

    musicBefore.pause();
    musicBefore.currentTime = 0;

    message.classList.add('show');
    showButton.style.display = 'none';
    closeButton.style.display = 'inline-block';
    music.play();
    musicAfter.play();
    createRoses();
}

function closeWindow() {
    alert('Bái baiiiii!');
    window.close();
}

function createRoses() {
    const rosesContainer = document.getElementById('rosesContainer');
    for (let i = 0; i < 68; i++) {
        const rose = document.createElement('div');
        rose.classList.add('rose');
        rose.style.left = Math.random() * window.innerWidth + 'px';
        rose.style.animationDuration = Math.random() * 5 + 5 + 's';
        rosesContainer.appendChild(rose);
    }
}
