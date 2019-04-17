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
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(width, height) {
        var _this = _super.call(this) || this;
        _this.tileWidth = width;
        _this.tileHeight = height;
        _this.sprite = new PIXI.Sprite();
        _this.sprite.scale.set(1, 1);
        _this.sprite.anchor.set(0.5, 0.5);
        _this.sprite.position.set(_this.tileWidth * 0.5, _this.tileHeight * 0.5);
        _this.addChild(_this.sprite);
        _this.swap();
        return _this;
    }
    Tile.prototype.swap = function () {
        this.id = Math.floor(Math.random() * data_1.default.symbols.length);
        if (data_1.default.symbols[this.id].texture === null) {
            data_1.default.symbols[this.id].texture = PIXI.Texture.fromImage(data_1.default.symbols[this.id].filename);
        }
        this.sprite.texture = data_1.default.symbols[this.id].texture;
    };
    return Tile;
}(PIXI.Container));
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map