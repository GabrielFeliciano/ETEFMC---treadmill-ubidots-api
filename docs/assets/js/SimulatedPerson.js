const random = (size = 10) => {
    let result = 0;
    for (let i = 0; i < size; i++) {
        result += Math.random();
    }
    return result / size;
}
    

const names = [
    'Jonas',
    'Gabriel',
    'Alisson',
    'Codeine',
    'Froy',
    'Strongnost',
    'Zeta',
    'Junior',
    'Delpha',
    'Gih',
    'Clarity',
    'Thin',
    'Dr Velorine',
    '^~^',
    'undefined'
]

class SimulatedPerson {
    constructor () {
        fetch('https://randomuser.me/api/')
        .then(e => e.json())
        .then((response => this.changeName(response.results[0].name.first)).bind(this))
        .catch(names[this.intRandomizer(names.length) - 1]);

        this.resistance = this.intRandomizer(10) / 10;
        this.determination = this.intRandomizer(10) / 10;
        this.experience = this.intRandomizer(10) / 10;

        this.maxVelocity = 1.25 * this.determination + 2.5 * (this.resistance - .5) + 8;
        this.timeToSpend = 120 + 100 * this.determination + this.randomizerPosOrNeg(28);

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
        const intNum = Math.floor(size * randomBetween0and1) + 1;
        return intNum;
    }

    randomizerPosOrNeg (size = 5) {
        const posOrNeg = random() > .5 ? 1 : -1;
        return posOrNeg * size * random();
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

    changeName (name) {
        this.name = name;
    }
}

export default SimulatedPerson;