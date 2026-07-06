document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizContent = document.getElementById('quiz-content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const currentQNum = document.getElementById('current-q-num');
    const recommendationsList = document.getElementById('recommendations-list');

    // --- State Variables ---
    let currentQuestionIndex = 0;
    const userAnswers = {};
    let careerScores = {
        'Software Engineering (Development)': 0,
        'Data Science & AI/ML': 0,
        'Cybersecurity & Infrastructure': 0,
        'Biotechnology & Pharmaceutical R&D': 0,
        'Financial & Investment Banking': 0,
        'Business Management & HR': 0,
        'Creative Media & UX/UI Design': 0,
        'Civil & Mechanical Engineering': 0,
    };
    
    const careerRationales = {}; 

    // --- Quiz Data (15 Focused Questions) - Content is unchanged, but included for completeness ---
    const questions = [
        // Aptitude & Cognitive Style
        { id: 'q1', text: 'I enjoy translating complex ideas into clear, step-by-step instructions or code.', weight: 3.0, 
            scoring: { 5: {'Software Engineering (Development)': 5, 'Data Science & AI/ML': 2, 'Financial & Investment Banking': 1}, 4: {'Cybersecurity & Infrastructure': 2}, 1: {'Creative Media & UX/UI Design': -2, 'Business Management & HR': -1} }, max_points: 15.0 },
        { id: 'q2', text: 'I excel at identifying a single error in a system when the error could be anywhere.', weight: 2.5, 
            scoring: { 5: {'Cybersecurity & Infrastructure': 4, 'Software Engineering (Development)': 2, 'Financial & Investment Banking': 2}, 4: {'Data Science & AI/ML': 1}, 1: {'Creative Media & UX/UI Design': -1} }, max_points: 10.0 },
        { id: 'q3', text: 'I am better at reading scientific papers/data abstracts than analyzing historical texts.', weight: 2.0, 
            scoring: { 5: {'Biotechnology & Pharmaceutical R&D': 3, 'Data Science & AI/ML': 3, 'Civil & Mechanical Engineering': 2}, 1: {'Business Management & HR': -2, 'Creative Media & UX/UI Design': -1} }, max_points: 6.0 },
        { id: 'q4', text: 'I prefer building mathematical/statistical models over writing persuasive essays.', weight: 2.5, 
            scoring: { 5: {'Data Science & AI/ML': 4, 'Financial & Investment Banking': 3, 'Software Engineering (Development)': 1}, 1: {'Creative Media & UX/UI Design': -2, 'Business Management & HR': -1} }, max_points: 10.0 },
        { id: 'q5', text: 'I have a strong spatial reasoning ability (visualizing 3D objects, systems in space).', weight: 1.5, 
            scoring: { 5: {'Civil & Mechanical Engineering': 4, 'Software Engineering (Development)': 2}, 4: {'Biotechnology & Pharmaceutical R&D': 1} }, max_points: 6.0 },

        // Work Environment & Preference
        { id: 'q6', text: 'I am comfortable with uncertainty and ambiguity; I enjoy charting my own research path.', weight: 2.0, 
            scoring: { 5: {'Biotechnology & Pharmaceutical R&D': 3, 'Data Science & AI/ML': 2, 'Creative Media & UX/UI Design': 2}, 1: {'Financial & Investment Banking': -2, 'Civil & Mechanical Engineering': -1} }, max_points: 6.0 },
        { id: 'q7', text: 'I prefer working on a few complex, long-term projects rather than many small, quick tasks.', weight: 1.5, 
            scoring: { 5: {'Biotechnology & Pharmaceutical R&D': 2, 'Civil & Mechanical Engineering': 2, 'Software Engineering (Development)': 1}, 1: {'Business Management & HR': -1, 'Financial & Investment Banking': -1} }, max_points: 4.5 },
        { id: 'q8', text: 'My career success should involve high-stakes negotiation and client interaction.', weight: 2.5, 
            scoring: { 5: {'Financial & Investment Banking': 4, 'Business Management & HR': 3}, 4: {'Creative Media & UX/UI Design': 1}, 1: {'Software Engineering (Development)': -3, 'Cybersecurity & Infrastructure': -2} }, max_points: 10.0 },
        { id: 'q9', text: 'I find motivation in being highly competitive and achieving clear, quantitative targets.', weight: 2.0, 
            scoring: { 5: {'Financial & Investment Banking': 3, 'Business Management & HR': 3}, 4: {'Data Science & AI/ML': 1} }, max_points: 6.0 },
        { id: 'q10', text: 'I prioritize human-centered design and making technology accessible and intuitive for others.', weight: 2.0, 
            scoring: { 5: {'Creative Media & UX/UI Design': 4, 'Software Engineering (Development)': 1, 'Business Management & HR': 1}, 1: {'Civil & Mechanical Engineering': -1, 'Cybersecurity & Infrastructure': -1} }, max_points: 8.0 },

        // Responsibility & Domain Interest
        { id: 'q11', text: 'I enjoy creating visual narratives and developing branding or marketing materials.', weight: 1.5, 
            scoring: { 5: {'Creative Media & UX/UI Design': 3, 'Business Management & HR': 2}, 1: {'Cybersecurity & Infrastructure': -1} }, max_points: 4.5 },
        { id: 'q12', text: 'I am deeply concerned with data privacy, system integrity, and preventing breaches.', weight: 3.0, 
            scoring: { 5: {'Cybersecurity & Infrastructure': 5, 'Software Engineering (Development)': 2}, 4: {'Data Science & AI/ML': 1} }, max_points: 15.0 },
        { id: 'q13', text: 'I am interested in the mechanisms of life, medicine, and solving global health/food challenges.', weight: 2.5, 
            scoring: { 5: {'Biotechnology & Pharmaceutical R&D': 4, 'Data Science & AI/ML': 1}, 4: {'Civil & Mechanical Engineering': 1} }, max_points: 10.0 },
        { id: 'q14', text: 'I am drawn to managing large-scale physical projects (infrastructure, machines, or production lines).', weight: 2.0, 
            scoring: { 5: {'Civil & Mechanical Engineering': 4, 'Business Management & HR': 1}, 4: {'Biotechnology & Pharmaceutical R&D': 1} }, max_points: 8.0 },
        { id: 'q15', text: 'I am comfortable guiding others (mentoring, conflict resolution, team motivation).', weight: 1.5, 
            scoring: { 5: {'Business Management & HR': 3, 'Financial & Investment Banking': 1}, 4: {'Civil & Mechanical Engineering': 1}, 1: {'Software Engineering (Development)': -1} }, max_points: 4.5 }
    ];
    
    // --- Career Profiles (Detailed Descriptions) ---
    const careerProfiles = {
        'Software Engineering (Development)': { description: 'Designing, developing, and testing scalable software applications and systems. Focuses on writing efficient code and solving technical puzzles.', skills: ['Python/Java/C++', 'Algorithms', 'Logic & Debugging'], growth: 'Very High', salary: 'Exceptional', maxScore: 0, keywords: ['coding', 'logic', 'systems'] },
        'Data Science & AI/ML': { description: 'Building statistical models and machine learning algorithms to extract predictive insights from complex, large-scale data.', skills: ['Statistics', 'R/Python', 'Modeling'], growth: 'Exceptional', salary: 'Exceptional', maxScore: 0, keywords: ['data', 'models', 'analysis'] },
        'Cybersecurity & Infrastructure': { description: 'Protecting networks and systems from digital threats. This involves system hardening, penetration testing, and incident response.', skills: ['Networking', 'Linux', 'Security Protocols'], growth: 'Exceptional', salary: 'Very High', maxScore: 0, keywords: ['security', 'systems', 'debugging'] },
        'Biotechnology & Pharmaceutical R&D': { description: 'Researching and developing new biological products, drugs, or techniques, focusing on genetics, molecular biology, and chemistry.', skills: ['Biology/Chemistry', 'Research Methods', 'Patience'], growth: 'High', salary: 'High', maxScore: 0, keywords: ['research', 'lab', 'science'] },
        'Financial & Investment Banking': { description: 'Analyzing market trends, managing high-value portfolios, conducting risk assessments, and executing corporate finance deals.', skills: ['Financial Modeling', 'Economics', 'Risk Analysis'], growth: 'Moderate', salary: 'Exceptional', maxScore: 0, keywords: ['finance', 'risk', 'competitive'] },
        'Business Management & HR': { description: 'Overseeing organizational strategy, managing team performance, handling conflict, and planning growth across departments.', skills: ['Leadership', 'Communication', 'Strategy'], growth: 'Moderate', salary: 'High', maxScore: 0, keywords: ['management', 'people', 'strategy'] },
        'Creative Media & UX/UI Design': { description: 'Designing intuitive user interfaces (UI), user experiences (UX), and creating compelling visual or media content for digital platforms.', skills: ['Design Tools (Figma)', 'Psychology', 'Visual Arts'], growth: 'High', salary: 'High', maxScore: 0, keywords: ['design', 'visual', 'creative'] },
        'Civil & Mechanical Engineering': { description: 'Designing, constructing, and managing large physical systems like infrastructure, heavy machinery, or production processes.', skills: ['Physics/Math', 'CAD Software', 'Project Management'], growth: 'Stable', salary: 'Very High', maxScore: 0, keywords: ['physical', 'structure', 'project'] }
    };

    // --- Max Score Calculation (Unchanged) ---
    function calculateMaxScores() {
        Object.keys(careerProfiles).forEach(career => careerProfiles[career].maxScore = 0);
        questions.forEach(q => {
            let maxPointsForQ = 0;
            Object.values(q.scoring).forEach(scoreMap => {
                Object.values(scoreMap).forEach(points => {
                    if (points > maxPointsForQ) {
                        maxPointsForQ = points;
                    }
                });
            });
            Object.values(q.scoring).forEach(scoreMap => {
                for (const career in scoreMap) {
                    if (scoreMap[career] > 0) {
                        careerProfiles[career].maxScore += maxPointsForQ * q.weight;
                    }
                }
            });
        });
    }

    // --- Core Functions ---
    
    function showScreen(screenId) {
        const screens = [welcomeScreen, quizScreen, resultsScreen];
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        
        // Add or remove keyboard listener based on the screen
        if (screenId === 'quiz-screen') {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }

    function renderQuestion() {
        const q = questions[currentQuestionIndex];
        currentQNum.textContent = currentQuestionIndex + 1;
        
        let html = `<div class="question-card">
                        <p class="question-text">${q.text}</p>
                        <div class="options-group" id="options-group-${q.id}">`;
        
        const scaleOptions = [
            { text: '1. Strongly Disagree', value: 1 },
            { text: '2. Disagree', value: 2 },
            { text: '3. Neutral', value: 3 },
            { text: '4. Agree', value: 4 },
            { text: '5. Strongly Agree', value: 5 }
        ];

        scaleOptions.forEach((option, index) => {
            const checked = userAnswers[q.id] == option.value ? 'checked' : '';
            // Add tabindex for keyboard focus
            html += `<input type="radio" id="${q.id}-${option.value}" name="${q.id}" value="${option.value}" ${checked}>
                     <label for="${q.id}-${option.value}" tabindex="${index + 1}"> ${option.text}</label>`;
        });
        
        html += `   </div>
                    </div>`;

        quizContent.innerHTML = html;

        // Add event listeners for mouse clicks
        document.querySelectorAll(`input[name="${q.id}"]`).forEach(input => {
            input.addEventListener('change', (e) => {
                userAnswers[q.id] = parseInt(e.target.value);
                updateNavigationButtons();
            });
        });

        // Set initial focus for keyboard navigation
        if (quizContent.querySelector('label')) {
            quizContent.querySelector('label').focus();
        }

        updateNavigationButtons();
    }

    // --- NEW: Keyboard Navigation Handler ---
    function handleKeyDown(event) {
        // Only run if the quiz screen is active
        if (!quizScreen.classList.contains('active')) return; 

        const optionsGroup = quizContent.querySelector('.options-group');
        const labels = Array.from(optionsGroup.querySelectorAll('label'));
        const focusedLabel = document.activeElement;
        
        if (labels.includes(focusedLabel)) {
            const currentIndex = labels.indexOf(focusedLabel);
            let nextIndex = currentIndex;

            if (event.key === 'ArrowDown') {
                event.preventDefault(); // Stop scrolling the page
                nextIndex = (currentIndex + 1) % labels.length;
                labels[nextIndex].focus();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault(); // Stop scrolling the page
                nextIndex = (currentIndex - 1 + labels.length) % labels.length;
                labels[nextIndex].focus();
            } else if (event.key === 'Enter') {
                event.preventDefault(); 
                
                // Simulate a click on the focused label's input
                const inputId = focusedLabel.getAttribute('for');
                const radioInput = document.getElementById(inputId);
                
                if (radioInput) {
                    radioInput.checked = true;
                    // Manually trigger the 'change' event to save the answer
                    radioInput.dispatchEvent(new Event('change')); 
                    
                    // Trigger Next/Submit action if an answer is selected
                    if (!nextBtn.classList.contains('hidden') && !nextBtn.disabled) {
                        nextBtn.click();
                    } else if (!submitBtn.classList.contains('hidden') && !submitBtn.disabled) {
                        submitBtn.click();
                    }
                }
            }
        } else if (event.key === 'Enter') {
            event.preventDefault();
            // Allow Enter key to work on the Start button if quiz hasn't started
            if (welcomeScreen.classList.contains('active')) {
                startQuizBtn.click();
            }
        }
    }
    // --- END NEW FEATURE ---

    function updateNavigationButtons() {
        const q = questions[currentQuestionIndex];
        const isAnswered = userAnswers.hasOwnProperty(q.id);

        prevBtn.disabled = currentQuestionIndex === 0;
        
        const isLastQuestion = currentQuestionIndex === questions.length - 1;
        nextBtn.classList.toggle('hidden', isLastQuestion);
        submitBtn.classList.toggle('hidden', !isLastQuestion);
        
        nextBtn.disabled = !isAnswered && !isLastQuestion;
        submitBtn.disabled = !isAnswered && isLastQuestion;
    }

    function calculateResults() {
        // (Scoring and Rationale logic is unchanged)
        Object.keys(careerScores).forEach(key => careerScores[key] = 0);
        Object.keys(careerRationales).forEach(key => careerRationales[key] = []);
        calculateMaxScores(); 

        questions.forEach(q => {
            const answerValue = userAnswers[q.id];
            const weight = q.weight;
            
            if (answerValue && q.scoring && q.scoring[answerValue]) {
                const scoringMap = q.scoring[answerValue];
                for (const career in scoringMap) {
                    const basePoints = scoringMap[career];
                    careerScores[career] += basePoints * weight; 
                    
                    if (basePoints >= 3) {
                        if (!careerRationales[career]) careerRationales[career] = [];
                        careerRationales[career].push(q.text.split('(')[0].trim()); 
                    }
                }
            }
        });

        let resultsWithPercentage = Object.entries(careerScores).map(([career, score]) => {
            const maxScore = careerProfiles[career].maxScore;
            const matchPercentage = maxScore > 0 ? Math.round((Math.max(0, score) / maxScore) * 100) : 0; 
            return { career, score, matchPercentage };
        });

        resultsWithPercentage.sort((a, b) => b.matchPercentage - a.matchPercentage);
        let sortedResults = resultsWithPercentage.filter(item => item.matchPercentage >= 30); 

        renderResults(sortedResults);
        showScreen('results-screen');
    }
    
    function generateRationaleText(career, profile) {
        const rationales = careerRationales[career] || [];
        
        if (rationales.length >= 2) {
            return `**Rationale:** Your strong agreement with interests like "${rationales[0].toLowerCase()}" and "${rationales[1].toLowerCase()}" aligns closely with the core cognitive demands of this field.`;
        } else if (profile.matchPercentage >= 70) {
            return `**Rationale:** Your overall profile is an excellent fit, showing a high alignment with the ${profile.keywords.join(', ')} skills required.`;
        } else {
            return `**Rationale:** This recommendation is based on a moderate match across several key aptitudes, suggesting a strong potential if you focus on ${profile.skills[0]} skills.`;
        }
    }

    function renderResults(results) {
        recommendationsList.innerHTML = '';
        const topN = Math.min(results.length, 3); 

        if (topN === 0) {
            recommendationsList.innerHTML = '<p>Your answers suggest a broad range of interests. We recommend exploring **Business and Technology foundation courses** to begin your journey.</p>';
            return;
        }
        
        for (let i = 0; i < topN; i++) {
            const result = results[i];
            const profile = careerProfiles[result.career];
            const rationaleText = generateRationaleText(result.career, result);

            const itemHtml = `
                <div class="recommendation-item">
                    <div class="ranking">#${i + 1}</div>
                    <h3 class="career-name">${result.career}</h3>
                    <div class="match-score">
                        ${result.matchPercentage}% Confidence Match 🚀
                    </div>
                    <p class="career-description">${profile.description}</p>
                    <div class="career-details">
                        <p class="rationale-text">${rationaleText}</p>
                        <p><strong>Core Skills:</strong> ${profile.skills.join(', ')}</p>
                        <p><strong>Job Growth:</strong> ${profile.growth}</p>
                        <p><strong>Salary Potential:</strong> ${profile.salary}</p>
                        <p class="score-debug" style="font-size: 0.7em; color: #555;">(Score: ${result.score.toFixed(1)})</p>
                    </div>
                </div>
            `;
            recommendationsList.innerHTML += itemHtml;
        }
    }

    // --- Event Listeners ---
    startQuizBtn.addEventListener('click', () => {
        showScreen('quiz-screen');
        currentQuestionIndex = 0;
        renderQuestion();
    });

    nextBtn.addEventListener('click', () => {
        if (userAnswers.hasOwnProperty(questions[currentQuestionIndex].id)) {
            currentQuestionIndex++;
            renderQuestion();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    });

    submitBtn.addEventListener('click', calculateResults);

    showScreen('welcome-screen');
});