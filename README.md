# Pioneer DDJ

This library provides a light wrapper around the midi interface for the Pioneer DDJ 400. The goal is to provide a tool that can help create digital experiences using the DDJ 400 hardware. I've been using it with Electron but I imagine it could be used in the browser or on a Raspberry Pi.

## Installation

```
npm i pioneer-ddj
```

## Usage

```js
const pioneerddj = require('pioneer-ddj');

const ddj = new pioneerddj.DDJ('DDJ-400', {});

// Callback every time
ddj.on('play', ({ side, state }) => {
    console.log(`Play buton ${state ? 'pressed' : 'released'} on ${side} side!`);
});

// Switch pads to beat loop mode on left side;
ddj.setPadModeLeft('BEAT_LOOP');

// Turn on pad (lights up) in first row, first column in the beatloop section
ddj.setPadLeft(1, 1, true);
```

# Values:

-   Midi values typically range between 0 and 127. In order to increase the precision Pioneer send two values every time a dial is changes. I've interpreted this as a major and minor value and added them together to result in a value between 0 and 128 that I map to [0,1]. I'm not sure if this is correct and if it will correctly show the middle value at 0.5.

# Open TODOs

-   [] Fix the way the package is exported in index.js
-   [] Setting of values (get buttom colours)
-   [] Support Web midi for browser support
-   [] Make sure all functions are available on the left and the right side
-   [] Store board state in class to get the current value
-   [] Query functions for current board values
-   [] Clean typescript definition

## Shout outs

S/O to dinchak and his package [node-easymidi](https://github.com/dinchak/node-easymidi) which helped make the creation of this package super easy and inspired the EventEmitter style api design.

## Disclaimer

This project is not affiated with or endorsed by Pioneer DJ, Pioneer Corporation or AlphaTheta Corporation in any way.
