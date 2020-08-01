import ManualTreadmill from './ManualTreadmill.js';
import AutoTreadmill from './AutoTreadmill.js'; 
import Requester from './Requester.js';

class TreadmillsContainer {
    constructor (selector) {
        this.maxCards = 3;
        this.cardsContainer = $(selector);
        this.treadmillsCards = [];

        this.ManualTypeRequester = new Requester();
        this.AutoTypeRequester = new Requester();

        this.onDelayOn = (() => {
            this.treadmillsCards.forEach(e => e.buttonSend.attr('disabled', true));
            this.treadmillsCards.forEach(e => e.buttonSend.toggleClass('disabled'));
        }).bind(this);
        this.onDelayDone = (() => {
            this.treadmillsCards.forEach(e => e.buttonSend.attr('disabled', false));
            this.treadmillsCards.forEach(e => e.buttonSend.toggleClass('disabled'));
            this.treadmillsCards.forEach(e => e.buttonSend.text('Enviar'));
        }).bind(this);
        this.whileDelayOn = (time => {
            this.treadmillsCards.forEach(e => e.buttonSend.text(`Espere ${time} segundos`));
        }).bind(this);

        this.delFunc = this.del.bind(this);
        this.changeType = this.switchType.bind(this);
        this.reqFuncForManualCards = function (pos, body, responseStatus) { 
            this.ManualTypeRequester.send(
                pos, 
                body, 
                this.onDelayOn, 
                this.onDelayDone,
                this.whileDelayOn,
                responseStatus
            )
        }.bind(this);
        this.reqFuncForAutoCards = function (pos, body, responseStatus) { 
            this.AutoTypeRequester.send(
                pos, 
                body, 
                undefined, 
                undefined,
                undefined,
                responseStatus
            )
        }.bind(this);
    }

    new () {
        if (this.treadmillsCards.length >= this.maxCards) {
            return this.cardsContainer;
        }

        const newTreadmill = new ManualTreadmill(
            this.delFunc, 
            this.reqFuncForManualCards,
            this.changeType
        );

        this.treadmillsCards.push(newTreadmill);
        this.cardsContainer.append(newTreadmill.card);

        newTreadmill.recalculatePosition(this.treadmillsCards.length - 1);

        return this.cardsContainer;
    }

    del (elem) {
        this.treadmillsCards = this.treadmillsCards.filter(runningMachine => {
            if (runningMachine.card === elem) {
                setTimeout(() => {
                    elem.remove();
                }, 500);
                elem.css('animation', 'desappear .5s ease-in-out');
                elem.find('.close-icon').css('display', 'none');
                return false;
            }
            return true;
        });
        this.recalculatePositionOfAllCards();
    }

    switchType (pos) {
        if (this.treadmillsCards[pos] instanceof ManualTreadmill) {
            const newTreadmillCard = new AutoTreadmill(
                this.delFunc, 
                this.reqFuncForAutoCards,
                this.changeType
            );
            //console.log(newTreadmillCard.card, this.cardsContainer.children()[pos]);
            $(this.cardsContainer.children()[pos]).replaceWith(newTreadmillCard.card);
            this.treadmillsCards[pos] = newTreadmillCard;
        } else {
            const reqFunc = function (pos, body, responseStatus) { 
            }.bind(this);

            const newTreadmillCard = new ManualTreadmill(
                this.delFunc, 
                this.reqFuncForManualCards,
                this.changeType
            );
            $(this.cardsContainer.children()[pos]).replaceWith(newTreadmillCard.card);
            this.treadmillsCards[pos] = newTreadmillCard;
        }
        this.recalculatePositionOfAllCards();
    }

    recalculatePositionOfAllCards () {
        this.treadmillsCards.forEach((e, i) => e.recalculatePosition(i));
    }
}

export default TreadmillsContainer;