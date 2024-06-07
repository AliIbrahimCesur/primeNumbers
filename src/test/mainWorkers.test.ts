import { Worker } from 'worker_threads';
import path from 'path';

const runWorker = (start: number, end: number): Promise<number[]> => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, '../../dist/mainWorkers.js'), {
            workerData: { start, end },
        });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
};

test('generates primes in the range 2 to 20', async () => {
    const primes = await runWorker(2, 20);
    expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
});

test('generates primes in the range 10 to 30', async () => {
    const primes = await runWorker(10, 30);
    expect(primes).toEqual([11, 13, 17, 19, 23, 29]);
});

test('generates no primes in the range 0 to 1', async () => {
    const primes = await runWorker(0, 1);
    expect(primes).toEqual([]);
});


