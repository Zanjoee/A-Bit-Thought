document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.container');
    const body = document.body;
    const music = document.getElementById('background-music');
    
    // For demo purposes - replace with actual ambient music
    music.src = "sounds.mp3";
    music.volume = 1;
    
    // Show container with animation
    setTimeout(function() {
        container.classList.add('visible');
    }, 300);
    
    // Create background stars
    createStars();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Clear existing stars
        document.querySelector('.star-container').innerHTML = '';
        // Create new stars based on new window size
        createStars();
    });
    
    // Live updating of thought in star
    const thoughtInput = document.getElementById('thought-input');
    const thoughtDisplay = document.getElementById('thought-display');
    
    thoughtInput.addEventListener('input', function() {
        thoughtDisplay.textContent = this.value;
    });
    
    // Let Go Button functionality
    const letGoBtn = document.getElementById('let-go-btn');
    letGoBtn.addEventListener('click', letGo);
    
    // Allow pressing Enter in the input field to trigger Let Go
    thoughtInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter' && this.value.trim() !== '') {
            letGo();
        }
    });
});

function createStars() {
    const starContainer = document.querySelector('.star-container');
    const numberOfStars = 200;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random properties
        const size = Math.random() * 3 + 0.5; // Slightly bigger stars for better visibility
        const opacity = Math.random() * 0.8 + 0.2;
        const posX = Math.random() * viewportWidth;
        const posY = Math.random() * (viewportHeight + 200); // Start some stars below viewport
        
        // Movement speed - smaller stars move slower for parallax effect
        const speed = (Math.random() * 30) + (size * 5) + 30;
        const duration = 100 / (speed / 30); // Duration in seconds
        
        // Apply styles
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;
        star.style.left = `${posX}px`;
        star.style.top = `${posY}px`;
        star.style.animationDuration = `${duration}s`;
        
        // Add a random delay so stars don't all reset at the same time
        star.style.animationDelay = `-${Math.random() * duration}s`;
        
        starContainer.appendChild(star);
    }
}

function letGo() {
    let thought = document.getElementById("thought-input").value.trim();
    
    // Check if thought is empty
    if (thought === '') {
        return;
    }
    
    let music = document.getElementById("background-music");
    
    // Try to play the music
    music.play().catch(error => {
        console.log("Audio play failed, likely due to browser autoplay policy:", error);
        // Continue with the experience even if audio fails
    });
    
    let inputField = document.getElementById("thought-input");
    let button = document.getElementById("let-go-btn");
    let mainStar = document.querySelector(".main-star");
    
    // Hide input and button
    inputField.classList.add('hidden');
    button.classList.add('hidden');
    
    // Start the star shrinking animation after a delay
    setTimeout(function() {
        mainStar.style.transform = "scale(0.01)";
        
        // Start the phrase sequence
        startPhraseSequence();
        
        // Don't set timeout for final message here - we'll do it after phrases complete
    }, 2000);
    
    // Meditation phrases
    let phrases = [
        "Unwind—watch your thought drift into the void",
        "Breathe in deep—you are here, you are alive...",
        "Breathe out—release the weight you were never meant to carry",
        "You are not broken; you are still becoming",
        "Keep moving, even if it’s slow—the road is still yours",
        "This thought will fade, but you will remain",
        "Look at the stars; they’ve been shining for you all along",
        "You may feel small, but your heart holds galaxies",
        "The night is vast, but so is your strength",
        "Even when the world feels heavy, you are not alone",
        "Time keeps moving forward, and so will you",
        "Your worries will pass, like a storm breaking into sunlight",
        "Let go. Breathe. You are allowed to find peace",
        "No matter how lost you feel, life continues as it always does",
        "You are more than this moment. You are more than enough",
    ];
    
    let currentPhraseIndex = 0;
    let h1Element = document.getElementById("changing-text");
    
    function startPhraseSequence() {
        changeText();
    }
    
    function changeText() {
        if (currentPhraseIndex < phrases.length) {
            h1Element.style.opacity = '0';
            
            setTimeout(function() {
                h1Element.innerHTML = phrases[currentPhraseIndex];
                currentPhraseIndex++;
                
                h1Element.style.opacity = '0.8';
                
                if (currentPhraseIndex < phrases.length) {
                    setTimeout(changeText, 5000); // Slightly longer to read each phrase
                } else {
                    // Fade out the last phrase
                    setTimeout(function() {
                        h1Element.style.opacity = '0';
                        // NOW show the final message after the last phrase fades out
                        setTimeout(showFinalMessage, 2000);
                    }, 5000);
                }
            }, 2000);
        }
    }
}

function showFinalMessage() {
    let container = document.querySelector('.container');
    
    // Fade out existing content
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.innerHTML = '';
        
        // Create final message
        let messageElement = document.createElement('p');
        messageElement.innerHTML = `
             Padayon katoto! - Zz 
        `;
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 5s ease';
        messageElement.style.textAlign = 'center';
        container.appendChild(messageElement);
        
        // Add restart button
        let restartBtn = document.createElement('button');
        restartBtn.textContent = 'Release Another Thought';
        restartBtn.classList.add('restart-btn');
        restartBtn.style.opacity = '0';
        restartBtn.style.transition = 'opacity 3s ease';
        restartBtn.addEventListener('click', restartExperience);
        container.appendChild(restartBtn);
        
        // Fade in container and new elements
        container.style.opacity = '1';
        
        setTimeout(() => {
            messageElement.style.opacity = '1';
            
            setTimeout(() => {
                restartBtn.style.opacity = '1';
            }, 3000);
        }, 1000);
    }, 1000);
}

function restartExperience() {
    location.reload();
}