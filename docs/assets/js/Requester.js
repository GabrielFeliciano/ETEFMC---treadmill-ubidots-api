class Requester {
    constructor () {
        this.isDelayOn = false;
        this.delay = 15;
    }

    send (pos, body, onDelayOn, onDelayDone, whileDelayOn) {
        if (this.isDelayOn) { return null; }

        this.isDelayOn = true;
        onDelayOn();

        const requestOpt = {
            method: 'POST',
            headers: {
                'X-Auth-Token': 'BBFF-ycnt827PsP3fvFOt50yeJvdcNBNzTP',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: "same-origin"
        }
        fetch(`http://things.ubidots.com/api/v1.6/devices/running-machine-${pos}`, requestOpt)
        .then(console.log)
        .catch(console.error);

        let timer = 0;
        whileDelayOn(this.delay - timer);
        const intervalID = setInterval(function () {
            timer++;
            whileDelayOn(this.delay - timer);

            if (timer > this.delay) {
                this.isDelayOn = false;
                onDelayDone();
                clearInterval(intervalID);
                return null;
            }
        }.bind(this), 1000);
    }
}

export default Requester;