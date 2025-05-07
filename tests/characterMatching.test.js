const { matchCharacter, generateClues } = require('../script.js');

describe('Character Matching', () => {
    const testCharacters = [
        { name: 'Luke Skywalker', species: 'Human', homeworld: 'Tatooine' },
        { name: 'Darth Vader', species: 'Human', homeworld: 'Tatooine' }
    ];

    test('exact name match', () => {
        expect(matchCharacter('Luke Skywalker', testCharacters)).toBe(true);
    });

    test('case-insensitive match', () => {
        expect(matchCharacter('luke skywalker', testCharacters)).toBe(true);
    });

    test('partial name match', () => {
        expect(matchCharacter('Skywalker', testCharacters)).toBe(true);
    });

    test('generate clues', () => {
        const clues = generateClues(testCharacters[0]);
        expect(clues).toContain('Human');
        expect(clues).toContain('Tatooine');
    });
});
