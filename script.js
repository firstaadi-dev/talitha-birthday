document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown
    initCountdown();
    
    // Hide all content except countdown initially
    hideContentUntilCountdownEnds();
    
    // Initialize floating hearts
    initFloatingHearts();
    
    // Initialize music player
    initMusicPlayer();
    
    // Initialize message cards
    initMessageCards();
    
    // Initialize quote slider
    initQuoteSlider();
    
    // Initialize text-to-speech
    initTextToSpeech();
    
    // Play music on countdown screen
    playCountdownMusic();
});

// Play music on countdown screen
function playCountdownMusic() {
    const backgroundMusic = document.getElementById('background-music-waiting');
    
    // Make sure the audio is loaded
    backgroundMusic.load();
    
    // Set volume and play
    backgroundMusic.volume = 0.5;
    
    // Try to play immediately
    backgroundMusic.play().catch(error => {
        console.log('Autoplay prevented. Adding click event to start music.');
        
        // Add a one-time click event to the document to start music on first interaction
        document.addEventListener('click', function startMusicOnInteraction() {
            backgroundMusic.play().catch(e => console.log('Still could not play audio:', e));
            document.removeEventListener('click', startMusicOnInteraction);
        }, { once: true });
    });
}

// Hide all content except countdown
function hideContentUntilCountdownEnds() {
    // Hide all sections except countdown
    const sectionsToHide = document.querySelectorAll('section:not(.countdown), header, .music-control, .floating-hearts-container');
    sectionsToHide.forEach(section => {
        section.style.display = 'none';
    });
    
    // Add a special class to the countdown section to make it centered
    document.querySelector('.countdown').classList.add('countdown-fullscreen');
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.countdown-fullscreen').appendChild(particlesContainer);
    
    // Create particles
    createParticles(particlesContainer);
    
    // Add motivational message container
    const messageContainer = document.createElement('div');
    messageContainer.className = 'motivational-message';
    messageContainer.innerHTML = '<p id="motivation-text">Loading message...</p>';
    document.querySelector('.countdown-fullscreen').appendChild(messageContainer);
    
    // Pause background music waiting
    const backgroundMusic = document.getElementById('background-music-waiting');
    backgroundMusic.pause();
    
    // Start rotating messages
    rotateMotivationalMessages();
}

// Rotate motivational messages
function rotateMotivationalMessages() {
    const messages = [
        "Can't wait to celebrate with you! ❤️",
        "Every second brings us closer to your special day!",
        "Preparing something special just for you...",
        "Your birthday is going to be amazing!",
        "Counting down to the best day of the year!",
        "Get ready for an NCT-filled celebration!",
        "You deserve all the happiness in the world!",
        "Your smile is worth waiting for!",
        "The best is yet to come!",
        "Excited to make your day special!"
    ];
    
    let currentIndex = 0;
    
    // Update message immediately
    document.getElementById('motivation-text').textContent = messages[currentIndex];
    
    // Change message every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % messages.length;
        
        // Fade out
        const textElement = document.getElementById('motivation-text');
        textElement.style.opacity = 0;
        
        // Change text and fade in after a short delay
        setTimeout(() => {
            textElement.textContent = messages[currentIndex];
            textElement.style.opacity = 1;
        }, 500);
    }, 5000);
}

