// Add any global test setup here
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};

// Mock browser APIs if needed
global.window = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
};
