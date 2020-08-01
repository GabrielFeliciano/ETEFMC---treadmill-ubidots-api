import DefaultTreadmill from './DefaultTreadmill.js';
import SimulatedPerson from './SimulatedPerson.js';

class AutoTreadmill extends DefaultTreadmill {
    constructor (delFunc, reqFunc, changeType) {
        super(delFunc, reqFunc, changeType);

        this.infosOutputs = [{
            label: 'Nome',
            className: 'name',
            sufix: ''
        }, {
            label: 'Resistência',
            className: 'resistance',
            sufix: '/ 10'
        }, {
            label: 'Determinação',
            className: 'determination',
            sufix: '/ 10'
        }, {
            label: 'Experiência',
            className: 'experience',
            sufix: '/ 10'
        },]

        this.statsOutputs = [{
                label: 'Distância percorrida',
                className: 'distance',
                sufix: 'm'
            }, {
                label: 'Velocidade',
                className: 'velocity',
                sufix: 'm/s'
            }, {
                label: 'Aceleração',
                className: 'acceleration',
                sufix: 'm/s²'
            }, {
                label: 'Frequêcia cardíaca',
                className: 'cardio-frequecy',
                sufix: 'BTM'
            }, {
                label: 'Tempo',
                className: 'time',
                sufix: 'Segundos'
            }
        ];

        this.importantStats = [{
            label: 'Estado da Esteira',
            className: 'state',
            sufix: 'Power'
        }]

        this.outputsContainer = $('<div class="outputs">').append(
            this.statsOutputs.map(info => info.output = this.createOutput(info))
        );

        this.infosContainer = $('<div class="infos">').append(
            this.infosOutputs.map(info => info.output = this.createOutput(info))
        );

        this.importantStatsContainer = $('<div class="important-stats">').append(
            this.importantStats.map(info => info.output = this.createOutput(info))
        );

        this.buttonAuto = this.createBottomButton('auto', 'Valores manuais');
        this.buttonGroup = this.createButtonGroup(this.buttonSend, this.buttonAuto);

        this.buttonAuto.click((() => this.onChangeType(this.position)).bind(this));

        // Bottom Message on request
        this.messageLine = this.createMessageLine();
        this.messageLine.animate({
            height: "toggle"
        }, 0);

        this.card = $(`<div class="treadmill-card auto">`);
        this.card.append(
            this.closeX,
            this.titleLabel,
            this.importantStatsContainer,
            this.infosContainer,
            this.outputsContainer,
            this.buttonGroup,
            this.messageLine
        );

        this.hideOrShowLessImportantStuff = function () {
            this.outputsContainer.animate({
                opacity: "toggle",
                height: "toggle"
            }, 1000);
            this.infosContainer.animate({
                opacity: "toggle",
                height: "toggle"
            }, 1000);
        }

        this.createPerson();

        this.gotOutputs = {}
    }

    createPerson () {
        this.hideOrShowLessImportantStuff();
        this.importantStatsContainer.find('.state span').text('OFF');

        const whenStartForReal = function () {
            this.importantStatsContainer.find('.state span').text('ON');
            this.hideOrShowLessImportantStuff();
        }

        this.person = new SimulatedPerson(
            whenStartForReal.bind(this),
            this.createPerson.bind(this)
        );
        this.person.subscribeObserver(function (about, stats) {
            for (let output of this.statsOutputs) {
                if (stats[output.className]) {
                    this.gotOutputs[output.className] = stats[output.className];
                    output.output.find('span').text(stats[output.className] + ' ' + output.sufix);
                }
            }
            for (let info of this.infosOutputs) {
                if (about[info.className]) {
                    this.gotOutputs[info.className] = about[info.className];
                    info.output.find('span').text(about[info.className] + ' ' + info.sufix);
                }
            }
            this.onSend(this.gotOutputs);
        }.bind(this));

        this.person.start();
    }

    onSend (allinfo) {
        const {'distance': distance, 'velocity': velocity, 'cardio-frequecy': cardioFrequecy} = allinfo;
        const body = {'distance': distance * 1, 'velocity': velocity * 1, 'cardio-frequecy': cardioFrequecy * 1}
        this.requester(this.position, body, this.onGotResponseStats);
    }
}

export default AutoTreadmill;