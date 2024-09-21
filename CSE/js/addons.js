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

const descriptionButtons = document.querySelectorAll('.description-btn');
const rulesButtons = document.querySelectorAll('.rules-btn');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupTitle = document.getElementById('popupTitle');
const popupContent = document.getElementById('popupContent');

const descriptions = {
  'InsightX': {
    desc: [
      'Dive into the future with InsightX! Present your cutting-edge research or innovative ideas in technology and make an impact. With just 6 minutes to shine, this is your chance to share, inspire, and engage with industry experts.'
    ],
    coordinator: {
      name: ' Mohan Krishna',
      phone: '+91 9080696129',
      venue: 'PANEL 1: IP LAB (FIRST FLOOR)PANEL 2: THIN CLIENT LAB (FIRST FLOOR)PANEL 3: COMPUTER VISION LAB (FIRST FLOOR)'
    }
  },
  'Code-A-Thon': {
    desc: [
     'Join Elements 2k24\'s Code-A-Thon for the ultimate coding challenge! Test your coding skills, solve complex problems, and race against the clock to outsmart your peers. Whether you\'re a coding enthusiast or a problem-solving pro, this event will push your limits and reward the best. Prove your logic, speed, and strategy to become the Code-A-Thon champion!'
    ],
    coordinator: {
      name: 'Abhivandan R',
      phone: '+91 90433 84096',
      venue: 'CODETHON (PRELIMS)	AI/DS LAB AND APPLICATION DEVELOPMENT LAB(GROUND FLOOR), IP LAB(FIRST FLOOR)'
    }
  },
  'Quiz': {
    desc: [
      'Join us at Elements 2k24 for Quiz Quest, a thrilling competition that challenges both technical and general knowledge. Teams will face exciting questions across technology, science, and trivia, competing for the title of Quiz Champions. Whether you\'re a tech enthusiast or trivia lover, this event promises to engage, entertain, and educate!'
    ],
    coordinator: {
      name: ' Viknesh Rao ',
      phone: '+91  7708283676',
      venue: ' QUIZ (PRELIMS)	LIBRARY SEMINAR HALL'
    }
  },
  'CipherChase': {
    desc: [
      'Embark on an exhilarating adventure with Cipher Chase! Decode clues, solve puzzles, and race against time in this thrilling treasure hunt. Unleash your problem-solving skills and find the hidden treasure!'
    ],
    coordinator: {
      name: 'Sugitha',
      phone: '+91 9361084477',
      venue: 'Tressure hunt LIBRARY SEMINAR HALL'
    }
  },
  'MemeTime': {
    desc: [
     'Get ready for laughs and creativity at Meme Time! Design hilarious and relatable memes that capture the essence of current trends and tech. Showcase your humor and make everyone smile!'
    ],
    coordinator: {
      name: 'Sanjay V',
      phone: '+91 9842303822',
      venue: 'MEME TIME	EMBEDDED LAB (SECOND FLOOR)'
    }
  },
  'Gaming': {
    desc: [
     'Level up your gaming skills at Game On! Compete in exciting games, test your reflexes, and enjoy friendly rivalry. It’s time to gather your team and conquer the gaming arena!'
    ],
    coordinator: {
      name: 'Guru Charran V',
      phone: '+91 9150150713',
      venue: 'Gaming AR/VR Lab'
    }
  },
  'Shortography': {
    desc: [
     'Capture and create at Shortography! Show off your photography and video editing skills by turning raw footage into stunning visual stories. Express your creativity and craft your perfect shot!'
    ],
    coordinator: {
      name: 'Anandhu B',
      phone: '+91 8072600146',
      venue: 'SHORTOGRAPHY(PHOTOGRAPHY)	PROGRAMMING LAB (SECOND FLOOR)'
    }
  },
  'BestManager': {
    desc: [
   ' Prove your leadership prowess in Best Manager! Tackle real-world scenarios, make strategic decisions, and demonstrate your cognitive and management skills. Are you ready to lead and succeed?'
    ],
    coordinator: {
      name: 'Monica',
      phone: '+91 9789823632',
      venue: 'BEST MANAGER	CSE SEMINAR HALL'
    }
  }
};


