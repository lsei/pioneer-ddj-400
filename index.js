import easymidi from "easymidi";
import sleep from "./utils/sleep.js";
import DDJ from "./pioneer/ddj.js";

// var inputs = easymidi.getInputs();
// var outputs = easymidi.getOutputs();

// console.log("Inputs:", inputs);
// console.log("Outputs:", outputs);

// const ddj = new DDJ("DDJ-400", {
//     onFaderChange: (e) => console.log("fader" + e),
//     onLeftvolumeChange: (e) => console.log("left", e),
//     onRightvolumeChange: (e) => console.log("right", e),
//     onLeftfilterChange: (e) => console.log("leftfilter", e),
//     onRightfilterChange: (e) => console.log("rightfilter", e),
// });

export { DDJ };
