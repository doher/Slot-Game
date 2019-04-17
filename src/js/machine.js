"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var reel_1 = require("./reel");
var sound_1 = require("./sound");
var data_1 = require("./data");
var Machine = (function (_super) {
    __extends(Machine, _super);
    function Machine(width, height, numberOfReels) {
        if (numberOfReels === void 0) { numberOfReels = 5; }
        var _this = _super.call(this) || this;
        _this.numberOfReels = numberOfReels;
        _this.drawBorder();
        _this.reels = [];
        var slicedWidth = width / _this.numberOfReels;
        for (var i = 0; i < _this.numberOfReels; i++) {
            var reel = new reel_1.Reel(slicedWidth, height, i);
            reel.position.set(slicedWidth * i, 0);
            _this.addChild(reel);
            _this.reels.push(reel);
            reel.on("spincomplete", _this.onReelSpinComplete.bind(_this));
        }
        _this.sound = new sound_1.Sound();
        return _this;
    }
    Machine.prototype.spinReels = function () {
        var timeout = 0;
        this.currentReel = 0;
        for (var _i = 0, _a = this.reels; _i < _a.length; _i++) {
            var reel = _a[_i];
            setTimeout(reel.spin.bind(reel), timeout);
        }
        setTimeout(this.stopReels.bind(this), 2500);
        this.sound.playReelSpinSound();
    };
    Machine.prototype.stopReels = function () {
        this.reels[0].stop();
    };
    Machine.prototype.update = function (delta) {
        for (var _i = 0, _a = this.reels; _i < _a.length; _i++) {
            var reel = _a[_i];
            reel.update(delta);
        }
    };
    Machine.prototype.onReelSpinComplete = function (event) {
        this.currentReel++;
        if (this.currentReel < this.reels.length) {
            this.reels[this.currentReel].stop();
        }
        this.sound.playLandingSound();
        if (this.currentReel === this.numberOfReels) {
            this.changeStatusButton();
            this.sound.stopReelSpinSound();
        }
    };
    Machine.prototype.drawBorder = function () {
        if (data_1.default.border.texture === null) {
            data_1.default.border.texture = PIXI.Texture.fromImage(data_1.default.border.filename);
        }
        this.sprite = new PIXI.Sprite();
        this.sprite.scale.set(1.3, 1.6);
        this.sprite.y = -70;
        this.sprite.x = -55;
        this.sprite.texture = data_1.default.border.texture;
        this.addChild(this.sprite);
    };
    Machine.prototype.getButton = function (button) {
        this.button = button;
    };
    Machine.prototype.changeStatusButton = function () {
        this.button.isEnabled = !this.button.isEnabled;
        this.button.setButtonState(2);
    };
    return Machine;
}(PIXI.Container));
exports.Machine = Machine;
//# sourceMappingURL=machine.js.map