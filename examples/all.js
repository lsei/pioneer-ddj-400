// import pioneerddj from '../index';
const pioneerddj = require('../index');

const ddj = new pioneerddj.DDJ('DDJ-400');

// Regular Buttons
ddj.on('play', (e) => console.log('play', e));
ddj.on('cue', (e) => console.log('cue', e));
ddj.on('shift', (e) => console.log('shift', e));
ddj.on('platter', (e) => console.log('platter', e));
ddj.on('beatsync', (e) => console.log('beatsync', e));
ddj.on('beatsync_long', (e) => console.log('beatsync_long', e));
ddj.on('loop_in', (e) => console.log('loop_in', e));
ddj.on('loop_in_long', (e) => console.log('loop_in_long', e));
ddj.on('loop_out', (e) => console.log('loop_out', e));
ddj.on('reloop', (e) => console.log('reloop', e));
ddj.on('call_back', (e) => console.log('call_back', e));
ddj.on('call_forward', (e) => console.log('call_forward', e));
ddj.on('phones_cue', (e) => console.log('phones_cue', e));

// Pads
ddj.on('pad', (e) => console.log('pad', e));

// Sliders
ddj.on('tempo', (e) => console.log('tempo', e));
ddj.on('volume', (e) => console.log('tempo', e));
ddj.on('crossfader', (e) => console.log('tempo', e));
