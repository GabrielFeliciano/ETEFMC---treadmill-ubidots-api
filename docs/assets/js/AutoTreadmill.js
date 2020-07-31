import SimulatedPerson from './SimulatedPerson.js';

class AutoTreadmill {
    constructor () {
        this.outputsInfo = [{
                label: 'Estado da Esteira',
                className: 'state'
            }, {
                label: 'Distância percorrida',
                className: 'distance'
            }, {
                label: 'Velocidade',
                className: 'velocity'
            }, {
                label: 'Aceleração',
                className: 'accelaration'
            }, {
                label: 'Frequêcia cardíaca',
                className: 'cardio-frequecy'
            }, {
                label: 'Tempo',
                className: 'time'
            }
        ];

        this.outputs = $('<div class="outputs">').append(
            this.outputsInfo.map(info => this.createOutputs(info))
        );
        console.log(this.outputs)

        this.card = $(`<div class="auto-running-machine__container"></div>`);
        this.card.append(
            this.outputs
        );
    }

    createOutputs ({label, className}) {
        return $(`
        <div class="${className}">
            <label>${label}</label>
            <span></span>
        </div>
        `)
    }

    createTitleLabel () {
        return $('<h2>');
    }

    changeTitleLabel (num) {
        const emojis = ['🤸‍♀️','🤸‍♂️','🏃‍♂️','🚴‍♀️','🚴‍♂️','🏃‍♀️'];
        const getRandomEmoji = () => emojis[Math.floor((emojis.length - 1) * Math.random())]
        return this.titleLabel.text(`${getRandomEmoji()}Esteira ${num}${getRandomEmoji()}`);
    }
}

export default AutoTreadmill;