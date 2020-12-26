"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUTTON_MAP_RIGHT = void 0;
var constants_1 = require("./constants");
var SIDE = 'right';
exports.BUTTON_MAP_RIGHT = {};
constants_1.Buttons.forEach(function (b) {
    var key = constants_1.CHANNEL_RIGHT_MAIN + "_" + b.note;
    exports.BUTTON_MAP_RIGHT[key] = {
        type: b.type,
        side: SIDE,
    };
});
constants_1.PadModes.forEach(function (m) {
    for (var i = 0; i < 8; i++) {
        var key = constants_1.CHANNEL_RIGHT_PADS + "_" + (m.startIndex + i);
        exports.BUTTON_MAP_RIGHT[key] = {
            type: 'pad',
            category: m.type,
            row: Math.floor(i / 4),
            col: i - Math.floor(i / 4) * 4,
            side: SIDE,
        };
    }
});
