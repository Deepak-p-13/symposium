const nextBtns = document.querySelectorAll('.nextBtn');
const prevBtns = document.querySelectorAll('.backBtn');
const formSections = document.querySelectorAll('.form');
let currentSection = 0;

function toggleOtherInput(select) {
    var otherCollegeDiv = document.getElementById("otherCollegeDiv");
    if (select.value === "Other") {
      otherCollegeDiv.style.display = "block"; // Show the input field if "Other" is selected
    } else {
      otherCollegeDiv.style.display = "none"; // Hide the input field if another option is selected
    }
  }

  
nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        formSections[currentSection].style.display = 'none';
        currentSection++;
        formSections[currentSection].style.display = 'block';
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        formSections[currentSection].style.display = 'none';
        currentSection--;
        formSections[currentSection].style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const emailField = document.getElementById('email');
    const submitBtn = document.querySelector('.submitBtn');

    // Function to validate email using regex
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    // Add event listener on form submit
    submitBtn.addEventListener('click', (event) => {
        const emailValue = emailField.value;

        if (!validateEmail(emailValue)) {
            event.preventDefault();
            alert('Please enter a valid email address.');
            emailField.focus();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const technicalCheckboxes = document.querySelectorAll('input[name="technical_event[]"]');
    const nonTechnicalCheckboxes = document.querySelectorAll('input[name="non_technical_event[]"]');
    const submitBtn = document.querySelector('.submitBtn');

    const codeathonCheckbox = document.getElementById('codeathon');
    const quizCheckbox = document.getElementById('quiz');

    let technicalCount = 0;
    let nonTechnicalCount = 0;

    function validateSelections() {
        technicalCount = [...technicalCheckboxes].filter(checkbox => checkbox.checked).length;
        nonTechnicalCount = [...nonTechnicalCheckboxes].filter(checkbox => checkbox.checked).length;
        return (technicalCount + nonTechnicalCount > 0) && (technicalCount <= 2) && (nonTechnicalCount <= 2);
    }

    function updateCheckboxState() {
        technicalCheckboxes.forEach(checkbox => {
            if (technicalCount >= 2 && !checkbox.checked) {
                checkbox.disabled = true;
            } else {
                checkbox.disabled = false;
            }
        });
        nonTechnicalCheckboxes.forEach(checkbox => {
            if (nonTechnicalCount >= 2 && !checkbox.checked) {
                checkbox.disabled = true;
            } else {
                checkbox.disabled = false;
            }
        });
    }

    function handlePaperQuizExclusivity() {
        if (codeathonCheckbox.checked) {
            quizCheckbox.disabled = true;
        } else if (technicalCount < 2) { 
            quizCheckbox.disabled = false;
        }

        if (quizCheckbox.checked) {
            codeathonCheckbox.disabled = true;
        } else if (technicalCount < 2) { 
            codeathonCheckbox.disabled = false;
        }
    }

    codeathonCheckbox.addEventListener('change', () => {
        handlePaperQuizExclusivity();
        updateCheckboxState();
    });

    quizCheckbox.addEventListener('change', () => {
        handlePaperQuizExclusivity();
        updateCheckboxState();
    });

    [...technicalCheckboxes, ...nonTechnicalCheckboxes].forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (!validateSelections()) {
                alert('You can select at most 2 technical and 2 non-technical events.');
            }
            updateCheckboxState();
            handlePaperQuizExclusivity();
        });
    });

    submitBtn.addEventListener('click', (event) => {
        if (!validateSelections()) {
            event.preventDefault();
            alert('Please select at least 1 event and ensure no more than 2 are selected from each category.');
        }
    });
   
    handlePaperQuizExclusivity();
    
});