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

# Open TODOs

-   [] Make sure all functions are available on the left and the right side
-   [] Strealine setting of values
-   [] Store board state in class to get the current value
-   [] Move to src
-   [] output to dist
-   [] browser version
-   [] More gracefully handle if board is not connected

## Shout outs

S/O to dinchak and his package [node-easymidi](https://github.com/dinchak/node-easymidi) which helped make the creation of this package super easy and inspired the EventEmitter style api design.
