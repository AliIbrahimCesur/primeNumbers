const min = 2;
const max = 1e7;
const primes = [];

function generatePrimes(start, range) {
    let isPrime = true;
    let end = start + range;

    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

// Timer started
const startTime = new Date().getTime();

generatePrimes(min, max);

// Timer ended
const endTime = new Date().getTime();

// Time difference
const timeDiff = (endTime - startTime) / 1000; 

const message = "Prime is : " + primes.join(" ");

console.log(message);
console.log(`Slower one: ${timeDiff} seconds, # ${primes.length} `)
