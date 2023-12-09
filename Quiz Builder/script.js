let quizQuestions = [];
let currentQuestion = 0;
let userAnswers = [];

function showCreateQuiz() {
    document.getElementById('createQuiz').style.display = 'block';
    document.getElementById('takeQuiz').style.display = 'none';
    document.getElementById('quizListing').style.display = 'none';
}

function showTakeQuiz() {
    document.getElementById('takeQuiz').style.display = 'block';
    document.getElementById('createQuiz').style.display = 'none';
    document.getElementById('quizListing').style.display = 'none';
    startQuiz();
}

function showQuizListing() {
    document.getElementById('quizListing').style.display = 'block';
    document.getElementById('createQuiz').style.display = 'none';
    document.getElementById('takeQuiz').style.display = 'none';
    displayQuizList();
}

function createQuiz(event) {
    event.preventDefault();

    const question = document.getElementById('question').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const correctAnswerIndex = document.getElementById('correctAnswer').selectedIndex;

    console.log('Question:', question);
    console.log('Option 1:', option1);
    console.log('Option 2:', option2);
    console.log('Option 3:', option3);
    console.log('Option 4:', option4);
    console.log('Correct Answer Index:', correctAnswerIndex);

    const quizItem = {
        question,
        options: [option1, option2, option3, option4],
        correctAnswerIndex,
    };

    quizQuestions.push(quizItem);

    document.getElementById('quizForm').reset();
}


function startQuiz() {
    if (quizQuestions.length === 0) {
        alert('No quizzes available. Create a quiz first.');
        return;
    }

    currentQuestion = 0;
    userAnswers = [];
    displayQuizQuestion();
}

function displayQuizQuestion() {
    const quizDisplay = document.getElementById('quizDisplay');
    quizDisplay.innerHTML = `
        <p>${quizQuestions[currentQuestion].question}</p>
        <ul>
            ${quizQuestions[currentQuestion].options.map((option, index) => `
                <li>
                    <input type="radio" name="answer" value="${index}" id="option${index}">
                    <label for="option${index}">${option}</label>
                </li>
            `).join('')}
        </ul>
    `;
}

function submitQuiz() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert('Please select an answer.');
        return;
    }
    const selectedAnswerIndex = Number(selectedAnswer.value);
    const correctAnswerIndex = quizQuestions[currentQuestion].correctAnswerIndex;
    if (selectedAnswerIndex === correctAnswerIndex) {
        userAnswers.push(true);
    } else {
        userAnswers.push(false);
    }
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        displayQuizQuestion();
    } else {
        showQuizResults();
    }
}
function showQuizResults() {
    let score = 0;

    for (let i = 0; i < quizQuestions.length; i++) {
        if (userAnswers[i] === true) {
            score++;
        }
    }

    alert(`Your final score is ${score}/${quizQuestions.length}`);
}
function displayQuizList() {
    const quizList = document.getElementById('quizList');
    quizList.innerHTML = quizQuestions.map((quiz, index) => `
        <li>
            <strong>Quiz ${index + 1}</strong>: ${quiz.question}
        </li>
    `).join('');
}
