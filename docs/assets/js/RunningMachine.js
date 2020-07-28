class RunningMachine {
    constructor(delFunc) {
        const generalLabels = [{
            type: 'range',
            className: 'velocity',
            label: '💨Velocidade',
            min: .1,
            max: 18,
            step: .1,
            initialValue: .1
        }, {
            type: 'text',
            className: 'distance',
            label: '📏Distância'
        }, {
            type: 'range',
            className: 'btm',
            label: '💖Frequência cardíaca',
            min: 45,
            max: 150,
            step: 1,
            initialValue: 45
        }];

        // Colletion of a group of inputs
        this.inputs = generalLabels.map(info => this.createInput(info).bind(this));

        // Colletion of a group of outputs
        this.outputs = generalLabels.map(info => this.createOutput(info).bind(this));
        
        // The X that deletes the card
        this.closeX = this.createX();

        // Container of inputs and outputs
        this.inputs__container = $('<div class="inputs">').append(this.inputs);
        this.outputs__container = $('<div class="outputs">').append(this.outputs);
        
        // Colletion of inputs
        this.inputs__container.children().on('input', (event) => {
            this.outputs__container.find(`.${event.target.name} span`).text(
                parseFloat(event.target.value) > 0 ? parseFloat(event.target.value).toFixed(2) : "0"
            );
        });
        this.inputs__container.find('input').trigger('input');

        // Title Element
        this.titleLabel = this.createTitleLabel();

        this.buttonSend = this.createButtonSend();
        this.buttonAuto = this.createButtonAuto();

        // The entire card container Element
        this.runningMachine = $(`<div class="running-machine__container"></div>`);
        this.runningMachine.append(
            this.closeX,
            this.titleLabel,
            this.outputs__container, 
            this.inputs__container,
            this.createButtonGroup(this.buttonSend, this.buttonAuto)
        );

        // Callback for self deleting
        this.selfDel = delFunc;
    }

    createInput (input) {
        const {type} = input;
        if (type === 'range') {
            const {className, label, min = 1, max = 100, step = .1, initialValue = 50} = input;
            return $(`
            <div class="${className}">
                <label for="${className}">${label}</label>
                <input type="range" min="${min}" max="${max}" step="${step}" value="${initialValue}" class="slider" name="${className}">
            </div>
        `);
        } else {
            const {className, label} = input;
            return $(`
            <div class="${className}">
                <label for="${className}">${label}</label>
                <input type="text" name="${className}">
            </div>
        `);   
        }
    }

    createOutput (input) {
        const {className, label} = input;
        return $(`
            <div class="${className}">
                <label>${label}</label>
                <span></span>
            </div>
        `);
    }

    createX () {
        const x = $('<div class="close-icon"><p>X</p></div>');
        x.click(function () { 
            this.selfDel(this.runningMachine);
        }.bind(this));
        return x;
    }

    createTitleLabel () {
        return $('<h2>');
    }

    createButtonSend () {
        return $('<button class="send">Enviar</button>');
    }

    createButtonAuto () {
        return $('<button class="auto">Valores automáticos</button>');
    }

    createButtonGroup (...buttons) {
        const ButtonContainer = $('<div class="buttons__container">');
        ButtonContainer.append(buttons.flat());
        return ButtonContainer;
    }

    changeTitleLabel (num) {
        const emojis = ['🤸‍♀️','🤸‍♂️','🏃‍♂️','🚴‍♀️','🚴‍♂️','🏃‍♀️'];
        const getRandomEmoji = () => emojis[Math.floor((emojis.length - 1) * Math.random())]
        return this.titleLabel.text(`${getRandomEmoji()}Esteira ${num}${getRandomEmoji()}`);
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
        if (this.runningMachines.length >= 10) {
            return this.container;
        }

        const newMachine = new RunningMachine(this.del.bind(this));
        this.runningMachines.push(newMachine);
        this.container.append(newMachine.runningMachine);

        newMachine.changeTitleLabel(this.runningMachines.length);

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
        this.runningMachines.forEach((e, i) => e.changeTitleLabel(i + 1));
    }
}

export default RunningMachinesContainer