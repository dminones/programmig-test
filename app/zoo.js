/**
 * Base class Animal, implements speak using animalSound method to intersect. Each animal should implement his own method to have a particular sound
 * @class Animal
 */

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

/**
 * @class Tiger
 */
export class Tiger extends Animal {
    animalSound() {
        return 'grrr';
    };
}

/**
 * @class Lion
 */
export class Lion extends Animal {
    animalSound() {
        return 'roar';
    };
}