const rules = {
  'InsightX': [
    'Rule 1: Each team can have a maximum of 2 participants.',
    'Rule 2: Time limit for the presentation is 15 minutes.',
    'Rule 3: Use of visual aids is encouraged.'
  ],
  'Code-A-Thon': [
    'Teams : 2-4 members each',
    'Time Limits : Strict limits for each round.',
    'Scoring : Based on accuracy, speed, creativity, and collaboration, with potential elimination in each round.',
    'The decision of the judges will be final.'
  ],
  'Quiz': [
   'Each team can consist of 2 members.',
   ' ⁠Use of mobile phones or search engines is strictly prohibited.',
   ' ⁠Using mobile phones during the competition may result in elimination.',
   '⁠The quiz will consist of 5 rounds in total.',
   ' ⁠The judges decisions are final and binding in all matters related to the quiz.',
   '⁠All necessary materials (pen, paper, buzzer, etc.) will be provided. External study materials are not allowed.',
   'The decision of the judges will be final.'
  ],
  'CipherChase': [
    'Teams : 2-4 members each',
    'Time Limits : Strict limits for each round.',
    'Scoring : Based on accuracy, speed, creativity, and collaboration, with potential elimination in each round.'
  ],
  'MemeTime': [
    'The competition consists of two rounds: the selection round and the finals.',
    '⁠Both rounds will feature on-the-spot topics.',
    'After receiving the topic, participants will have 20 minutes to create their memes.',
    '⁠Each participant can submit only one meme.',
    'Memes should align with current trends.',
    'Rules for the final round will be provided on the spot.',
    'The decision of the judges will be final.'
  ],
  'Gaming': [
    'Rule 1: Teams of up to 5 players.',
    'Rule 2: No cheating or hacking is tolerated.',
    'Rule 3: Matches will follow standard game rules.'
  ],
  'Shortography': [
    'Photography:',
    'Participants will be given a theme and must capture a photo around the campus based on that theme.',
    'The time duration is 2 hours after the theme is announced.',
    ' ⁠Any device can be used for photography.',
    'Only Lightroom can be used for photo editing.',
    'The decision of the judges will be final.',
    ' ',
    'Video Editing:',
    'Stock footage will be provided for participants to create a video.',
    'You will have 1 hour to complete the video editing.',
    'Any device and tool can be used for video editing.',
    'The decision of the judges will be final.'
  ],
  'BestManager': [
    'Rule 1: Solo participation only.',
    'Rule 2: Each round will focus on different managerial skills.',
    'Rule 3: Participants must follow time limits strictly.'
  ]
};

// Event listener for description buttons
descriptionButtons.forEach(button => {
  button.addEventListener('click', function() {
    const event = this.getAttribute('data-event');
    popupTitle.textContent = event + " Description";
    const descriptionList = descriptions[event].desc.map(desc => `<li>${desc}</li>`).join('');
    const coordinatorName = descriptions[event].coordinator.name; // Get the coordinator name
    const coordinatorPhone = descriptions[event].coordinator.phone; // Get the coordinator phone number
    const venue = descriptions[event].coordinator.venue; // Get the venue
    popupContent.innerHTML = `
      <ul class="arrow-list">${descriptionList}</ul>
       <p style="padding-left: 20px;"><strong>Venue:</strong> ${venue}</p>
      <p style="padding-left: 20px;"><strong>Coordinator:</strong> ${coordinatorName}</p>
      <p style="padding-left: 20px;"> <strong>Phone:</strong> ${coordinatorPhone}</p>
     
    `;
    popup.style.display = 'flex';
  });
});

// Event listener for rules buttons
rulesButtons.forEach(button => {
  button.addEventListener('click', function() {
    const event = this.getAttribute('data-event');
    popupTitle.textContent = event + " Rules";
    const rulesList = rules[event].map(rule => `<li>${rule}</li>`).join('');
    popupContent.innerHTML = `<ul class="arrow-list">${rulesList}</ul>`;
    popup.style.display = 'flex';
  });
});

// Close popup
closePopupBtn.addEventListener('click', function() {
  popup.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target == popup) {
    popup.style.display = 'none';
  }
});
document.getElementById('scrollUpBtn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
