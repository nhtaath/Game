let currentQuestionIndex = 0;
const questions = [
    {
        question: "Ai dễ thương nhất nhà?",
        options: ["Kim Thư", "Anh Thư", "Minh Thư", "Tuấn Anh", "Thảo Nhi", "Bà Thảo"],
        answer: 3
    },
    {
        question: "Ngồi kế ai lạnh nhất nhà(mát mát)?",
        options: ["Bà Thảo", "Tuấn Anh", "Thảo Nhi", "Anh Thư", "Minh Thư", "Kim Thư"],
        answer: 1
    },
    {
        question: "Ai là người trẻ nhất nhà?",
        options: ["Tuấn Anh", "Minh Thư", "Thảo Nhi", "Anh Thư", "Bà Thảo", "Kim Thư"],
        answer: 0
    }
];

// Thêm biến âm thanh
const musicBefore = new Audio('music_before.mp3');
const musicAfter = new Audio('music_after.mp3');
const correctAnswerSound = new Audio('correct_answer.mp3'); // Âm thanh trả lời đúng
const clapSound = new Audio('clap.mp3'); // Âm thanh vỗ tay

// Khi tải trang, ẩn các phần không cần thiết
window.onload = function() {
    document.getElementById("closeButton").style.display = 'none'; // Ẩn nút "Hết gòi"
    document.getElementById("quizSection").style.display = 'none'; // Ẩn phần Quiz
    document.getElementById("resultCard").style.display = 'none'; // Ẩn phần lời chúc
};

// Chức năng bắt đầu quiz
function startQuiz() {
    document.getElementById("startSection").style.display = "none"; // Ẩn phần bắt đầu
    document.getElementById("quizSection").style.display = "block"; // Hiện phần Quiz
    musicBefore.play(); // Phát âm thanh trước khi bắt đầu
    showQuestion();
}

// Hiển thị câu hỏi hiện tại
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
            option.style.display = 'none'; // Ẩn các nút không cần thiết
        }
    });
    document.getElementById("result").innerText = "";
    document.getElementById("next").style.display = "none"; // Ẩn nút "Câu tiếp theo"
}

function checkAnswer(selected) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const options = document.querySelectorAll(".option");

    if (selected === correctAnswer) {
        options[selected].classList.add("correct");
        document.getElementById("result").innerText = "Đúng rồi!";
        correctAnswerSound.play(); // Phát âm thanh khi trả lời đúng
        clapSound.play(); // Phát âm thanh vỗ tay
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
        // Ẩn phần Quiz sau khi hoàn thành
        document.getElementById("quizSection").style.display = "none"; // Ẩn phần Quiz
        document.getElementById("resultCard").style.display = "flex"; // Hiện phần lời chúc
        document.body.classList.remove("background-quiz"); // Xóa background quiz
        document.body.classList.add("background-message"); // Thêm background cho lời chúc
    }
}

function showMessage() {
    const message = document.getElementById("hiddenMessage");
    const showButton = document.getElementById("showMessageBtn");
    const closeButton = document.getElementById("closeButton");
    const music = document.getElementById("backgroundMusic");

    // Dừng nhạc nền trước khi phát nhạc mới
    musicBefore.pause(); // Dừng nhạc trước
    musicBefore.currentTime = 0; // Đặt lại thời gian phát về 0

    message.classList.add('show');
    showButton.style.display = 'none'; // Ẩn nút "Xem lời chúc"
    closeButton.style.display = 'inline-block'; // Hiện nút "Hết gòi"
    music.play(); // Phát nhạc nền cho lời chúc
    musicAfter.play(); // Phát âm thanh sau khi hoàn thành quiz
    createRoses();
}
function closeWindow() {
    alert('Bái baiiiii!');
    window.close();
}

// Tạo hiệu ứng hoa hồng rơi
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