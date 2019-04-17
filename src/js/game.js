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
var scene_1 = require("./scene");
var machine_1 = require("./machine");
var button_1 = require("./button");
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(renderer) {
        var _this = _super.call(this, renderer) || this;
        _this.TEXT_STYLE = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 72,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', 'rgb(226, 197, 67)'],
            stroke: '#4a1850',
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });
        _this.machine = new machine_1.Machine(1340, 880, 5);
        _this.machine.position.set(350, 420);
        _this.addChild(_this.machine);
        _this.button = new button_1.Button();
        _this.addChild(_this.button);
        _this.button.btnSprite
            .on('pointerover', _this.onButtonOver.bind(_this))
            .on('pointerout', _this.onButtonOut.bind(_this))
            .on('pointerdown', _this.onButtonDown.bind(_this))
            .on('pointertap', _this.onButtonTap.bind(_this))
            .on("pointertap", _this.spin.bind(_this));
        _this.addText();
        return _this;
    }
    GameScene.prototype.update = function (delta) {
        if (this.machine) {
            this.machine.update(delta);
        }
    };
    GameScene.prototype.preload = function () {
        PIXI.loader
            .add([
            "./src/assets/img/symbols/01.png",
            "./src/assets/img/symbols/02.png",
            "./src/assets/img/symbols/03.png",
            "./src/assets/img/symbols/04.png",
            "./src/assets/img/symbols/05.png",
            "./src/assets/img/symbols/06.png",
            "./src/assets/img/symbols/07.png",
            "./src/assets/img/symbols/08.png",
            "./src/assets/img/symbols/09.png",
            "./src/assets/img/symbols/10.png",
            "./src/assets/img/symbols/11.png",
            "./src/assets/img/symbols/12.png",
            "./src/assets/img/symbols/13.png",
            "./src/assets/img/btn_spin_normal.png",
            "./src/assets/img/btn_spin_disable.png",
            "./src/assets/img/btn_spin_hover.png",
            "./src/assets/img/btn_spin_pressed.png",
            "./src/assets/img/slotOverlay.png",
            "./src/assets/img/winningFrameBackground.jpg",
        ]);
    };
    GameScene.prototype.create = function () {
    };
    GameScene.prototype.spin = function () {
        if (this.button.isEnabled) {
            this.machine.spinReels();
            this.machine.getButton(this.button);
        }
        this.button.isEnabled = false;
    };
    GameScene.prototype.addText = function () {
        this.headerText = new PIXI.Text("Mr. Monkey", this.TEXT_STYLE);
        this.headerText.anchor.set(0.5, 0.5);
        this.headerText.position.set(1030, 400);
        this.addChild(this.headerText);
    };
    GameScene.prototype.onButtonOver = function () {
        if (this.button.isEnabled) {
            this.button.setButtonState(1);
        }
    };
    GameScene.prototype.onButtonOut = function () {
        if (this.button.isEnabled) {
            this.button.setButtonState(2);
        }
    };
    GameScene.prototype.onButtonDown = function () {
        if (this.button.isEnabled) {
            this.button.setButtonState(3);
        }
    };
    GameScene.prototype.onButtonTap = function () {
        if (this.button.isEnabled) {
            this.button.setButtonState(0);
        }
    };
    return GameScene;
}(scene_1.Scene));
exports.GameScene = GameScene;
//# sourceMappingURL=game.js.map