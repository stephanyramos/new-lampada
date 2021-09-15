"use strict"
const lamp = document.getElementById('lamp');
let blink;

newListener('on', 'click', () => lampActions.turnOn());
newListener('off', 'click', () => lampActions.turnOff());
newListener('blink', 'click', () => lampActions.turnBlink());
newListener('lamp', 'dblclick', () => lampActions.break());
newListener('lamp', 'mouseenter', () => !lamp.src.includes("quebrada") && lampActions.turnOn());
newListener('lamp', 'mouseleave', () => !lamp.src.includes("quebrada") && lampActions.turnOff());

const lampActions = {
    lamp: document.getElementById('lamp'),
    turnOn: () => {
        this.lamp.src = "./img/ligada.jpg  ";
        disableButtons(true, false, false);
    },
    turnOff: () => {
        this.lamp.src = "./img/desligada.jpg";
        disableButtons(false, true, false);
    },
    turnBlink: () => {
        const blinkButton = document.getElementById('blink')
        if(blinkButton.textContent == "Piscar") {
            blinkButton.className = "red";
            blinkButton.textContent = "Parar";
            blink = setInterval(() => {
                blinkButton.textContent == "Piscar" && clearInterval(blink);
                this.lamp.src.includes("desligada") ? lampActions.turnOn() : lampActions.turnOff();
            }, 200);
            blink;
        } else {
            blinkButton.textContent = "Piscar";
            blinkButton.className = "green";
        };
    },
    break: () => {
        this.lamp.src = "./img/quebrada.jpg";
        clearInterval(blink);
        document.getElementById('blink').textContent = "Piscar";
        disableButtons(true, true, true);
    }
}

function disableButtons(onState, offState, blinkState) {
    document.getElementById('on').disabled = onState;
    document.getElementById('off').disabled = offState;
    document.getElementById('blink').disabled = blinkState;
}

function newListener(elementId, eventName, voidFunction) {
    document.getElementById(elementId).addEventListener(eventName, voidFunction);
}
//