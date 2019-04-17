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
var data_1 = require("./data");
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(isEnabled) {
        if (isEnabled === void 0) { isEnabled = true; }
        var _this = _super.call(this) || this;
        _this.isEnabled = true;
        _this.isEnabled = isEnabled;
        _this.btnSprite = new PIXI.Sprite();
        _this.btnSprite.scale.set(1, 1);
        _this.btnSprite.anchor.set(0.5, 0.5);
        _this.btnSprite.position.set(1600, 1360);
        _this.setButtonState(2);
        _this.btnSprite.interactive = true;
        _this.btnSprite.buttonMode = true;
        _this.addChild(_this.btnSprite);
        return _this;
    }
    Button.prototype.setButtonState = function (id) {
        if (data_1.default.buttonState[id].texture === null) {
            data_1.default.buttonState[id].texture = PIXI.Texture.fromImage(data_1.default.buttonState[id].filename);
        }
        this.btnSprite.texture = data_1.default.buttonState[id].texture;
    };
    Button.prototype.update = function (delta) {
    };
    return Button;
}(PIXI.Container));
exports.Button = Button;
//# sourceMappingURL=button.js.map