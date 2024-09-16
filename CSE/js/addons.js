// Set the event date (Year, Month (0-indexed), Day)
const eventDate = new Date('2024-10-04T00:00:00'); // Example: Event on October 1, 2024

// Function to calculate and display the countdown
function calculateCountdown() {
    const currentDate = new Date();
    const timeDifference = eventDate - currentDate;
    
    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Update the HTML elements with the calculated time
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;

    // Check if the countdown is over
    if (timeDifference < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "<p>The event has started!</p>";
    }
}

// Update the countdown every second
const countdownInterval = setInterval(calculateCountdown, 1000);

// Initial call
calculateCountdown();
