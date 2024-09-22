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
      venue: 'PANEL 1: IP LAB (FIRST FLOOR)PANEL 2: THIN CLIENT LAB (FIRST FLOOR)PANEL 3: COMPUTER VISION LAB (FIRST FLOOR), CSE Block'
    }
  },
  'Code-A-Thon': {
    desc: [
     'Join Elements 2k24\'s Code-A-Thon for the ultimate coding challenge! Test your coding skills, solve complex problems, and race against the clock to outsmart your peers. Whether you\'re a coding enthusiast or a problem-solving pro, this event will push your limits and reward the best. Prove your logic, speed, and strategy to become the Code-A-Thon champion!'
    ],
    coordinator: {
      name: 'Abhivandan R',
      phone: '+91 90433 84096',
      venue: 'AI/DS LAB AND APPLICATION DEVELOPMENT LAB(GROUND FLOOR), IP LAB(FIRST FLOOR), CSE Block'
    }
  },
  'Quiz': {
    desc: [
      'Join us at Elements 2k24 for Quiz Quest, a thrilling competition that challenges both technical and general knowledge. Teams will face exciting questions across technology, science, and trivia, competing for the title of Quiz Champions. Whether you\'re a tech enthusiast or trivia lover, this event promises to engage, entertain, and educate!'
    ],
    coordinator: {
      name: ' Viknesh Rao ',
      phone: '+91  7708283676',
      venue: 'LIBRARY SEMINAR HALL, Library Block'
    }
  },
  'CipherChase': {
    desc: [
      'Embark on an exhilarating adventure with Cipher Chase! Decode clues, solve puzzles, and race against time in this thrilling treasure hunt. Unleash your problem-solving skills and find the hidden treasure!'
    ],
    coordinator: {
      name: 'Sugitha',
      phone: '+91 9361084477',
      venue: 'LIBRARY SEMINAR HALL, Library Block'
    }
  },
  'MemeTime': {
    desc: [
     'Get ready for laughs and creativity at Meme Time! Design hilarious and relatable memes that capture the essence of current trends and tech. Showcase your humor and make everyone smile!'
    ],
    coordinator: {
      name: 'Sanjay V',
      phone: '+91 9842303822',
      venue: 'EMBEDDED LAB (SECOND FLOOR), CSE Block'
    }
  },
  'Gaming': {
    desc: [
     'Level up your gaming skills at Game On! Compete in exciting games, test your reflexes, and enjoy friendly rivalry. It’s time to gather your team and conquer the gaming arena!'
    ],
    coordinator: {
      name: 'Guru Charran V',
      phone: '+91 9150150713',
      venue: 'AR/VR Lab, , CSE Block'
    }
  },
  'Shortography': {
    desc: [
     'Capture and create at Shortography! Show off your photography and video editing skills by turning raw footage into stunning visual stories. Express your creativity and craft your perfect shot!'
    ],
    coordinator: {
      name: 'Anandhu B',
      phone: '+91 8072600146',
      venue: 'PROGRAMMING LAB (SECOND FLOOR), CSE Block'
    }
  },
  'BestManager': {
    desc: [
   ' Prove your leadership prowess in Best Manager! Tackle real-world scenarios, make strategic decisions, and demonstrate your cognitive and management skills. Are you ready to lead and succeed?'
    ],
    coordinator: {
      name: 'Monica',
      phone: '+91 9789823632',
      venue: 'CSE SEMINAR HALL, CSE Block'
    }
  }
};


const rules = {
  'InsightX': [
    'General Guidelines',
    'Team Size: 3 to 4 members per team',
    'Registration: Online before submission deadline',
    'Topic: Recent technology relevant to engineering/tech.',
    'Abstract Submission',
    'Deadline: October 2, 2024, mail to: elements@srec.ac.in',
    'Guidelines:',
    'Include authors\' names, email IDs and affiliations.',
    'Mention college, domain, and topic',
    '(Abstract) 250 words max, summarising purpose, methodology, findings (Strictly follow IEEE format).',
    'Presentation Format:',
    'Duration: 6 minutes (5 mins presentation, 1 min Q&A).',
    'Download Sample template in below link.'
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
    'Team: 3-4 members per team.',
    'Time limits: Strict time constraints for each clue.',
    'Further rules and instructions will be announced at the time of event.',
    'Convenors and volunteers decision will be final.',
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
    'Two PC games',
    'Team size: Both are individual participation games and no teams.',
    'Blur Rules(Car Race Game)',
    'No Power Ups',
    ' ⁠⁠Controller Optional',
    '⁠⁠No Mods',
    'Only B-Tier Cars for First Round.',
    'Collisions Allowed ',
    'FIFA 23(Football game)',
    'Only Internatinal and League Teams.',
    'Extra Time will not be provided for Initial Rounds only Penalty kicks.'


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
    ' ⁠Team Composition: Solo (Individual participation only).',
    'Each round will result in the elimination of participants.',
    '⁠There are a total of 4 distinct rounds.',
    'The judge\'s verdict is conclusive'
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
     // Add specific link for InsightX
     let additionalLink = '';
     if (event === 'InsightX') {
       additionalLink = `<p style="padding-left: 20px;" ><a href="https://drive.google.com/drive/folders/1d7262NASK402nZeFqAZqkGL53LGnYlpk?usp=sharing" target="_blank">Download PPT & Paper format</a></p>`;
     }
    popupContent.innerHTML = `
      <ul class="arrow-list">${descriptionList}</ul>${additionalLink}
      
       <p style="padding-left: 20px;"><strong>Venue:</strong> ${venue}</p>
      <p style="padding-left: 20px;"><strong>Coordinator:</strong> ${coordinatorName}</p>
      <p style="padding-left: 20px;"> <strong>Phone:</strong> ${coordinatorPhone}</p>
     
    `;
    popup.style.display = 'flex';
  });
});

rulesButtons.forEach(button => {
  button.addEventListener('click', function() {
    const event = this.getAttribute('data-event');
    popupTitle.textContent = event + " Rules";
    const rulesList = rules[event].map(rule => `<li>${rule}</li>`).join('');

    // Add specific link for InsightX
    let additionalLink = '';
    if (event === 'InsightX') {
      additionalLink = `<p><a href="https://drive.google.com/drive/folders/1d7262NASK402nZeFqAZqkGL53LGnYlpk?usp=sharing" target="_blank">Download PPT & Papre format</a></p>`;
    }

    popupContent.innerHTML = `<ul class="arrow-list">${rulesList}</ul>${additionalLink}`;
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
  
