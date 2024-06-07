const { generatePrimes } = require('../referanceCodeEdited');

test('example code generates primes in the range 2 to 20', () => {
    const primes = generatePrimes(2, 18); 
    expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
});

test('example code generates primes in the range 10 to 30', () => {
    const primes = generatePrimes(10, 20); 
    expect(primes).toEqual([11, 13, 17, 19, 23, 29]);
});



