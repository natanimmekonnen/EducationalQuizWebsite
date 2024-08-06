const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('option'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
      question: 'Which process converts light energy into chemical energy?',
        choice1: 'Photosynthesis',
        choice2: 'Respiration',
        choice3: 'Digestion',
        choice4: 'Reproduction',
        answer: 1,
      
    },
    {
        question:
            "What is the basic unit of life?",
        choice1: "Cell",
        choice2: "Tissue",
        choice3: "Organ",
        choice4: "Organism",
        answer: 3,
    },
    {
        question: " The process by which cells divide to produce new cells is called?",
        choice1: "Mitosis",
        choice2: "Diffusion",
        choice3: "Osmosis",
        choice4: "Meiosis",
        answer: 4,
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    console.log(availableQuesions)
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('/C:\Users\mekon\Downloads\Telegram Desktop\EducationalQuizWebsite\Html Folder\BlankSpace.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
          selectedChoice.classList.remove(classToApply);
        getNewQuestion();
    },5000);
});
});

startGame();