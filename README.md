# Career Compass 🧭

> **Stop guessing, start growing.**

Career Compass is a lightweight, frontend-only web application designed to help individuals discover their ideal career paths. Originally developed as a web-based course counseling project in October 2025, the application utilizes a dynamically scored 15-question assessment to measure aptitude, cognitive style, work environment preferences, and domain interests. 

Based on the user's responses, the system calculates a confidence match percentage and recommends the top career fields, complete with dynamic rationales and core skill requirements.

## ✨ Features

* **Dynamic Scoring Algorithm:** Employs a weighted scoring system across 15 targeted questions to map user inputs to 8 distinct career profiles.
* **Intelligent Recommendations:** Calculates a confidence match percentage and generates a customized rationale explaining exactly *why* a specific career was recommended based on the user's strongest agreements.
* **Accessibility-First Navigation:** Full keyboard support allows users to navigate the quiz using `ArrowUp`, `ArrowDown`, and `Enter` keys, ensuring a seamless experience.
* **Modern UI/UX:** A clean, responsive, dark-themed interface built with custom CSS variables and CSS Flexbox for fluid layout management.
* **Zero Dependencies:** Built entirely with vanilla HTML5, CSS3, and JavaScript. No external frameworks or libraries are required to run the core logic.

## 🛠️ Technologies Used

* **HTML5:** Semantic structure and form elements.
* **CSS3:** Custom properties (variables), responsive flexbox layouts, hover states, and smooth transitions.
* **Vanilla JavaScript (ES6+):** Event delegation, DOM manipulation, complex object mapping, and state management.

## 🚀 Getting Started

Since Career Compass is a static frontend application, no build tools or package managers are required.

## Prerequisites
* A modern web browser (Chrome, Firefox, Safari, Edge).

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone [https://github.com/yourusername/career-compass.git](https://github.com/yourusername/career-compass.git)

   Navigate to the project directory:

## Bash
```cd career-compass```

Open index.html directly in your browser.
(Alternatively, you can serve it via a local development server like VS Code's Live Server for auto-reloading).

## 📂 Project Structure

Plaintext
```
├── index.html    # The main HTML document containing the app structure
├── styles.css    # All styling, variables, and responsive rules
└── script.js     # The core application logic, quiz data, and scoring algorithm
```

## 🧠 How the Scoring Works

The engine relies on a predefined set of careerProfiles and questions.

### Weighting: Each question carries a specific weight (e.g., 1.5 to 3.0) based on its importance to core competencies.

### Scoring Maps: Every answer option (1-5 scale) awards positive or negative base points to specific careers.

### Calculation: The application calculates the maximum possible score a user could achieve for each career, then tracks the user's actual accumulated score. The final recommendation is rendered as a percentage of the theoretical maximum, filtering out any matches below a 30% confidence threshold.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! If you would like to add new career profiles, refine the scoring matrix, or improve the UI, feel free to fork this repository and submit a Pull Request.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

## 📄 License
Distributed under the MIT License. See LICENSE for more information.
