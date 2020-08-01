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
    constructor (whenStartForReal, whenDone) {
        this.whenStartForReal = whenStartForReal;
        this.whenDone = whenDone;

        fetch('https://randomuser.me/api/')
        .then(e => e.json())
        .then((response => this.changeName(response.results[0].name.first)).bind(this))
        .catch(err => this.changeName(names[this.intRandomizer(names.length) - 1]));

        this.about = {
            resistance: this.intRandomizer(10),
            determination: this.intRandomizer(10),
            experience: this.intRandomizer(10)
        }

        this.about = { ...this.about,
            maxVelocity: 1.25 * this.about.determination / 10 + 1.75 * this.about.resistance / 10 + 1.75,
            timeToSpend: 100 + 50 * this.about.determination / 10 + this.randomizerPosOrNeg(18)
        }
        
        this.stats = {
            velocity: 0,
            distance: 0,
            acceleration: 0,
            time: 0
        }

        this.velocityFunction = this.createVelocityFunction();
        this.distanceFunction = this.createDistanceFunction();
        this.accelerationFunction = this.createAcceleration();

        this.observers = [];
    }

    start () {
        setTimeout(function () {
            this.whenStartForReal();

            let time = 0;
            const intervalID = setInterval(function () {
                this.calculateStats(time);
                for (let observer of this.observers) {
                    observer(this.about, this.stats);
                }
    
                time += .1;
                this.stats.time = time.toFixed(2);
                time > this.about.timeToSpend ? this.end(intervalID) : null;
            }.bind(this), 50);
        }.bind(this), (this.intRandomizer(2.5) + 15) * 1000)
    }

    end (intervalID) {
        clearInterval(intervalID);
        this.whenDone();
    }

    subscribeObserver (observer) {
        this.observers.push(observer);
    }

    calculateStats (time) {
        this.stats.velocity = this.velocityFunction(time).toFixed(3); 
        this.stats.distance = this.distanceFunction(time).toFixed(3);
        this.stats.acceleration = this.accelerationFunction(time).toFixed(3);
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
        const v = x => this.about.maxVelocity * (f(x) / (f(this.about.timeToSpend) - f(0)));

        return v;
    }

    createDistanceFunction () {
        const ln = Math.log;
        const d = x => (this.about.maxVelocity * ln(x/2 + 1) * (x + 2) - x) / (ln(this.about.timeToSpend / 2 + 1));

        return d;
    }

    createAcceleration () {
        const ln = Math.log;
        const a = x => this.about.maxVelocity / (ln((this.about.timeToSpend + 2) / 2) * (x + 2));

        return a;
    }

    changeName (name) {
        this.about.name = name;
    }
}

export default SimulatedPerson;