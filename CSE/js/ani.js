document.addEventListener('DOMContentLoaded', function () {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
       
         //reset: true 
    });
    sr.reveal('.container .row h1', { interval: 200, delay: 150 });
    sr.reveal('.countdown-container #countdown div', { interval: 200, delay: 150 });
    sr.reveal('#but', { delay: 300 });
    sr.reveal('#rules', { delay: 300 });
    sr.reveal('#rulescon', { delay: 300 });
    sr.reveal('.container #abouts div', { interval: 200,delay: 400 });
    sr.reveal('.highlighted-cards', { delay: 500 });
    sr.reveal('#tech .row div', { interval: 200, delay: 150 });
    sr.reveal('#nontech .row div', { interval: 200, delay: 150 });
    sr.reveal('#photo .item a', { interval: 200, delay: 150 });
    sr.reveal('#blog-section .row div', { interval: 200, delay: 150 });
    sr.reveal('.footer .container div', { interval: 200, delay: 150 });
  // sr.reveal('.floating-video ', { delay: 150 });


    
});


