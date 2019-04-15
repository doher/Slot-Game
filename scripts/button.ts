import * as PIXI from "pixi.js";
import { default as data } from "./data";

export class Button extends PIXI.Sprite {

    constructor() {
        super();

        // adds sprite
        this.scale.set(1, 1);
        this.anchor.set(0.5, 0.5);
        this.position.set(1880, 1140);
        this.addChild(this);

        this.interactive = true;
        this.buttonMode = true;

        this.setStateButton(1);
    }

    public setStateButton(id: number): void {
        // verify if already have texture
        if (data.buttonState[id].texture === null) {
            data.buttonState[id].texture = PIXI.Texture.fromImage(data.buttonState[2].filename);
        }

        // set the data
        this.texture = data.buttonState[id].texture;
    }
}