document.addEventListener('DOMContentLoaded', function() {
    let currentCharacter = "";

// Testable functions for game logic
function matchCharacter(guess, characters) {
    return characters.some(character => 
        character.name.toLowerCase().includes(guess.toLowerCase())
    );
}

function generateClues(character) {
    return [
        character.species,
        character.homeworld
    ];
}

function startGame(characters) {
    const currentCharacter = selectDailyCharacter(characters);
    return {
        currentCharacter,
        score: 0,
        attemptsLeft: 6
    };
}

function getCurrentCharacter(gameState) {
    return gameState.currentCharacter;
}

function submitGuess(gameState, guess, characters) {
    const isCorrect = matchCharacter(guess, [gameState.currentCharacter]);
    
    if (isCorrect) {
        gameState.score += 10;
    } else {
        gameState.attemptsLeft -= 1;
    }

    return {
        isCorrect,
        score: gameState.score
    };
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        matchCharacter,
        generateClues,
        startGame,
        getCurrentCharacter,
        submitGuess
    };
}
    let score = 0;

    function getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }
      
    // Selects the daily character based on the day-of-year
    function selectDailyCharacter() {
    const day = getDayOfYear();
    currentCharacter = characters[day % characters.length];
    clearClues();
    document.getElementById('guessBox').value = '';
    }

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
        initialModal.style.display = "flex";

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
            helpModal.style.display = 'flex';
        });
        closeHelp.addEventListener('click', () => {
            helpModal.style.display = 'none';
        });
        window.addEventListener('click', (event) => {
            if (event.target === helpModal) helpModal.style.display = 'none';
        });

        // Ensure close buttons work
        const modalCloseButtons = document.querySelectorAll('.close, .closeResult, .closeNames');
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const parentModal = button.closest('.modal');
                if (parentModal) {
                    parentModal.style.display = 'none';
                }
            });
        });
    }
    
    let currentMode = "quick";

    function initializeGame(mode = "quick") {
        currentMode = mode; // update the mode variable
        score = 0;
        setupEventListeners();
        
        // Update the indicator text:
        document.getElementById('modeIndicator').textContent = 
          mode === "daily" ? "Daily Challenge" : "Quick Play";
        
        if (mode === "daily") {
          selectDailyCharacter();
        } else {
          selectNewCharacter();
        }
    }
      
      
    /*function initializeGame() {
        score = 0;
        setupEventListeners();
        selectNewCharacter();
    }*/

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

        document.getElementById('quickPlayButton').addEventListener('click', () => {
            initializeGame("quick"); // Start quick play mode
            document.getElementById('myModal').style.display = 'none'; // Hide the modal
        });
          
        document.getElementById('dailyChallengeButton').addEventListener('click', () => {
            initializeGame("daily"); // Start daily challenge mode
            document.getElementById('myModal').style.display = 'none'; // Hide the modal
        });
          
          
        
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
        const resultModal = document.getElementById('resultModal');
        const resultTitle = document.getElementById('resultTitle');
        const resultMessage = document.getElementById('resultMessage');
        const finalScore = document.getElementById('finalScore');

        resultTitle.textContent = 'Game Over';
        resultMessage.textContent = `The character was ${currentCharacter.name}.`;
        finalScore.style.display = 'none'; // Hide score
        resultModal.style.display = 'flex';
    }

    function handlePlayAgain() {
        document.getElementById('resultModal').style.display = 'none';
        score = 0;
        if (currentMode === "daily") {
          // Force switch to Quick Play mode after a daily challenge
          initializeGame("quick");
        } else {
          // Otherwise, just restart Quick Play as normal
          initializeGame("quick");
        }
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
        const resultMessage = document.getElementById('resultMessage');
        const finalScore = document.getElementById('finalScore');
        const resultTitle = document.getElementById('resultTitle');

        resultMessage.textContent = message;
        finalScore.textContent = score;
        resultModal.style.display = 'flex';

        // Only show score for correct guesses
        if (message.includes('Correct')) {
            finalScore.style.display = 'block';
        } else {
            finalScore.style.display = 'none';
        }

        // Ensure modal can be closed by clicking outside or on close button
        const closeButtons = resultModal.querySelectorAll('.closeResult');
        closeButtons.forEach(button => {
            button.onclick = () => {
                resultModal.style.display = 'none';
            };
        });

        // Close modal when clicking outside
        resultModal.onclick = (event) => {
            if (event.target === resultModal) {
                resultModal.style.display = 'none';
            }
        };
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

