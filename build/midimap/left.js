"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOGDIAL_LEFT = exports.KNOBS_LEFT = exports.BUTTONS_LEFT = void 0;
var constants_1 = require("./constants");
var SIDE = 'left';
exports.BUTTONS_LEFT = {};
exports.KNOBS_LEFT = {};
exports.JOGDIAL_LEFT = {};
constants_1.Buttons.forEach(function (b) {
    var key = constants_1.CHANNEL_LEFT_MAIN + "_" + b.note;
    exports.BUTTONS_LEFT[key] = {
        type: b.type,
        side: SIDE,
    };
});
constants_1.PadModes.forEach(function (m) {
    for (var i = 0; i < 8; i++) {
        var key = constants_1.CHANNEL_LEFT_PADS + "_" + (m.startIndex + i);
        exports.BUTTONS_LEFT[key] = {
            type: 'pad',
            category: m.type,
            row: Math.floor(i / 4),
            col: i - Math.floor(i / 4) * 4,
            side: SIDE,
        };
    }
});
constants_1.Knobs.forEach(function (k) {
    var key = constants_1.CHANNEL_LEFT_MAIN + "_" + k.minorNote;
    exports.KNOBS_LEFT[key] = {
        type: k.type,
        major: constants_1.CHANNEL_LEFT_MAIN + "_" + k.majorNote,
        minor: constants_1.CHANNEL_LEFT_MAIN + "_" + k.minorNote,
        side: SIDE,
    };
});
constants_1.Jogdials.forEach(function (_a) {
    var controller = _a.controller, j = __rest(_a, ["controller"]);
    var key = constants_1.CHANNEL_LEFT_MAIN + "_" + controller;
    exports.JOGDIAL_LEFT[key] = __assign(__assign({}, j), { side: SIDE });
});
