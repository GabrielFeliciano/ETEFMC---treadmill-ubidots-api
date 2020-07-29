import RunningMachine from './RunningMachine.js';
import Requester from './Requester.js';

class RunningMachinesContainer {
    constructor (selector) {
        this.container = $(selector);
        this.runningMachines = [];

        this.Requester = new Requester();

        this.onDelayOn = (() => {
            this.runningMachines.forEach(e => e.buttonSend.attr('disabled', true));
            this.runningMachines.forEach(e => e.buttonSend.toggleClass('disabled'));
        }).bind(this);
        this.onDelayDone = (() => {
            this.runningMachines.forEach(e => e.buttonSend.attr('disabled', false));
            this.runningMachines.forEach(e => e.buttonSend.toggleClass('disabled'));
        }).bind(this);
    }

    new () {
        if (this.runningMachines.length >= 10) {
            return this.container;
        }

        const newMachine = new RunningMachine(
            this.del.bind(this), 
            ((pos, body) => this.Requester.send(
                pos, 
                body, 
                this.onDelayOn.bind(this), 
                this.onDelayDone.bind(this))
            ).bind(this)
        );

        this.runningMachines.push(newMachine);
        this.container.append(newMachine.runningMachine);

        newMachine.changePosition(this.runningMachines.length);

        return this.container;
    }

    del (elem) {
        this.runningMachines = this.runningMachines.filter(runningMachine => {
            if (runningMachine.runningMachine === elem) {
                console.log('oh no')
                setTimeout(() => {
                    elem.remove();
                }, 500);
                elem.css('animation', 'desappear .5s ease-in-out');
                elem.find('.close-icon').css('display', 'none');
                return false;
            }
            return true;
        });
        this.runningMachines.forEach((e, i) => e.changePosition(i + 1));
    }
}

export default RunningMachinesContainer;