const { startGame, submitGuess, getCurrentCharacter } = require('../script.js');

describe('Game Round Integration', () => {
    let gameState;

    beforeEach(() => {
        gameState = startGame();
    });

    test('full game round workflow', () => {
        const currentCharacter = getCurrentCharacter(gameState);
        
        // Simulate a correct guess
        const result = submitGuess(gameState, currentCharacter.name);
        
        expect(result.isCorrect).toBe(true);
        expect(result.score).toBeGreaterThan(0);
        expect(gameState.attemptsLeft).toBeLessThan(6);
    });

    test('incorrect guess reduces attempts', () => {
        const initialAttempts = gameState.attemptsLeft;
        const incorrectGuess = 'Not A Real Character';
        
        const result = submitGuess(gameState, incorrectGuess);
        
        expect(result.isCorrect).toBe(false);
        expect(gameState.attemptsLeft).toBe(initialAttempts - 1);
    });
});
