import ManualTreadmill from './ManualTreadmill.js';
import AutoTreadmill from './AutoTreadmill.js'; 
import Requester from './Requester.js';

class TreadmillsContainer {
    constructor (selector) {
        this.maxCards = 3;
        this.cardsContainer = $(selector);
        this.treadmillsCards = [];

        this.Requester = new Requester();

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
    }

    new () {
        if (this.treadmillsCards.length >= this.maxCards) {
            return this.cardsContainer;
        }

        const newTreadmill = new ManualTreadmill(
            this.del.bind(this), 
            ((pos, body) => this.Requester.send(
                pos, 
                body, 
                this.onDelayOn.bind(this), 
                this.onDelayDone.bind(this),
                this.whileDelayOn.bind(this)
            )).bind(this)
        );

        this.treadmillsCards.push(newTreadmill);
        this.cardsContainer.append(newTreadmill.card);

        newTreadmill.changePosition(this.treadmillsCards.length);

        return this.cardsContainer;
    }

    del (elem) {
        this.treadmillsCards = this.treadmillsCards.filter(runningMachine => {
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
        this.treadmillsCards.forEach((e, i) => e.changePosition(i + 1));
    }

    // change (listOfCards) {
    //     console.log(this.cardsContainer.children(), listOfCards);
    //     console.log(this.cardsContainer.html());
    //     this.cardsContainer.html('');
    //     console.log(this.cardsContainer.children(), listOfCards);
    //     console.log(this.cardsContainer.html());
    //     this.cardsContainer.append(listOfCards);
    //     console.log(this.cardsContainer.children(), listOfCards);
    //     console.log(this.cardsContainer.html());
    //     this.treadmillsCards = listOfCards;
    //     this.treadmillsCards.forEach((e, i) => e.changePosition(i + 1));
    // }

    switchAuto (pos) {
        if (this.treadmillsCards[pos] instanceof ManualTreadmill) {
            const newTreadmillCard = new AutoTreadmill();
            //console.log(newTreadmillCard.card, this.cardsContainer.children()[pos]);
            $(this.cardsContainer.children()[pos]).replaceWith(newTreadmillCard.card);
            this.treadmillsCards[pos] = newTreadmillCard;
        } else {
            const newTreadmillCard = new ManualTreadmill();
            $(this.cardsContainer.children()[pos]).replaceWith(newTreadmillCard.card);
            this.treadmillsCards[pos] = newTreadmillCard;
        }
    }
}

export default TreadmillsContainer;