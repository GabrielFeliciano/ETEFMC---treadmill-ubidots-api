class Requester {
    constructor () {
        this.isDelayOn = false;
    }

    send (pos, body, onDelayOn, onDelayDone) {
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

        setTimeout(function () {
            this.isDelayOn = false;
            onDelayDone();
        }.bind(this), 3000);
    }
}

export default Requester;