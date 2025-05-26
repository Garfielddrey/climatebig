document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizContainer = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const feedbackElement = document.getElementById('feedback');
    const resultsContainer = document.getElementById('results');
    const scoreTextElement = document.getElementById('score-text');
    const resultMessageElement = document.getElementById('result-message');
    
    let shuffledQuestions, currentQuestionIndex, score;
    
    const questions = [
        {
            question: "What is the primary greenhouse gas responsible for recent climate change?",
            answers: [
                { text: "Carbon dioxide (CO₂)", correct: true },
                { text: "Methane (CH₄)", correct: false },
                { text: "Nitrous oxide (N₂O)", correct: false },
                { text: "Water vapor (H₂O)", correct: false }
            ],
            explanation: "While all these are greenhouse gases, CO₂ from burning fossil fuels is the primary driver of recent climate change due to the massive quantities emitted."
        },
        {
            question: "Which of these is NOT a major consequence of climate change?",
            answers: [
                { text: "Rising sea levels", correct: false },
                { text: "More intense hurricanes", correct: false },
                { text: "Global cooling", correct: true },
                { text: "Ocean acidification", correct: false }
            ],
            explanation: "Climate change causes global warming, not cooling. The other options are well-documented impacts of climate change."
        },
        {
            question: "What percentage of climate scientists agree that humans are causing global warming?",
            answers: [
                { text: "50-60%", correct: false },
                { text: "70-80%", correct: false },
                { text: "90-95%", correct: false },
                { text: "Over 97%", correct: true }
            ],
            explanation: "Multiple studies have found that 97% or more of actively publishing climate scientists agree that humans are causing global warming."
        },
        {
            question: "Which sector contributes the most to global greenhouse gas emissions?",
            answers: [
                { text: "Transportation", correct: false },
                { text: "Agriculture", correct: false },
                { text: "Energy (electricity and heat production)", correct: true },
                { text: "Industry", correct: false }
            ],
            explanation: "Energy production, primarily from burning fossil fuels, accounts for about 35% of global emissions - more than any other sector."
        },
        {
            question: "What is the Paris Agreement's main goal regarding temperature rise?",
            answers: [
                { text: "Limit warming to 1.5°C above pre-industrial levels", correct: true },
                { text: "Limit warming to 3°C above pre-industrial levels", correct: false },
                { text: "Stop all warming immediately", correct: false },
                { text: "Reverse warming to pre-industrial temperatures", correct: false }
            ],
            explanation: "The Paris Agreement aims to limit global temperature increase to well below 2°C, preferably to 1.5°C, compared to pre-industrial levels."
        },
        {
            question: "Which of these is NOT a renewable energy source?",
            answers: [
                { text: "Solar power", correct: false },
                { text: "Wind power", correct: false },
                { text: "Natural gas", correct: true },
                { text: "Geothermal energy", correct: false }
            ],
            explanation: "Natural gas is a fossil fuel, not a renewable energy source. While cleaner than coal, it still produces CO₂ when burned."
        },
        {
            question: "How much has the global average temperature increased since the late 19th century?",
            answers: [
                { text: "About 0.5°C", correct: false },
                { text: "About 1.0°C", correct: true },
                { text: "About 2.0°C", correct: false },
                { text: "About 3.0°C", correct: false }
            ],
            explanation: "The Earth's average surface temperature has risen about 1.0°C (1.8°F) since the late 19th century, with most warming occurring in the past 35 years."
        },
        {
            question: "What is the main cause of sea level rise?",
            answers: [
                { text: "Melting land ice (glaciers and ice sheets)", correct: false },
                { text: "Thermal expansion of seawater as it warms", correct: false },
                { text: "Both of the above", correct: true },
                { text: "Increased rainfall over oceans", correct: false }
            ],
            explanation: "Sea level rise is caused by both melting ice adding water to the oceans and the expansion of seawater as it warms."
        },
        {
            question: "Which of these actions is most effective at reducing your carbon footprint?",
            answers: [
                { text: "Recycling", correct: false },
                { text: "Eating less meat", correct: false },
                { text: "Using public transportation", correct: false },
                { text: "Having one fewer child", correct: true }
            ],
            explanation: "While all these actions help, research shows that having one fewer child has by far the largest impact on reducing emissions."
        },
        {
            question: "What year did atmospheric CO₂ concentrations first exceed 400 parts per million?",
            answers: [
                { text: "1988", correct: false },
                { text: "2005", correct: false },
                { text: "2013", correct: true },
                { text: "2019", correct: false }
            ],
            explanation: "CO₂ levels surpassed 400 ppm in 2013 at the Mauna Loa Observatory, a level not seen in millions of years."
        }
    ];
    
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartButton.addEventListener('click', startQuiz);
    
    function startQuiz() {
        quizIntro.classList.add('hidden');
        resultsContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        score = 0;
        
        setNextQuestion();
    }
    
    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
    
    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('answer-btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }
    
    function resetState() {
        nextButton.classList.add('hidden');
        feedbackElement.classList.add('hidden');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }
    
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        
        // Disable all buttons after selection
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
            if (button.dataset.correct) {
                button.style.backgroundColor = '#d4edda';
                button.style.borderColor = '#28a745';
            } else {
                button.style.backgroundColor = '#f8d7da';
                button.style.borderColor = '#dc3545';
            }
        });
        
        if (correct) {
            score++;
            feedbackElement.classList.add('correct');
            feedbackElement.innerHTML = `<strong>Correct!</strong> ${shuffledQuestions[currentQuestionIndex].explanation}`;
        } else {
            feedbackElement.classList.add('incorrect');
            feedbackElement.innerHTML = `<strong>Incorrect.</strong> ${shuffledQuestions[currentQuestionIndex].explanation}`;
        }
        
        feedbackElement.classList.remove('hidden');
        nextButton.classList.remove('hidden');
        
        // If it's the last question, change button text
        if (shuffledQuestions.length === currentQuestionIndex + 1) {
            nextButton.innerText = 'See Results';
        }
    }
    
    function showResults() {
        quizContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        const percentage = Math.round((score / questions.length) * 100);
        scoreTextElement.innerText = `You scored ${score} out of ${questions.length} (${percentage}%)`;
        
        let message;
        if (percentage >= 90) {
            message = "Excellent! You're a climate change expert!";
        } else if (percentage >= 70) {
            message = "Great job! You have strong climate knowledge.";
        } else if (percentage >= 50) {
            message = "Good effort! Consider learning more about climate science.";
        } else {
            message = "Climate change is complex. This is a great opportunity to learn more!";
        }
        
        resultMessageElement.innerText = message;
    }
    
    // Modified next button click handler to show results when quiz ends
    nextButton.addEventListener('click', () => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            showResults();
        }
    });
});