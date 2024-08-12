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

    startButton.onclick = () => {
        popupInfo.classList.add('active');
        main.classList.add('active');
    };

    exitButton.onclick = () => {
        popupInfo.classList.remove('active');
        main.classList.remove('active');
    };

    continueButton.onclick = () => {
        quizSection.classList.add('active');
        popupInfo.classList.remove('active');
        main.classList.remove('active');
        quizBox.classList.add('active');

        showQuestions(0);
        questionCounter(1);
        headerScore();
    };

    tryAgainButton.onclick = () => {
        quizBox.classList.add('active');
        nextBtn.classList.remove('active');
        resultBox.classList.remove('active');

        questionCount = 0;
        questionNumb = 1;
        userScore=0;
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
        userScore=0;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        headerScore();
    
    };


    const nextBtn = document.querySelector('.next-btn');
    nextBtn.onclick = () => {
        if (questionCount < questions.length - 1) {
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
 
    
 
    const optionList = document.querySelector('.option-list');

    let questionCount = 0;
    let questionNumb = 1;
    let userScore=0;

    function showQuestions(index) {
        const questionText = document.querySelector('.question-text');
        questionText.textContent = `${questions[index].numb}.${questions[index].question}`;

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
        let allOptions=optionList.children.length;
        
        if (userAnswer === correctAnswer) {
           
            event.target.classList.add('correct');
            userScore+=1;
            headerScore();
        } else {

            event.target.classList.add('incorrect');
            for(let i=0;i<allOptions;i++){
               if(optionList.children[i].textContent==correctAnswer){
                optionList.children[i].setAttribute('class','option correct');

               }
                
            }
        }
        for(let i=0;i<allOptions;i++){
            optionList.children[i].classList.add('disabled');

        }
        nextBtn.classList.add('active');
    }

    function questionCounter(index) {
        const questionTotal = document.querySelector('.question-total');
        questionTotal.textContent = `${index} of ${questions.length} Questions`;
    }
    function headerScore(){
        const headerScoreText=document.querySelector('.header-score');
        headerScoreText.textContent=`Score: ${userScore}  /${questions.length}`;

    }

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText=document.querySelector('.score-text')
    scoreText.textContent=`Your Score: ${userScore} out of ${questions.length}`;
    const cirularProgress=document.querySelector('.circular-progress')
    const progressValue=document.querySelector('.progress-value')
    let progressStartValue=-1;
    let progressEndValue=(userScore/questions.length)*100;
    let speed=20;

    let progress=setInterval(()=>{
        progressStartValue++;

        progressValue.textContent=`${progressStartValue}%`;
        cirularProgress.style.background=`conic-gradient(rgb(241, 81, 23) ${progressStartValue*3.6}deg, rgba(226, 208, 175,.7) 0deg)`;


        if(progressStartValue==progressEndValue){
            clearInterval(progress);
        }

    }, speed);


}













});
