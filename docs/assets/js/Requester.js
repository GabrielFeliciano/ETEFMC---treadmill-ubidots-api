class Requester {
    constructor () {
        this.isDelayOn = false;
        this.delay = 15;
    }

    send (pos, body, onDelayOn, onDelayDone, whileDelayOn, responseStatus) {
        if (this.isDelayOn) { return null; }

        this.isDelayOn = true;
        onDelayOn && onDelayOn();

        const requestOpt = {
            method: 'POST',
            headers: {
                'X-Auth-Token': 'BBFF-ycnt827PsP3fvFOt50yeJvdcNBNzTP',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: "same-origin"
        }
        fetch(`http://things.ubidots.com/api/v1.6/devices/running-machine-${pos + 1}`, requestOpt)
        .then(
            function () {
                const style = 'color: #bada55; font-weight: bold'

                const text = [
                '%cSending Data...', 
                `Url: http://things.ubidots.com/api/v1.6/devices/running-machine-${pos + 1}`,
                `Body: ${JSON.stringify(body)}`,
                'Apparent everything went good... 👌'
                ]
                .reduce((total, next) => total + '\n' + next);

                console.log(text, style);

                responseStatus && responseStatus(true)
            }
        )
        .catch(
            function () {
                const style = 'color: #da7055; font-weight: bold'

                const text = [
                '%cSending Data...', 
                `Url: http://things.ubidots.com/api/v1.6/devices/running-machine-${pos + 1}`,
                `Body: ${JSON.stringify(body)}`,
                'Something went very badly wrong... 😨'
                ]
                .reduce((total, next) => total + '\n' + next);

                console.log(text, style);

                responseStatus && responseStatus(false)
            }
        );

        let timer = 0;
        whileDelayOn && whileDelayOn(this.delay - timer);
        const intervalID = setInterval(function () {
            timer++;
            whileDelayOn && whileDelayOn(this.delay - timer);

            if (timer > this.delay) {
                this.isDelayOn = false;
                onDelayDone && onDelayDone();
                clearInterval(intervalID);
                return null;
            }
        }.bind(this), 1000);
    }
}

export default Requester;