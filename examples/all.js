// import pioneerddj from '../index';
const pioneerddj = require('../index');

const ddj = new pioneerddj.DDJ('DDJ-400');

// Channel Buttons
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
ddj.on('master_level', console.log);
ddj.on('phones_mixing', console.log);
ddj.on('phones_level', console.log);
ddj.on('trim', console.log);
ddj.on('eq_high', console.log);
ddj.on('eq_mid', console.log);
ddj.on('eq_low', console.log);
ddj.on('beatfx_level', console.log);
ddj.on('filter', console.log);
