class RunningMachine {
    constructor() {
        const generalLabels = [{
            className: 'velocity',
            label: 'Velocidade',
            min: .1,
            max: 18,
            step: .1,
            initialValue: .1
        }, {
            className: 'distance',
            label: 'Distância',
            min: .1,
            max: 18,
            step: .1,
            initialValue: .1
        }, {
            className: 'btm',
            label: 'Frequência cardíaca',
            min: 45,
            max: 150,
            step: 1,
            initialValue: 45
        }];


        this.inputs = generalLabels.map(info => this.createInput(info).bind(this));

        this.outputs = generalLabels.map(info => this.createOutput(info).bind(this));
        
        this.input__container = $('<div class="inputs">').append(this.inputs);
        this.output__container = $('<div class="outputs">').append(this.outputs);
        
        this.input__container.children().on('input', event => {
            this.output__container.find(`.${event.target.name} span`).text(event.target.value);
        })

        this.runningMachine = $(`<div class="running-machine__container"></div>`);
        this.runningMachine.append(this.output__container, this.input__container);
    }

    createInput (input) {
        const {className, label, min = 1, max = 100, step = .1, initialValue = 50} = input;
        console.log(step);
        return $(`
            <div class="${className}">
                <label for="${className}">${label}</label>
                <input type="range" min="${min}" max="${max}" step="${step}" value="${initialValue}" class="slider" name="${className}">
            </div>
        `);
    }

    createOutput (input) {
        const {className, label} = input;
        return $(`
            <div class="${className}">
                <label>${label}</label>
                <span>11</span>
            </div>
        `);
    }
}

class RunningMachinesContainer {
    constructor (selector) {
        this.container = $(selector);
        this.runningMachines = [];

        this.inputVelocity = this.container.find('.inputs .velocity');
        this.inputDistance = this.container.find('.inputs .distance');
        this.inputBTM = this.container.find('.inputs .btm');
    }

    new () {
        const newMachine = new RunningMachine();
        this.runningMachines.push(newMachine);
        this.container.append(newMachine.runningMachine);
        return this.container;
    }
}

export default RunningMachinesContainer