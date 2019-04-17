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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(renderer) {
        var _this = _super.call(this) || this;
        _this.renderer = renderer;
        _this.resize();
        _this.preload();
        PIXI.loader.onComplete.add(function () { return _this.create(); });
        window.addEventListener("resize", _this.resize.bind(_this));
        return _this;
    }
    Scene.prototype.resize = function () {
        var ratio = Math.min(window.innerWidth / Scene.width, window.innerHeight / Scene.height);
        this.scale.set(ratio, ratio);
        this.renderer.resize(Scene.width * ratio, Scene.height * ratio);
    };
    Scene.width = 2048;
    Scene.height = 1536;
    return Scene;
}(PIXI.Container));
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map