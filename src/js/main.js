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
var game_1 = require("./game");
var data_1 = require("./data");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this, game_1.GameScene.width, game_1.GameScene.height, { backgroundColor: 0x3aaaa3, legacy: true }) || this;
        document.body.appendChild(_this.view);
        _this.setBackground();
        _this.scenes = [];
        var game = new game_1.GameScene(_this.renderer);
        _this.ticker.add(game.update.bind(game));
        _this.addScene(game);
        PIXI.loader.load();
        return _this;
    }
    Main.prototype.addScene = function (scene) {
        this.scenes.push(scene);
        this.stage.addChild(scene);
    };
    Main.prototype.setBackground = function () {
        if (data_1.default.frameBackground.texture === null) {
            data_1.default.frameBackground.texture = PIXI.Texture.fromImage(data_1.default.frameBackground.filename);
        }
        this.tilingSprite = new PIXI.extras.TilingSprite(data_1.default.frameBackground.texture, game_1.GameScene.width, game_1.GameScene.height);
        this.stage.addChild(this.tilingSprite);
    };
    return Main;
}(PIXI.Application));
window.onload = function () {
    var main = new Main();
};
//# sourceMappingURL=main.js.map