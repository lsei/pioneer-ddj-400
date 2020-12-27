# Pioneer DDJ 400

This library provides a light wrapper around the midi interface for the Pioneer DDJ 400. The goal is to provide a tool that can help create digital experiences using the DDJ 400 hardware. I've been using it with Electron but it could also work on a Raspberry Pi. There's still more work to be done for this to work in the browser.

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

## Event API

Example from [examples/all.js](examples/all.js).

```js
const pioneerddj = require('pioneer-ddj');

const ddj = new pioneerddj.DDJ('DDJ-400');

// Buttons
ddj.on('play', console.log);
ddj.on('cue', console.log);
ddj.on('shift', console.log);
ddj.on('platter', console.log);
ddj.on('beatsync', console.log);
ddj.on('beatsync_long', console.log);
ddj.on('loop_in', console.log);
ddj.on('loop_in_long', console.log);
ddj.on('loop_out', console.log);
ddj.on('reloop', console.log);
ddj.on('call_back', console.log);
ddj.on('call_forward', console.log);
ddj.on('phones_cue', console.log);
ddj.on('hot_cue', console.log);
ddj.on('beat_loop', console.log);
ddj.on('beat_jump', console.log);
ddj.on('sampler', console.log);
ddj.on('load', console.log);

// Global Buttons
ddj.on('load_select', console.log);
ddj.on('master_cue', console.log);
ddj.on('beatfx_back', console.log);
ddj.on('beatfx_forward', console.log);
ddj.on('beatfx_select', console.log);
ddj.on('beatfx_channel_1', console.log);
ddj.on('beatfx_channel_2', console.log);
ddj.on('beatfx_channel_master', console.log);
ddj.on('beatfx_toggle', console.log);

// Pads
ddj.on('pad', console.log);

// Sliders
ddj.on('tempo', console.log);
ddj.on('level', console.log);
ddj.on('crossfader', console.log);

// Knobs
ddj.on('trim', console.log);
ddj.on('eq_high', console.log);
ddj.on('eq_mid', console.log);
ddj.on('eq_low', console.log);
ddj.on('filter', console.log);

// Global Knobs
ddj.on('master_level', console.log);
ddj.on('phones_mixing', console.log);
ddj.on('phones_level', console.log);
ddj.on('beatfx_level', console.log);
ddj.on('load_selector', console.log);

// Jogdials
ddj.on('jogdial', console.log);
```

## Setting API

Although a few methods are available the full API to set values on the controller itself such as the state of the pads, channel levels, loopin/outs etc are still pending.

## Values

Although midi usually works with values between 0 and 127 I've interpolated the values returned by this library are interpolated between 0 and 1. This also abstracts away the fact that Pioneer are sending two values on each CC update in order to achieve a higher precision value.

## Open TODOs

-   [ ] better documentation
-   [ ] Fix the way the package is exported in index.js
-   [ ] Setting of values (get buttom colours)
-   [ ] Support Web midi for browser support
-   [ ] Make sure all functions are available on the left and the right side
-   [ ] Store board state in class to get the current value
-   [ ] Query functions for current board values
-   [ ] Clean typescript definition
-   [ ] support shift flag

## Shout outs

S/O to dinchak and his package [node-easymidi](https://github.com/dinchak/node-easymidi) which helped make the creation of this package super easy and inspired the EventEmitter style api design.

## Disclaimer

This project is not affiated with or endorsed by Pioneer DJ, Pioneer Corporation or AlphaTheta Corporation in any way.
