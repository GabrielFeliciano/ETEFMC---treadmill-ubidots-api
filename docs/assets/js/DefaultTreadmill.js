class DefaultTreadmill {
    constructor (delFunc, reqFunc, changeType) {
        // Callback for self deleting
        this.selfDel = delFunc;

        // Request to talk to API
        this.requester = reqFunc;

        // Change to Auto or Manual type
        this.onChangeType = changeType;

        // Title Element
        this.titleLabel = $('<h2>');

        // The X that deletes the card
        this.closeX = this.createX();

        // Bottom message
        this.onGotResponseStats = function (result) {
            this.messageLine.text('Dados enviado com successo!').animate({
                height: "toggle"
            }, 1000, function () {
                setTimeout((() => this.messageLine.animate({
                    height: "toggle"
                }, 1000)).bind(this), 6000);
            }.bind(this));
            if (result) {
                this.messageLine.text('Dados enviado com successo!');
            } else {
                this.messageLine.text('Erro! Os dados não foram enviados!');
            }
        }.bind(this);
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
            this.selfDel(this.card);
        }.bind(this));
        return x;
    }

    createBottomButton (className, label) {
        return $(`<button class="bottom-button ${className}">${label}</button>`);
    }

    createButtonGroup (...buttons) {
        const ButtonContainer = $('<div class="buttons__container">');
        ButtonContainer.append(buttons.flat());
        return ButtonContainer;

    }

    createMessageLine () {
        return $('<span class="message-line">')
    }

    changeTitleLabel (num) {
        const emojis = ['🤸‍♀️','🤸‍♂️','🏃‍♂️','🚴‍♀️','🚴‍♂️','🏃‍♀️'];
        const getRandomEmoji = () => emojis[Math.floor((emojis.length - 1) * Math.random())]
        return this.titleLabel.text(`${getRandomEmoji()}Esteira ${num}${getRandomEmoji()}`);
    }

    recalculatePosition (num) {
        this.position = num;
        this.changeTitleLabel(num + 1);
    }
}

export default DefaultTreadmill;