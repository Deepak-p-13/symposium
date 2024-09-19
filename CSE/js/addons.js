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
  'Presentation': [
    'Do you have an innovative idea or research that could shape the future of technology? Join us at Elements 2k24 for InsightX, the ultimate Paper Presentation event where your groundbreaking ideas take center stage.',
    'This is your opportunity to present cutting-edge research, challenge conventional thinking, and engage with a panel of experts and fellow innovators.',
    'At InsightX, we are looking for forward-thinking concepts that tackle the latest technological advancements. Share your insights, explore new possibilities, and gain invaluable feedback from professionals in the field. Whether it\'s a futuristic solution or an emerging trend, your presentation could inspire tomorrow\'s technology.',
    'Following all presentations, the judging panel will deliberate and select the top-performing presenter as the winner of the Paper Presentation Event. The winner will be announced at the conclusion of the event.',
'Bring your passion for innovation, and let your ideas inspire the future!'
  ],
  'Code-A-Thon': [
'Gear up for the ultimate test of your coding skills at Elements 2k24\'s Code-A-Thon! Whether you\'re a coding prodigy or an algorithm enthusiast, this event will push your limits as you battle against time and your peers to solve challenging problems.',
    ' Code-A-Thon is more than just a contest – it\'s a race against the clock, where logic, speed, and strategy are your greatest allies.',
    'Ready to code your way to the top? Bring your A-game, crack complex challenges, and stand a chance to become the ultimate Code-A-Thon champion!'
  ],
  'Quiz': [
    'Join us at Elements 2k24 for the exhilarating Quiz Quest, where knowledge meets excitement! This is not just any quiz; it’s a thrilling competition that challenges your intellect and creativity across both technical and general domains. Whether you\'re a tech whiz or a trivia buff, this event promises to engage, entertain, and educate.',
    'In Quiz Quest, teams will face a series of stimulating questions that span the latest in technology, scientific breakthroughs, and general knowledge. Put your skills to the test, strategize with your teammates, and compete against the brightest minds for the ultimate title of Quiz Champions!',
    'Get ready to challenge yourself, have fun, and connect with fellow knowledge seekers! Quiz Quest isn’t just about answering questions; it’s about teamwork, strategy, and a shared love for learning.',
    'Join us for a chance to showcase your intellect and enjoy a fun-filled experience at Elements 2k24! Who will emerge as the ultimate quiz masters? Come and find out!'
  ],
  'TreasureHunt': [
    'Get ready for an exhilarating adventure at Elements 2k24 with Cipher Chase! This isn’t just any ordinary treasure hunt; it’s a thrilling race that combines technical challenges with problem-solving skills, teamwork, and a bit of mystery.',
    'Participants will embark on a quest through the campus, decoding clues and solving puzzles that will test your knowledge of technology, logic, and creativity. As you navigate through each clue, you’ll uncover secrets and unlock new challenges, all while racing against the clock and other teams',
    'Whether you’re deciphering codes, cracking riddles, or tackling tech-related tasks, Cipher Chase promises to be an engaging experience that fosters collaboration and excitement. Gather your team, sharpen your minds, and prepare for a hunt that will keep you on your toes and leave you yearning for more!',
    'Will you be the first to uncover the treasure? Join us for Cipher Chase and find out!'
  ],
  'MemeTime': [
    'Welcome to *Meme Time* at *Elements 2k24*, where laughter and creativity collide! This fun-filled event invites participants to channel their inner comedian and create the most hilarious and relatable memes. ',
    'In today’s digital age, memes are the language of the internet, and now it\'s your turn to contribute to the meme culture! Whether you’re a seasoned meme-maker or a first-timer, this event encourages everyone to let their imaginations run wild. ',
    'You’ll have the chance to craft memes that reflect your unique perspective on technology, life, or current trends, all while entertaining your fellow participants.',
    'oin us for a day of creativity, humor, and camaraderie as you compete to create the funniest, most original memes. Share your creations, vote for your favorites, and enjoy a lighthearted atmosphere filled with laughter. ',
    'Get ready for *Meme Time*, where the only limit is your creativity, and the goal is to make everyone smile!'
  ],
  'Gaming': [
    'Welcome to *Game On* at *Elements 2k24*, where strategy meets excitement in an epic gaming showdown! Get ready to compete in a series of thrilling games that will test your reflexes, teamwork, and tactical skills.',
    'Join fellow gamers for an electrifying experience filled with friendly competition and endless fun. Whether you’re a casual player or a seasoned pro, this is your chance to show off your gaming prowess and claim victory!',
    'Gather your team, strategize your moves, and prepare for an unforgettable gaming adventure at *Game On*!'
  ],
  'Shortography': [
    'Welcome to *Shortography* at *Elements 2k24*, where your creativity behind the lens meets the art of editing! This exciting event invites aspiring photographers and videographers to showcase their skills in capturing stunning visuals and crafting compelling narratives through editing.',
    'In *Shortography*, participants will embark on a creative journey, capturing images and footage that tell a story or evoke emotion. Whether you’re focusing on breathtaking landscapes, candid moments, or innovative concepts, this is your chance to let your artistic vision shine.',
    ' Once you\'ve captured your content, the next challenge is to transform your raw footage into a polished masterpiece through the magic of editing.',
    'Join us for a fun-filled day of creativity, collaboration, and inspiration. Engage with fellow enthusiasts, receive valuable feedback, and stand a chance to showcase your work to a panel of judges. ',
    'Get ready to express yourself, capture stunning moments, and take your photography and video editing skills to new heights at *Shortography*!'
  ],
  'BestManager': [
    'Step into the spotlight at *Elements 2k24* with the *Best Manager* event, where your cognitive and management skills will be put to the ultimate test! This dynamic competition is designed to challenge participants in a series of engaging tasks that assess your ability to think critically, strategize effectively, and lead a team.',
    'In *Best Manager*, you\'ll navigate real-world scenarios that require quick decision-making, innovative problem-solving, and effective communication. Whether it’s managing resources, resolving conflicts, or making strategic choices, you’ll need to demonstrate your leadership prowess and adaptability in a fast-paced environment.',
    'Join us for an opportunity to showcase your management skills, network with fellow aspiring leaders, and gain invaluable insights into the world of management. Are you ready to rise to the challenge and claim the title of *Best Manager*? Join us and let your leadership shine!'
  ]
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
    'Rule 1: Teams of up to 3 members.',
    'Rule 2: You will be searching for clues to solve the puzzles.',
    'Rule 3: The team that finds the treasure first wins.'
  ],
  'MemeTime': [
    'Rule 1: Memes must be created within 30 minutes.',
    'Rule 2: No offensive or inappropriate content is allowed.',
    'Rule 3: Judges’ decisions will be final.'
  ],
  'Gaming': [
    'Rule 1: Teams of up to 5 players.',
    'Rule 2: No cheating or hacking is tolerated.',
    'Rule 3: Matches will follow standard game rules.'
  ],
  'Shortography': [
    'Rule 1: Short films must not exceed 5 minutes in length.',
    'Rule 2: All content must be original.',
    'Rule 3: Judges will evaluate based on storytelling and creativity.'
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
    const descriptionList = descriptions[event].map(desc => `<li>${desc}</li>`).join('');
    popupContent.innerHTML = `<ul class="arrow-list">${descriptionList}</ul>`;
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
  
  