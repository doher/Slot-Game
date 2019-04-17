"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var howler_1 = require("howler");
var Sound = (function () {
    function Sound() {
        this.reelSpinSound = new howler_1.Howl({
            src: ['./src/assets/sounds/Reel_Spin.mp3']
        });
        this.landingSound = new howler_1.Howl({
            src: ['./src/assets/sounds/Landing_1.mp3']
        });
    }
    Sound.prototype.playReelSpinSound = function () {
        this.reelSpinSound.play();
    };
    Sound.prototype.stopReelSpinSound = function () {
        this.reelSpinSound.stop();
    };
    Sound.prototype.playLandingSound = function () {
        this.landingSound.play();
    };
    return Sound;
}());
exports.Sound = Sound;
//# sourceMappingURL=sound.js.map