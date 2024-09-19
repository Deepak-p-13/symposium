const eventDate = new Date('2024-10-04T00:00:00'); 
function calculateCountdown() {
    const currentDate = new Date();
    const timeDifference = eventDate - currentDate;
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;

    if (timeDifference < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "<p>The event has started!</p>";
    }
}

const countdownInterval = setInterval(calculateCountdown, 1000);

calculateCountdown();

// JavaScript to open and close the popup with dynamic descriptions or rules
const descriptionButtons = document.querySelectorAll('.description-btn');
const rulesButtons = document.querySelectorAll('.rules-btn');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupTitle = document.getElementById('popupTitle');
const popupContent = document.getElementById('popupContent');

const descriptions = {
  'Presentation': 'This is a description of the Presentation event.',
  'Code-A-Thon': 'This is a description of the Code-A-Thon event.',
  'Quiz': 'This is a description of the Quiz event.',
  'TreasureHunt' : 'This is a description of the  TreasureHunt.',
  'MemeTime' : 'This is a description of the  MemeTime.',
  'Gaming' : 'This is a description of the  Gaming.',
  'Shortography' : 'This is a description of the  Gaming.',
  'BestManager' : 'This is a description of the  BestManager.'
};

const rules = {
  'Presentation': [
    'Rule 1: Each team can have a maximum of 2 participants.',
    'Rule 2: Time limit for the presentation is 15 minutes.',
    'Rule 3: Use of visual aids is encouraged.'
  ],
  'Code-A-Thon': [
    'Rule 1: Solo participation only.',
    'Rule 2: The event will last for 2 hours.',
    'Rule 3: Any form of plagiarism will lead to disqualification.'
  ],
  'Quiz': [
    'Rule 1: Teams of up to 3 members.',
    'Rule 2: The quiz will consist of 3 rounds.',
    'Rule 3: No electronic devices are allowed.'
  ],
  'TreasureHunt': [
    'Rule 1: Teams of up to 3 TreasureHunt.',
    'Rule 2: The quiz will consist of 3 rounds.',
    'Rule 3: No electronic devices are allowed.'
  ],
  'MemeTime' : [
    'Rule 1: Teams of up to 3 MemeTime.',
    'Rule 2: The quiz will consist of 3 rounds.',
    'Rule 3: No electronic devices are allowed.'
  ],
  'Gaming' : [
    'Rule 1: Teams of up to 3 Gaming.',
    'Rule 2: The quiz will consist of 3 rounds.',
    'Rule 3: No electronic devices are allowed.'
  ],
  'Shortography' : [
    'Rule 1: Teams of up to 3 Shortography.',
    'Rule 2: The quiz will consist of 3 rounds.',
    'Rule 3: No electronic devices are allowed.'
  ],
  'BestManager' : [
    'Rule 1: Teams of up to 3 Shortography.',
    'Rule 2: The quiz will consist of 3 rounds.',
    'Rule 3: No electronic devices are allowed.'

  ]
};

// Event listener for description buttons
descriptionButtons.forEach(button => {
  button.addEventListener('click', function() {
    const event = this.getAttribute('data-event');
    popupTitle.textContent = event + " Description";
    popupContent.innerHTML = `<p>${descriptions[event]}</p>`;
    popup.style.display = 'flex';
  });
});

// Event listener for rules buttons
rulesButtons.forEach(button => {
  button.addEventListener('click', function() {
    const event = this.getAttribute('data-event');
    popupTitle.textContent = event + " Rules";
    const rulesList = rules[event].map(rule => `<li>${rule}</li>`).join('');
    popupContent.innerHTML = `<ul>${rulesList}</ul>`;
    popup.style.display = 'flex';
  });
});

closePopupBtn.addEventListener('click', function() {
  popup.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target == popup) {
    popup.style.display = 'none';
  }
});
