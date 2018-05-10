class Animal {

    animalSound() {
        return '';
    }

    speak(toSpeak) {
        return toSpeak.trim().split(/[ ]+/).reduce((acc, curr, index) =>
            acc + (index!==0 ? ' ' : '') + curr + ' ' + this.animalSound()
            , '');
    }
}

export class Tiger extends Animal {
    animalSound() {
        return 'grrr';
    };
}

export class Lion extends Animal {
    animalSound() {
        return 'roar';
    };
}