// Create floating particles
function createParticles(container) {
    const colors = ['#ff9a9e', '#fad0c4', '#ffd1ff', '#a18cd1', '#ffffff'];
    
    // Create 50 particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 15 + 5; // 5-20px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100; // 0-100%
        const duration = Math.random() * 15 + 10; // 10-25s
        const delay = Math.random() * 5; // 0-5s
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${left}%`;
        particle.style.top = '100%';
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add to container
        container.appendChild(particle);
    }
}

// Show all content
function showAllContent() {
    // Show all hidden sections
    const hiddenSections = document.querySelectorAll('section, header, .music-control, .floating-hearts-container');
    hiddenSections.forEach(section => {
        section.style.display = '';
    });
    
    // Remove the fullscreen class from countdown
    document.querySelector('.countdown').classList.remove('countdown-fullscreen');
    
    // Remove particles and motivational messages
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        particlesContainer.remove();
    }
    
    const motivationalMessage = document.querySelector('.motivational-message');
    if (motivationalMessage) {
        motivationalMessage.remove();
    }
    
    // Launch confetti to celebrate
    launchConfetti();
}

// Countdown Timer
function initCountdown() {
    // Set the date we're counting down to (Talitha's birthday)
    const birthdayDate = new Date("2025-03-24T00:00:00").getTime(); // Talitha's birthday - March 24, 2025
    
    // Update the countdown every 1 second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the birthday date
        const distance = birthdayDate - now;
        
        // If the birthday has passed, display a special message
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("countdown-timer").innerHTML = "<h3>Happy Birthday! 🎉</h3>";
            
            // Show all content after a short delay
            setTimeout(showAllContent, 2000);
            return;
        }
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results
        document.getElementById("days").textContent = formatTime(days);
        document.getElementById("hours").textContent = formatTime(hours);
        document.getElementById("minutes").textContent = formatTime(minutes);
        document.getElementById("seconds").textContent = formatTime(seconds);
    }, 1000);
}

// Format time to always have two digits
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

// Floating Hearts Animation
function initFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartCount = 20;
    
    // Create heart elements
    for (let i = 0; i < heartCount; i++) {
        createHeart(container);
    }
    
    // Create new hearts periodically
    setInterval(() => {
        createHeart(container);
    }, 3000);
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random position, size, and animation duration
    const size = Math.random() * 20 + 10;
    const startPos = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    
    // Set heart styles
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${startPos}%`;
    heart.style.bottom = '-20px';
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    
    // Choose between different heart colors
    const colors = ['#ff3399', '#00b140', '#6600cc'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Add SVG heart
    heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${randomColor}">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;
    
    // Add heart to container
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

// Music Player
function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    // Set initial state - music is already playing from countdown
    let isMusicPlaying = true;
    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    
    // Toggle music on button click
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            backgroundMusic.play().catch(error => {
                console.log('Autoplay prevented. User interaction required.');
            });
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
        
        isMusicPlaying = !isMusicPlaying;
    });
}

// Message Cards
function initMessageCards() {
    const messageCards = document.querySelectorAll('.message-card');
    
    messageCards.forEach(card => {
        card.addEventListener('click', function() {
            this.querySelector('.message-card-inner').style.transform = 
                this.querySelector('.message-card-inner').style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)';
        });
    });
}

// Quote Slider
function initQuoteSlider() {
    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;
    
    // Hide all quotes except the first one
    for (let i = 1; i < quotes.length; i++) {
        quotes[i].style.display = 'none';
    }
    
    // Change quote every 5 seconds
    setInterval(() => {
        quotes[currentQuote].style.display = 'none';
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].style.display = 'block';
    }, 5000);
}

// Add confetti effect on page load
function launchConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Use NCT colors
        const colors = ['#00b140', '#ff3399', '#6600cc', '#ffffff'];
        
        // Confetti from both sides
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: colors
        });
        
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: colors
        });
    }, 250);
}

// Launch confetti when page loads
window.addEventListener('load', launchConfetti);

// Typewriter effect for the intro message
function typeWriter(element, text, speed, callback) {
    let i = 0;
    const interval = setInterval(function() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

// Initialize text-to-speech
function initTextToSpeech() {
    const readWishBtn = document.getElementById('read-wish');
    
    // Create audio element for custom message
    const customAudio = new Audio('tts/custom_haechan.mp3');
    
    readWishBtn.addEventListener('click', function() {
        // Pause background music if it's playing
        const backgroundMusic = document.getElementById('background-music');
        const wasMusicPlaying = !backgroundMusic.paused;
        if (wasMusicPlaying) {
            backgroundMusic.pause();
            document.getElementById('music-toggle').innerHTML = '<i class="fas fa-music"></i>';
        }
        
        // Change button text while playing
        readWishBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Playing...';
        readWishBtn.disabled = true;
        
        // Play the custom audio
        customAudio.play();
        
        // When audio ends
        customAudio.onended = function() {
            readWishBtn.innerHTML = '<i class="fas fa-volume-up"></i> Listen to Birthday Wish';
            readWishBtn.disabled = false;
            
            // Resume music if it was playing
            if (wasMusicPlaying) {
                backgroundMusic.play();
                document.getElementById('music-toggle').innerHTML = '<i class="fas fa-pause"></i>';
            }
        };
    });
} 