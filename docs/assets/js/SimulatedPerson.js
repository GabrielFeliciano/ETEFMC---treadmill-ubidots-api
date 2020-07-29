class SimulatedPerson {
    constructor () {
        this.resistance = this.intRandomizer(10) / 10;
        this.determination = this.intRandomizer(10) / 10;
        this.experience = this.intRandomizer(10) / 10;

        this.maxVelocity = 1.25 * this.determination + 2.5 * (this.resistance - .5) + 8;
        this.timeToSpend = 200 + 100 * this.determination + this.randomizerPosOrNeg(28)

        this.velocityFunction = this.createVelocityFunction();
        this.distanceFunction = this.createDistanceFunction();
        this.accelerationFunction = this.createAcceleration();
    }

    start () {
        let time = 0;
        const intervalID = setInterval(function () {
            console.log(this.calculateStats(time));

            time += .1;
            time > this.timeToSpend ? clearInterval(intervalID) : null;
        }.bind(this), 100);
    }

    calculateStats (time) {
        return {
            velocity: this.velocityFunction(time), 
            distance: this.distanceFunction(time), 
            acceleration: this.accelerationFunction(time)
        };
    }

    intRandomizer (size = 5) {
        const randomBetween0and1 = Math.random();
        const intNum = size * (randomBetween0and1 - randomBetween0and1 % (1/size)) + 1;
        return intNum;
    }

    randomizerPosOrNeg (size = 5) {
        const posOrNeg = Math.random() > .5 ? 1 : -1;
        return posOrNeg * size * Math.random();
    }

    // Main Function!
    createVelocityFunction () {
        // Cheers to https://www.integral-calculator.com/ and https://www.derivative-calculator.net/
        // Math derivative and integral calculators! :D
        // b * (log(1.1, x/2 + 1) / (log(1.1, a/2 + 1) - log(1.1, 1)))

        const f = x => Math.log(x/2 + 1) / Math.log(1.1);
        const v = x => this.maxVelocity * (f(x) / (f(this.timeToSpend) - f(0)));

        return v;
    }

    createDistanceFunction () {
        const ln = Math.log;
        const d = x => (this.maxVelocity * ln(x/2 + 1) * (x + 2) - x) / (ln(this.timeToSpend / 2 + 1));

        return d;
    }

    createAcceleration () {
        const ln = Math.log;
        const a = x => this.maxVelocity / (ln((this.timeToSpend + 2) / 2) * (x + 2));

        return a;
    }
}