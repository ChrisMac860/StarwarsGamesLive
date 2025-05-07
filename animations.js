document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.getElementById('confettiContainer');
    const celebrationSound = document.getElementById('celebrationSound');

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
            confettiContainer.appendChild(confetti);
        }
        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 5000);
    }

    function playVibration() {
        if ('vibrate' in navigator) {
            navigator.vibrate(200);
        }
    }

    function addFocusPulse(element) {
        element.classList.add('focus-pulse');
        setTimeout(() => {
            element.classList.remove('focus-pulse');
        }, 500);
    }

    function celebrateCorrectGuess() {
        createConfetti();
        playVibration();
        celebrationSound.play();
    }

    // Example event listeners - you'll need to adapt these to your specific game logic
    const guessInput = document.getElementById('guessInput');
    const submitButton = document.getElementById('submitButton');

    if (guessInput) {
        guessInput.addEventListener('focus', () => addFocusPulse(guessInput));
    }

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            // Assuming this is triggered on a correct guess
            celebrateCorrectGuess();
        });
    }
});
