import * as PIXI from "pixi.js";
import { default as data } from "./data";

export class Tile extends PIXI.Container {

    public id: number;

    private tileWidth: number;
    private tileHeight: number;
    private sprite: PIXI.Sprite;

    constructor(width: number, height: number) {
        super();

        // store width and height
        this.tileWidth = width;
        this.tileHeight = height;

        // adds sprite
        this.sprite = new PIXI.Sprite();
        this.sprite.scale.set(1, 1);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(this.tileWidth * 0.5, this.tileHeight * 0.5);
        this.addChild(this.sprite);
        this.swap();
    }

    public swap(): void {
        // get a random symbol id
        this.id = Math.floor(Math.random() * data.symbols.length);

        // verify if already have texture
        if (data.symbols[this.id].texture === null) {
            data.symbols[this.id].texture = PIXI.Texture.fromImage(data.symbols[this.id].filename);
        }

        // set the data
        this.sprite.texture = data.symbols[this.id].texture;
    }
}