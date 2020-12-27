"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighResValue = void 0;
var HighResValue = /** @class */ (function () {
    function HighResValue(major, minor) {
        this.major = major;
        this.minor = minor;
    }
    HighResValue.prototype.toFloat = function () {
        return this.major + this.minor / 127;
    };
    HighResValue.prototype.toString = function () {
        return (this.major + this.minor / 127).toString();
    };
    HighResValue.prototype.set = function (major, minor) {
        this.major = major;
        this.minor = minor;
    };
    return HighResValue;
}());
exports.HighResValue = HighResValue;
