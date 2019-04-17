import * as PIXI from "pixi.js";
import { default as data } from "./data";

export class Button extends PIXI.Container {

    public btnSprite: PIXI.Sprite;
    public isEnabled: boolean = true;

    constructor(isEnabled: boolean = true) {
        super();

        this.isEnabled = isEnabled;

        this.btnSprite = new PIXI.Sprite();
        this.btnSprite.scale.set(1, 1);
        this.btnSprite.anchor.set(0.5, 0.5);
        this.btnSprite.position.set(1600, 1360);
        this.setButtonState(2);
        this.btnSprite.interactive = true;
        this.btnSprite.buttonMode = true;

        this.addChild(this.btnSprite);
    }

    public setButtonState(id: number): void {
        // verify if already have texture
        if (data.buttonState[id].texture === null) {
            data.buttonState[id].texture = PIXI.Texture.fromImage(data.buttonState[id].filename);
        }

        // set the data
        // 0 - disabled, 1 - hover, 2 - normal, 3 - pressed
        this.btnSprite.texture = data.buttonState[id].texture;
    }

    public update(delta: number): void {

    }
}
