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
var tile_1 = require("./tile");
var Reel = (function (_super) {
    __extends(Reel, _super);
    function Reel(width, height, id) {
        var _this = _super.call(this) || this;
        _this.spinning = false;
        _this.stopping = false;
        _this.reelWidth = width;
        _this.reelHeight = height;
        _this.tileHeight = height / Reel.visibleTiles;
        _this.id = id;
        var rectMask = new PIXI.Graphics();
        rectMask.beginFill(0);
        rectMask.drawRect(0, 0, _this.reelWidth, _this.reelHeight);
        rectMask.endFill();
        _this.addChild(rectMask);
        _this.container = new PIXI.Container();
        _this.container.mask = rectMask;
        _this.addChild(_this.container);
        _this.tiles = [];
        for (var i = 0; i < Reel.totalTiles; i++) {
            var tile = new tile_1.Tile(_this.reelWidth, _this.tileHeight);
            tile.position.set(0, _this.tileHeight * (i - 1));
            _this.container.addChild(tile);
            _this.tiles.push(tile);
        }
        _this.blurFilter = new PIXI.filters.BlurYFilter();
        return _this;
    }
    Reel.prototype.spin = function () {
        this.time = 0;
        this.spinning = true;
        this.blurFilter.strength = 0;
        this.filters = [this.blurFilter];
    };
    Reel.prototype.stop = function () {
        this.finalOffset = 1;
        this.finalPosition = this.reelHeight - this.tileHeight - this.container.children[0].y;
        this.stopping = true;
        this.timeStop = this.time;
    };
    Reel.prototype.update = function (delta) {
        if (!this.spinning) {
            return;
        }
        this.time += delta;
        var speed = this.getSpeed(delta);
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.y += speed;
        }
        this.blurFilter.strength = speed * 0.3;
        var limitY = this.reelHeight + this.tileHeight;
        for (var i = this.tiles.length - 1; i >= 0; i--) {
            if (this.container.y + this.tiles[i].y > limitY) {
                this.tiles[i].y = this.container.children[0].y - this.tileHeight;
                this.container.addChildAt(this.tiles[i], 0);
                this.tiles[i].swap();
            }
        }
    };
    Reel.prototype.getSpeed = function (delta) {
        var speed = delta * Reel.reelMaxSpeed;
        if (this.stopping) {
            var n = 1 - (this.time - this.timeStop) / Reel.outTime, r = this.easeInBack(n);
            speed = (this.finalOffset - r) * this.finalPosition;
            this.finalOffset = r;
            if (n <= 0) {
                this.onComplete();
            }
        }
        else if (this.time < Reel.inTime) {
            var n = this.time / Reel.inTime;
            speed *= this.easeInBack(n);
        }
        return speed;
    };
    Reel.prototype.onComplete = function () {
        this.stopping = false;
        this.spinning = false;
        this.reorderTiles();
        this.emit("spincomplete", { target: this, id: this.id });
        this.filters = null;
    };
    Reel.prototype.reorderTiles = function () {
        this.tiles.sort(this.compareTiles.bind(this));
    };
    Reel.prototype.compareTiles = function (a, b) {
        return this.container.getChildIndex(a) > this.container.getChildIndex(b);
    };
    Reel.prototype.easeInBack = function (n) {
        var s = 1.70158;
        return n * n * ((s + 1) * n - s);
    };
    Reel.reelMaxSpeed = 50;
    Reel.inTime = 30;
    Reel.outTime = 50;
    Reel.visibleTiles = 4;
    Reel.totalTiles = 6;
    return Reel;
}(PIXI.Container));
exports.Reel = Reel;
//# sourceMappingURL=reel.js.map