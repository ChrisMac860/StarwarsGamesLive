document.addEventListener('DOMContentLoaded', function() {
    let currentCharacter = "";
    let score = 0;

    const charactersList = getCharacters();


     // Helper function: sanitize string (lowercase & remove symbols)
    function sanitize(str) {
        return str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    }

    // Helper function: compute Levenshtein distance between two strings
    function levenshtein(a, b) {
        const m = a.length, n = b.length;
        const dp = [];
        for (let i = 0; i <= m; i++) {
            dp[i] = [];
            dp[i][0] = i;
        }
        for (let j = 0; j <= n; j++) {
            dp[0][j] = j;
        }
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (a[i - 1] === b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + 1,    // deletion
                        dp[i][j - 1] + 1,    // insertion
                        dp[i - 1][j - 1] + 1 // substitution
                    );
                }
            }
        }
        return dp[m][n];
    }

    function setupInitialModalBehavior() {
        const initialModal = document.getElementById("myModal");

        // Show the welcome modal initially
        initialModal.style.display = "block";

        // Close button behavior
        document.querySelector('.close').addEventListener('click', () => {
            initialModal.style.display = "none";
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', (event) => {
            if (event.target === initialModal) {
                initialModal.style.display = "none";
            }
        });

        // Help Modal Event Listeners
        const helpButton = document.getElementById('helpButton');
        const helpModal = document.getElementById('helpModal');
        const closeHelp = document.querySelector('.closeHelp');
        
        helpButton.addEventListener('click', () => {
            helpModal.style.display = 'block';
        });
        closeHelp.addEventListener('click', () => {
            helpModal.style.display = 'none';
        });
        window.addEventListener('click', (event) => {
            if (event.target === helpModal) helpModal.style.display = 'none';
        });

    }
    

    function initializeGame() {
        score = 0;
        setupEventListeners();
        selectNewCharacter();
    }

    function setupEventListeners() {
        document.querySelector('.closeNames').addEventListener('click', function() {
            document.getElementById('namesModal').style.display = 'none';
        });
        const giveUpButton = document.querySelector('button[name="giveUpButton"]');
        const guessButton = document.querySelector('button[name="guessButton"]');
        const namesButton = document.querySelector('button[name="namesButton"]');
        const playAgainButton = document.getElementById('playAgainButton');

        guessButton.addEventListener('click', handleGuess);
        giveUpButton.addEventListener('click', handleGiveUp);
        namesButton.addEventListener('click', handleNames);
        playAgainButton.addEventListener('click', handlePlayAgain);
        
    }

    function selectNewCharacter() {
        currentCharacter = characters[Math.floor(Math.random() * characters.length)];
        clearClues();
        document.getElementById('guessBox').value = '';
    }

    function handleGuess() {
        const guessBox = document.getElementById('guessBox');
        const userGuess = guessBox.value.trim();
        const sanitizedUserGuess = sanitize(userGuess);

        // Check if the guess is correct (allowing up to 2 character differences)
        if (levenshtein(sanitize(currentCharacter.name), sanitizedUserGuess) <= 2) {
            markGuessedCharacter(currentCharacter);
            updateCluesBasedOnGuess(currentCharacter, currentCharacter);
            showResultModal(`Correct! It was ${currentCharacter.name}.`);
        } else {
            // Attempt to find a matching character from the list
            const guessedCharacter = characters.find(char => {
                return levenshtein(sanitize(char.name), sanitizedUserGuess) <= 2;
            });
            if (guessedCharacter) {
                markGuessedCharacter(guessedCharacter);
                updateCluesBasedOnGuess(guessedCharacter, currentCharacter);
                animateIncorrectGuess();
            } else {
                alert('Character not found, try again!');
            }
        }
        score++;
        guessBox.value = ''; // Clear the guessBox after each guess
    }


    function markGuessedCharacter(guessedCharacter) {
        const sanitized = guessedCharacter.name.replace(/\s+/g, '-').toLowerCase();
        const nameElement = document.getElementById(`name-${sanitized}`);
        if (nameElement) nameElement.classList.add('guessed');
    }

    function handleGiveUp() {
        showResultModal(`You gave up. The correct answer was ${currentCharacter.name}.`);
    }

    function handlePlayAgain() {
        document.getElementById('resultModal').style.display = 'none'; // Hide the result modal
        score = 0; // Reset score
        selectNewCharacter();
    }

    function handleNames() {
        const namesListElement = document.getElementById('namesList');
        namesListElement.innerHTML = characters.map(character => {
            const sanitized = character.name.replace(/\s+/g, '-').toLowerCase();
            return `<p id="name-${sanitized}">${character.name}</p>`;
        }).join('');
        document.getElementById('namesModal').style.display = 'block';
    }

    function showResultModal(message) {
        const resultModal = document.getElementById('resultModal');
        document.getElementById('resultMessage').textContent = message;
        document.getElementById('finalScore').textContent = score;
        resultModal.style.display = 'block';

        // Setup behavior for closing the result modal
        document.querySelector('.closeResult').addEventListener('click', () => resultModal.style.display = "none");
        window.addEventListener('click', (event) => {
            if (event.target === resultModal) resultModal.style.display = "none";
        });
    }

    function animateIncorrectGuess() {
        const guessBox = document.getElementById('guessBox');
        guessBox.classList.add('incorrect-guess-animation');
        setTimeout(() => {
            guessBox.classList.remove('incorrect-guess-animation');
        }, 1000); // Reset animation after 1 second
    }

    function updateCluesBasedOnGuess(guessedCharacter, currentCharacter) {
        if (guessedCharacter.affiliation && guessedCharacter.affiliation === currentCharacter.affiliation) {
            document.getElementById('affiliationValue').textContent = currentCharacter.affiliation;
        }
        if (guessedCharacter.weapon && guessedCharacter.weapon === currentCharacter.weapon) {
            document.getElementById('weaponValue').textContent = currentCharacter.weapon;
        }
        if (guessedCharacter.forceSensitive && guessedCharacter.forceSensitive === currentCharacter.forceSensitive) {
            document.getElementById('forceValue').textContent = currentCharacter.forceSensitive;
        }
        if (guessedCharacter.planet && guessedCharacter.planet === currentCharacter.planet) {
            document.getElementById('planetValue').textContent = currentCharacter.planet;
        }
        if (guessedCharacter.species && guessedCharacter.species === currentCharacter.species) {
            document.getElementById('speciesValue').textContent = currentCharacter.species;
        }
        if (guessedCharacter.died && guessedCharacter.died === currentCharacter.died) {
            document.getElementById('diedValue').textContent = currentCharacter.died;
        }
        if (guessedCharacter.occupation && guessedCharacter.occupation === currentCharacter.occupation) {
            document.getElementById('occupationValue').textContent = currentCharacter.occupation;
        }
        if (guessedCharacter.appearedIn && currentCharacter.appearedIn) {
            const commonAppearances = guessedCharacter.appearedIn.filter(movie => currentCharacter.appearedIn.includes(movie));
            if (commonAppearances.length > 0) {
                document.getElementById('appearedInValue').textContent = commonAppearances.join(', ');
            }
        }
    }

    function clearClues() {
        document.getElementById('affiliationValue').textContent = '-';
        document.getElementById('weaponValue').textContent = '-';
        document.getElementById('forceValue').textContent = '-';
        document.getElementById('planetValue').textContent = '-';
        document.getElementById('speciesValue').textContent = '-';
        document.getElementById('diedValue').textContent = '-';
        document.getElementById('occupationValue').textContent = '-';
        document.getElementById('appearedInValue').textContent = '-';
    }

    document.getElementById('donateButton').addEventListener('click', function() {
        window.open('https://buymeacoffee.com/christopheosp', '_blank');
    });
    

    setupInitialModalBehavior();
    initializeGame();  // Directly initialize the game
});

