const expect = require('chai').expect;
const easymidi = require('easymidi');

const DDJ = require('../pioneer/ddj.js');

const input = new easymidi.Input('test input', true);
const output = new easymidi.Output('test output', true);

// route send to input
output.send = (type, args) => {
    input._input.emit('message', -1, output.parseMessage(type, args));
};

const ddj = new DDJ('Test DDJ', {
    midiInput: input,
    midiOutput: output,
});

// Clear listeners before each run
beforeEach(() => {
    ddj.removeAllListeners();
});

// teardown
after(() => {
    input.close();
    output.close();
});

it('receives and converts the left play signal, push', (done) => {
    ddj.on('play', ({ state }) => {
        expect(state).to.be.true;
        done();
    });
    output.send('noteon', {
        channel: 0,
        note: 11,
        velocity: 127,
    });
});

it('receives and converts the left play signal, release', (done) => {
    ddj.on('play', ({ state }) => {
        expect(state).to.be.false;
        done();
    });
    output.send('noteon', {
        channel: 0,
        note: 11,
        velocity: 0,
    });
});
