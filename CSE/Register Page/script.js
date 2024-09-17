const nextBtns = document.querySelectorAll('.nextBtn');
const prevBtns = document.querySelectorAll('.backBtn');
const formSections = document.querySelectorAll('.form');

        let currentSection = 0;

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