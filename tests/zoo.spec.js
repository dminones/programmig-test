const chai = require('chai');
const { Tiger, Lion } = require('../build/zoo');
const expect = chai.expect;


describe('Zoo exercise', () => {
    it("A lion speaking I'm a lion should be I'm roar a roar lion roar", () => {
        const lion = new Lion();
        expect(lion.speak("I'm a lion")).to.equal("I'm roar a roar lion roar");
    });

    it("A tiger speaking Lions suck should be Lions grrr suck grrr", () => {
        const tiger = new Tiger();
        expect(tiger.speak("Lions suck")).to.equal("Lions grrr suck grrr");
    });

    it("A tiger speaking Lions     suck (with multiple spaces) should be Lions grrr suck grrr", () => {
        const tiger = new Tiger();
        expect(tiger.speak("Lions     suck")).to.equal("Lions grrr suck grrr");
    });

    it("A tiger speaking Lions suck (with spaces in the end) should be Lions grrr suck grrr", () => {
        const tiger = new Tiger();
        expect(tiger.speak("Lions suck  ")).to.equal("Lions grrr suck grrr");
    });
});