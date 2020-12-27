"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNOBS_RIGHT = exports.BUTTONS_RIGHT = void 0;
var constants_1 = require("./constants");
var SIDE = 'right';
exports.BUTTONS_RIGHT = {};
exports.KNOBS_RIGHT = {};
constants_1.Buttons.forEach(function (b) {
    var key = constants_1.CHANNEL_RIGHT_MAIN + "_" + b.note;
    exports.BUTTONS_RIGHT[key] = {
        type: b.type,
        side: SIDE,
    };
});
constants_1.PadModes.forEach(function (m) {
    for (var i = 0; i < 8; i++) {
        var key = constants_1.CHANNEL_RIGHT_PADS + "_" + (m.startIndex + i);
        exports.BUTTONS_RIGHT[key] = {
            type: 'pad',
            category: m.type,
            row: Math.floor(i / 4),
            col: i - Math.floor(i / 4) * 4,
            side: SIDE,
        };
    }
});
constants_1.Knobs.forEach(function (k) {
    var key = constants_1.CHANNEL_RIGHT_MAIN + "_" + k.minorNote;
    exports.KNOBS_RIGHT[key] = {
        type: k.type,
        major: constants_1.CHANNEL_RIGHT_MAIN + "_" + k.majorNote,
        minor: constants_1.CHANNEL_RIGHT_MAIN + "_" + k.minorNote,
        side: SIDE,
    };
});
