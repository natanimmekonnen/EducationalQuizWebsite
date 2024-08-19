const stickySections = [...document.querySelectorAll(".sticky")];

window.addEventListener("scroll", (e) => {
  for (let i = 0; i < stickySections.length; i++) {
    transform(stickySections[i]);
  }
});
function transform(section) {
  const offsetTop = section.parentElement.offsetTop;
  const scrollSection = section.querySelector(".scroll-section");

  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
  percentage = percentage < 0 ? 0 : percentage > 800 ? 800 : percentage;

  scrollSection.style.transform = `translate3d(${-percentage}vw, 0 ,0)`;
}

let questions; // or bioQuestions, webTechQuestions
document.title === "Math"
  ? (questions = mathQuestions)
  : document.title == "Biology"
  ? (questions = bioQuestions)
  : (questions = webTechQuestions);
const questionSheet = document.querySelectorAll(".question");

// Function to display questions
function displayQuestions(questions) {
  const questionSheet = document.querySelectorAll(".question");
  let i = 0;
  // Loop through each question in questionSheet
  questionSheet.forEach((questionElement, index) => {
    // Access and modify the question text
    const questionTextElement = questionElement.querySelector(".question-text");
    questionTextElement.innerHTML = `<span class="question-number">${`${questions[index].numb}`}. </span>${
      questions[index].question
    }`;
    // Access and modify each option
    const options = questionElement.querySelectorAll(".option");
    options.forEach((optionElement, optionIndex) => {
      const optionText = optionElement.querySelector("p");
      optionText.textContent = `${questions[index].options[optionIndex]}`;
      optionElement.setAttribute("qnum", questions[index].numb);
    });
  });
}

// Display the questions
displayQuestions(questions);

const options = document.querySelectorAll(".option");
let click = [];

options.forEach((option) => {
  option.addEventListener("click", addToClick);
});

function addToClick(event) {
  const clicked = event.currentTarget;
  //   console.log(clicked.parentElement);
  if (!click.includes(clicked)) {
    click.push(clicked);
    handleClicks(clicked);
  }
}
let correctAnswers = 0;

function handleClicks(clicked) {
  const num = Number(clicked.getAttribute("qnum"));
  const answer = questions[num - 1].answer.trim();
  const options = document.getElementsByClassName(`option${num}`);
  console.log(options);
  if (clicked.textContent.trim() !== answer) {
    clicked.style.backgroundColor = "#f44336";
    correctAnswers++;
  }

  for (let i = 0; i < 4; i++) {
    // Check if the text content of the option matches the answer
    if (options[i].textContent.trim() === answer) {
      options[i].style.backgroundColor = "#4caf50"; // Set background color to green
    }
    // Disable pointer events and change cursor style
    options[i].style.cursor = "not-allowed";
    options[i].style.pointerEvents = "none";
  }
}

function checkIfFull() {
  if (click.length === 10) calculateResult();
  console.log(click.length);
}

function calculateResult() {
  // const result = document.getElementById("result");
  // result.textContent = `Your result is ${10 - correctAnswers} /10`;
  showResultBox();
  clearInterval(intervallID);
}
const intervallID = setInterval(checkIfFull, 1000);

let i = 0;

function nextNumber() {
  i = (i % 3) + 1;
}

const footer = document.getElementById("footer");

function footerAnimation() {
  const names = [
    "../assets/footer1.svg",
    "../assets/footer2.svg",
    "../assets/footer3.svg",
  ];

  footer.style.backgroundImage = `url(${names[i - 1]})`;
  footer.style.transition = "2s ease-in-out";
  nextNumber();
}

footerAnimation();

setInterval(footerAnimation, 2000);

function showResultBox() {
  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score: ${10 - correctAnswers} out of ${Math.min(
    questions.length,
    10
  )}`; // Display the user's score

  // Circular progress for score display
  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");
  let progressStartValue = -1;
  let progressEndValue =
    ((10 - correctAnswers) / Math.min(questions.length, 10)) * 100;
  let speed = 20; // Speed of progress bar

  // Animate the circular progress bar
  let progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(rgb(241, 81, 23) ${
      progressStartValue * 3.6
    }deg, rgba(226, 208, 175,.7) 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress); // Stop animation when it reaches the target value
    }
  }, speed);
}
