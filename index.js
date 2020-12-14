import easymidi from "easymidi";
import sleep from "./utils/sleep.js";
import DDJ from "./pioneer/ddj.js";

var inputs = easymidi.getInputs();
var outputs = easymidi.getOutputs();

console.log("Inputs:", inputs);
console.log("Outputs:", outputs);

const ddj = new DDJ("DDJ-400", {
    onFaderChange: (e) => console.log("fader" + e),
    onLeftvolumeChange: (e) => console.log("left", e),
    onRightvolumeChange: (e) => console.log("right", e),
    onLeftfilterChange: (e) => console.log("leftfilter", e),
    onRightfilterChange: (e) => console.log("rightfilter", e),
});

ddj.padModeHotCue();
ddj.playLeft();

// ddj.playLeft(false);

// while (true) {
//     for (let row = 0; row < 2; row++) {
//         for (let col = 0; col < 4; col++) {
//             ddj.pad(row, col, true);
//             await sleep(100);
//         }
//     }

//     for (let row = 0; row < 2; row++) {
//         for (let col = 0; col < 4; col++) {
//             ddj.pad(row, col, false);
//             await sleep(100);
//         }
//     }
// }
