import { Worker } from 'worker_threads';
import path from 'path';

const generatePrimes = (start: number, end: number, callback: (primes: number[]) => void) => {
    const worker = new Worker(path.resolve(__dirname, './mainWorkers.js'), {
        workerData: { start, end }
    });

    worker.on('message', (primes: number[]) => {
        callback(primes);
    });

    worker.on('error', (error) => {
        console.error('Error:', error);
    });

    worker.on('exit', (code) => {
        if (code !== 0) console.error(new Error(`Worker stopped with exit code ${code}`));
    });
};

const main = () => {
    const start = 2;
    const end = 1e7;
    const numWorkers = 4;
    const rangeSize = Math.ceil((end - start + 1) / numWorkers);
    const tasks: number[][] = [];
    let completedTasks = 0;
    const startTime = new Date().getTime();

    const collectResults = (primes: number[]) => {
        tasks.push(primes);
        completedTasks += 1;
        if (completedTasks === numWorkers) {
            const flatPrimes = tasks.flat();
            const endTime = new Date().getTime();
            const timeDiff = (endTime - startTime) / 1000; // second
            console.log(`${flatPrimes}`);
            console.log(`Faster one: ${timeDiff} seconds, # ${flatPrimes.length} `)

        }
    };

    for (let i = 0; i < numWorkers; i++) {
        const workerStart = start + i * rangeSize;
        const workerEnd = Math.min(workerStart + rangeSize - 1, end);
        generatePrimes(workerStart, workerEnd, collectResults);
    }
};

main();
