export class HighResValue {
    major: number;
    minor: number;

    constructor(major: number, minor: number) {
        this.major = major;
        this.minor = minor;
    }

    toFloat() {
        return this.major + this.minor / 127;
    }

    toString() {
        return (this.major + this.minor / 127).toString();
    }

    set(major: number, minor: number) {
        this.major = major;
        this.minor = minor;
    }
}
