document.addEventListener("DOMContentLoaded", () => {
  // Element selectors
  const startButton = document.querySelector(".startBtn");
  const popupInfo = document.querySelector(".popup-info");
  const exitButton = document.querySelector(".exit-btn");
  const main = document.querySelector(".main");
  const continueButton = document.querySelector(".continue-btn");
  const quizSection = document.querySelector(".quiz-section");
  const quizBox = document.querySelector(".quiz-box");
  const resultBox = document.querySelector(".result-box");
  const tryAgainButton = document.querySelector(".tryAgain-btn");
  const goHomeButton = document.querySelector(".goHome-btn");
  const goAboutUsButton = document.querySelector(".goHome-btn");
  const nextBtn = document.querySelector(".next-btn");
  const optionList = document.querySelector(".option-list");
  const aboutSection = document.querySelector(".about-section");
  const MAX_QUESTIONS = 10; // Max number of questions to be displayed in a quiz session
  let questions = questionsSet1; // Default question set

  // Trackers for the quiz
  let questionCount = 0;
  let questionNumb = 1;
  let userScore = 0;

  // Handle navigation bar link clicks for adding 'active' class
  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove 'active' class from all links
      navLinks.forEach((nav) => nav.classList.remove("active"));

      // Add 'active' class to the clicked link
      this.classList.add("active");
    });
  });

  // Function to shuffle the question array for randomness
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Start button click event to show the quiz information popup
  startButton.onclick = () => {
    popupInfo.classList.add("active");
    main.classList.add("active");
  };

  // Exit button click event to hide the quiz information popup
  exitButton.onclick = () => {
    popupInfo.classList.remove("active");
    main.classList.remove("active");
  };

  // Continue button click event to start the quiz
  continueButton.onclick = () => {
    shuffleArray(questions); // Shuffle questions for randomness
    quizSection.classList.add("active");
    popupInfo.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add("active");

    // Reset quiz progress
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount); // Display the first question
    questionCounter(questionNumb); // Update question counter
    headerScore(); // Update the header score display
  };

  // Try again button click event to restart the quiz
  tryAgainButton.onclick = () => {
    quizBox.classList.add("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    // Reset quiz progress
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    shuffleArray(questions); // Shuffle questions for randomness
    showQuestions(questionCount); // Display the first question
    questionCounter(questionNumb); // Update question counter
    headerScore(); // Update the header score display
  };

  // Go home button click event to go back to the main menu
  goHomeButton.onclick = () => {
    quizSection.classList.remove("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    // Reset quiz progress
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount); // Display the first question
    questionCounter(questionNumb); // Update question counter
    headerScore(); // Update the header score display
  };

  // Next button click event to go to the next question
  nextBtn.onclick = () => {
    if (questionCount < Math.min(questions.length, MAX_QUESTIONS) - 1) {
      questionCount++; // Move to the next question
      showQuestions(questionCount); // Display the next question
      questionNumb++;
      questionCounter(questionNumb); // Update question counter

      nextBtn.classList.remove("active"); // Hide the next button until an option is selected
    } else {
      console.log("Question Completed");
      showResultBox(); // Show the result box when all questions are completed
    }
  };

  // Function to display the current question and options
  function showQuestions(index) {
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${questions[index].question}`; // Display the question

    // Create HTML for options
    let optionTag = `<div class="option">${questions[index].options[0]}<span></span></div>
        <div class="option">${questions[index].options[1]}<span></span></div>
        <div class="option">${questions[index].options[2]}<span></span></div>
        <div class="option">${questions[index].options[3]}<span></span></div>`;

    optionList.innerHTML = optionTag; // Add options to the DOM

    // Add click event listeners to each option
    const options = document.querySelectorAll(".option");
    options.forEach((option) => {
      option.addEventListener("click", optionSelected);
    });
  }

  // Function to handle when an option is selected
  function optionSelected(event) {
    let userAnswer = event.target.textContent.trim(); // Get the user's answer
    let correctAnswer = questions[questionCount].answer.trim(); // Get the correct answer
    let allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
      event.target.classList.add("correct"); // Mark correct answer
      userScore += 1; // Increment user score
      headerScore(); // Update the header score display
    } else {
      event.target.classList.add("incorrect"); // Mark incorrect answer
      // Highlight the correct answer
      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAnswer) {
          optionList.children[i].setAttribute("class", "option correct");
        }
      }
    }
    // Disable all options after one is selected
    for (let i = 0; i < allOptions; i++) {
      optionList.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("active"); // Show the next button after an answer is selected
  }

  // Function to update the question counter display
  function questionCounter(index) {
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index} of ${Math.min(
      questions.length,
      MAX_QUESTIONS
    )} Questions`;
  }

  // Function to update the header score display
  function headerScore() {
    const headerScoreText = document.querySelector(".header-score");
    headerScoreText.textContent = `Score: ${userScore} /${Math.min(
      questions.length,
      MAX_QUESTIONS
    )}`;
  }

  // Function to show the result box with the user's score
  function showResultBox() {
    quizBox.classList.remove("active"); // Hide the quiz box
    resultBox.classList.add("active"); // Show the result box

    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your Score: ${userScore} out of ${Math.min(
      questions.length,
      MAX_QUESTIONS
    )}`; // Display the user's score

    // Circular progress for score display
    const circularProgress = document.querySelector(".circular-progress");
    const progressValue = document.querySelector(".progress-value");
    let progressStartValue = -1;
    let progressEndValue =
      (userScore / Math.min(questions.length, MAX_QUESTIONS)) * 100;
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

  // Set 1 button click event to select the first set of questions
  document.querySelector(".set1-btn").onclick = () => {
    questions = questionsSet1;
    popupInfo.classList.add("active");
    main.classList.add("active");
    // resetQuiz();
  };

  // Set 2 button click event to select the second set of questions
  document.querySelector(".set2-btn").onclick = () => {
    questions = questionsSet2;
    popupInfo.classList.add("active");
    main.classList.add("active");
    // resetQuiz();
  };

  // Set 3 button click event to select the second set of questions
  document.querySelector(".set3-btn").onclick = () => {
    questions = questionsSet3;
    popupInfo.classList.add("active");
    main.classList.add("active");
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
    quizSection.classList.add("active");
    main.classList.remove("active");
    quizBox.classList.add("active");
    nextBtn.classList.remove("active");
  }
});
