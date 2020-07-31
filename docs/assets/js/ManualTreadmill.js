class ManualTreadmill {
    constructor(delFunc, reqFunc) {
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
            className: 'cardio-frequecy',
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

        // Bottom Buttons
        this.buttonSend = this.createButtonSend();
        this.buttonAuto = this.createButtonAuto();
        this.buttonGroup = this.createButtonGroup(this.buttonSend, this.buttonAuto);

        // Bottom Button on click
        this.buttonSend.click(this.onSend.bind(this));

        // The entire card container Element
        this.card = $(`<div class="running-machine__container"></div>`);
        this.card.append(
            this.closeX,
            this.titleLabel,
            this.outputs__container, 
            this.inputs__container,
            this.buttonGroup
        );

        // Pos of card
        this.position = 0;

        // Callback for self deleting
        this.selfDel = delFunc;

        // Request to talk to API
        this.requester = reqFunc;
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

    changePosition (num) {
        this.position = num;
        this.changeTitleLabel(num);
    }

    onSend () {
        const allInputs = [...this.inputs__container.find('input')];

        const body = {};
        allInputs.forEach(e => {
            const elemTransformed = $(e);
            const result = (parseFloat(elemTransformed.val()) || elemTransformed.val() || elemTransformed.attr('min'));
            body[elemTransformed.attr('name')] = result ? 0 : result;
        });
        
        console.log(this.Requester)
        this.requester(this.position, body);
    }
}

export default ManualTreadmill;