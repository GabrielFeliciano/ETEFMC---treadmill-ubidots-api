class SimulatedPerson {
    constructor () {
        this.resistance = this.intRandomizer(10);
        this.determination = this.intRandomizer(10);

        this.timeToSpend = 200 + 100 * (1 / this.determination) + this.randomizerPosOrNeg(28)
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
}