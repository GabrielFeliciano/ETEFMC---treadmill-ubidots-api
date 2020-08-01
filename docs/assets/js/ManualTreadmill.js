import DefaultTreadmill from './DefaultTreadmill.js';

class ManualTreadmill extends DefaultTreadmill {
    constructor(delFunc, reqFunc, changeType) {
        super(delFunc, reqFunc, changeType);

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

        // Bottom Buttons
        this.buttonSend = this.createBottomButton('send', 'Enviar');
        this.buttonAuto = this.createBottomButton('auto', 'Valores automáticos');
        this.buttonGroup = this.createButtonGroup(this.buttonSend, this.buttonAuto);

        // Bottom Buttons on click
        this.buttonSend.click(this.onSend.bind(this));
        this.buttonAuto.click((() => this.onChangeType(this.position)).bind(this))

        // Bottom Message on request
        this.messageLine = this.createMessageLine();
        this.messageLine.animate({
            height: "toggle"
        }, 0);

        // The entire card container Element
        this.card = $(`<div class="treadmill-card manual">`);
        this.card.append(
            this.closeX,
            this.titleLabel,
            this.outputs__container, 
            this.inputs__container,
            this.buttonGroup,
            this.messageLine
        );
    }

    onSend () {
        const allInputs = [...this.inputs__container.find('input')];

        const body = {};
        allInputs.forEach(e => {
            const elemTransformed = $(e);
            const result = (parseFloat(elemTransformed.val()) || elemTransformed.val() || elemTransformed.attr('min'));
            body[elemTransformed.attr('name')] = result ? result : 0;
        });

        this.requester(this.position, body, this.onGotResponseStats);
    }
}

export default ManualTreadmill;