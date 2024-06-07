const { parentPort, workerData } = require('worker_threads');



const generatePrimes = (start:number, end:number) => {
    const isPrime = (num:number) => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i <= Math.sqrt(num); i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    };
    const primes = [];
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
};

const { start, end } = workerData;
const primes = generatePrimes(start, end);
parentPort.postMessage(primes);
