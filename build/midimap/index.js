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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOGDIAL_MAP = exports.KNOB_MAP = exports.BUTTON_MAP = void 0;
var globals_1 = require("./globals");
var left_1 = require("./left");
var right_1 = require("./right");
exports.BUTTON_MAP = __assign(__assign(__assign({}, left_1.BUTTONS_LEFT), right_1.BUTTONS_RIGHT), globals_1.BUTTONS_GLOBAL);
exports.KNOB_MAP = __assign(__assign(__assign({}, left_1.KNOBS_LEFT), right_1.KNOBS_RIGHT), globals_1.KNOBS_GLOBAL);
exports.JOGDIAL_MAP = __assign(__assign({}, left_1.JOGDIAL_LEFT), right_1.JOGDIAL_RIGHT);
