const expect = require('chai').expect;
const easymidi = require('easymidi');

const pioneerddj = require('../build/ddj.js');

const input = new easymidi.Input('test input', true);
const output = new easymidi.Output('test output', true);

// route send to input
output.send = (type, args) => {
    input._input.emit('message', -1, output.parseMessage(type, args));
};

const ddj = new pioneerddj.DDJ('Test DDJ', {
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

it('let play, push', (done) => {
    ddj.on('play', ({ state, side }) => {
        expect(side).to.equal('left');
        expect(state).to.be.true;
        done();
    });
    output.send('noteon', {
        channel: 0,
        note: 11,
        velocity: 127,
    });
});

it('left play, release', (done) => {
    ddj.on('play', ({ state, side }) => {
        expect(side).to.equal('left');
        expect(state).to.be.false;
        done();
    });
    output.send('noteon', {
        channel: 0,
        note: 11,
        velocity: 0,
    });
});

it('sends the tempo, low', (done) => {
    ddj.on('tempo', ({ value, side }) => {
        expect(side).to.equal('left');
        expect(value).to.equal(0);
        done();
    });

    output.send('cc', {
        channel: 0,
        controller: 0,
        value: 0,
    });
    output.send('cc', {
        channel: 0,
        controller: 32,
        value: 0,
    });
});

it('sends the tempo, mid', (done) => {
    ddj.on('tempo', ({ value, side }) => {
        expect(side).to.equal('left');
        expect(value).to.equal(64 / 128);
        done();
    });

    output.send('cc', {
        channel: 0,
        controller: 0,
        value: 64,
    });
    output.send('cc', {
        channel: 0,
        controller: 32,
        value: 0,
    });
});

it('sends the tempo, high', (done) => {
    ddj.on('tempo', ({ value, side }) => {
        expect(side).to.equal('left');
        expect(value).to.equal(1);
        done();
    });

    output.send('cc', {
        channel: 0,
        controller: 0,
        value: 127,
    });
    output.send('cc', {
        channel: 0,
        controller: 32,
        value: 127,
    });
});

describe('crossfader', () => {
    it('sends the crossfader, low', (done) => {
        ddj.on('crossfader', ({ value }) => {
            expect(value).to.equal(0);
            done();
        });

        output.send('cc', {
            channel: 6,
            controller: 31,
            value: 0,
        });
        output.send('cc', {
            channel: 6,
            controller: 63,
            value: 0,
        });
    });

    it('sends the crossfader, mid', (done) => {
        ddj.on('crossfader', ({ value }) => {
            expect(value).to.equal(64 / 128);
            done();
        });

        output.send('cc', {
            channel: 6,
            controller: 31,
            value: 64,
        });
        output.send('cc', {
            channel: 6,
            controller: 63,
            value: 0,
        });
    });

    it('sends the crossfader, high', (done) => {
        ddj.on('crossfader', ({ value }) => {
            expect(value).to.equal(1);
            done();
        });

        output.send('cc', {
            channel: 6,
            controller: 31,
            value: 127,
        });
        output.send('cc', {
            channel: 6,
            controller: 63,
            value: 127,
        });
    });
});

describe('load selector', () => {
    it('goes up', (done) => {
        ddj.on('load_selector', ({ value }) => {
            expect(value).to.equal(1);
            done();
        });

        output.send('cc', {
            channel: 6,
            controller: 64,
            value: 1,
        });
    });

    it('goes down', (done) => {
        ddj.on('load_selector', ({ value }) => {
            expect(value).to.equal(-1);
            done();
        });

        output.send('cc', {
            channel: 6,
            controller: 64,
            value: 127,
        });
    });
});
