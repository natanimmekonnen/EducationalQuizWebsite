document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.startBtn');
    const popupInfo = document.querySelector('.popup-info');
    const exitButton = document.querySelector('.exit-btn');
    const main = document.querySelector('.main');
    const continueButton = document.querySelector('.continue-btn');
    const quizSection = document.querySelector('.quiz-section');
    const quizBox = document.querySelector('.quiz-box');
    const resultBox = document.querySelector('.result-box');
    const tryAgainButton = document.querySelector('.tryAgain-btn');
    const goHomeButton = document.querySelector('.goHome-btn');
    const nextBtn = document.querySelector('.next-btn');
    const optionList = document.querySelector('.option-list');
    const MAX_QUESTIONS = 10;
    let questions = questionsSet1;
    

    let questionCount = 0;
    let questionNumb = 1;
    let userScore = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startButton.onclick = () => {
        popupInfo.classList.add('active');
        main.classList.add('active');
    };

    exitButton.onclick = () => {
        popupInfo.classList.remove('active');
        main.classList.remove('active');
    };

    continueButton.onclick = () => {
        shuffleArray(questions);  
        quizSection.classList.add('active');
        popupInfo.classList.remove('active');
        main.classList.remove('active');
        quizBox.classList.add('active');

        questionCount = 0;  
        questionNumb = 1;
        userScore = 0;

        showQuestions(questionCount);
        questionCounter(questionNumb);
        headerScore();
    };

    tryAgainButton.onclick = () => {
        quizBox.classList.add('active');
        nextBtn.classList.remove('active');
        resultBox.classList.remove('active');

        questionCount = 0;  
        questionNumb = 1;
        userScore = 0;

        shuffleArray(questions);  
        showQuestions(questionCount);
        questionCounter(questionNumb);
        headerScore();
    };

    goHomeButton.onclick = () => {
        quizSection.classList.remove('active');
        nextBtn.classList.remove('active');
        resultBox.classList.remove('active');

        questionCount = 0;  
        questionNumb = 1;
        userScore = 0;

        showQuestions(questionCount);
        questionCounter(questionNumb);
        headerScore();
    };

    nextBtn.onclick = () => {
        if (questionCount < Math.min(questions.length, MAX_QUESTIONS) - 1) {
            questionCount++;
            showQuestions(questionCount);
            questionNumb++;
            questionCounter(questionNumb);

            nextBtn.classList.remove('active');
        } else {
            console.log('Question Completed');
            showResultBox();
        }
    };

    function showQuestions(index) {
        const questionText = document.querySelector('.question-text');
        questionText.textContent = `${questions[index].question}`;

        let optionTag = `<div class="option">${questions[index].options[0]}<span></span></div>
        <div class="option">${questions[index].options[1]}<span></span></div>
        <div class="option">${questions[index].options[2]}<span></span></div>
        <div class="option">${questions[index].options[3]}<span></span></div>`;

        optionList.innerHTML = optionTag;
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', optionSelected);
        });
    }

    function optionSelected(event) {
        let userAnswer = event.target.textContent.trim();
        let correctAnswer = questions[questionCount].answer.trim();
        let allOptions = optionList.children.length;

        if (userAnswer === correctAnswer) {
            event.target.classList.add('correct');
            userScore += 1;
            headerScore();
        } else {
            event.target.classList.add('incorrect');
            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAnswer) {
                    optionList.children[i].setAttribute('class', 'option correct');
                }
            }
        }
        for (let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add('disabled');
        }
        nextBtn.classList.add('active');
    }

    function questionCounter(index) {
        const questionTotal = document.querySelector('.question-total');
        questionTotal.textContent = `${index} of ${Math.min(questions.length, MAX_QUESTIONS)} Questions`;
    }

    function headerScore() {
        const headerScoreText = document.querySelector('.header-score');
        headerScoreText.textContent = `Score: ${userScore} /${Math.min(questions.length, MAX_QUESTIONS)}`;
    }

    function showResultBox() {
        quizBox.classList.remove('active');
        resultBox.classList.add('active');

        const scoreText = document.querySelector('.score-text');
        scoreText.textContent = `Your Score: ${userScore} out of ${Math.min(questions.length, MAX_QUESTIONS)}`;
        const circularProgress = document.querySelector('.circular-progress');
        const progressValue = document.querySelector('.progress-value');
        let progressStartValue = -1;
        let progressEndValue = (userScore / Math.min(questions.length, MAX_QUESTIONS)) * 100;
        let speed = 20;

        let progress = setInterval(() => {
            progressStartValue++;

            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(rgb(241, 81, 23) ${progressStartValue * 3.6}deg, rgba(226, 208, 175,.7) 0deg)`;

            if (progressStartValue == progressEndValue) {
                clearInterval(progress);
            }
        }, speed);
    }
    document.querySelector('.set1-btn').onclick = () => {
        questions = questionsSet1;
        popupInfo.classList.add('active');
        main.classList.add('active');
        // resetQuiz();
    };
    
    document.querySelector('.set2-btn').onclick = () => {
        questions = questionsSet2;
        popupInfo.classList.add('active');
        main.classList.add('active');
        // resetQuiz();
    };
    document.querySelector('.set3-btn').onclick = () => {
        questions = questionsSet3;
        popupInfo.classList.add('active');
        main.classList.add('active');
        // resetQuiz();
    };
    function resetQuiz() {
        shuffleArray(questions);
        questionCount = 0;
        questionNumb = 1;
        userScore = 0;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        headerScore();
        quizSection.classList.add('active');
        main.classList.remove('active');
        quizBox.classList.add('active');
        nextBtn.classList.remove('active');
    }
});
