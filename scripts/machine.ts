import * as PIXI from "pixi.js";
import { Reel } from "./reel";
import { default as data } from "./data";

export class Machine extends PIXI.Container {

    private reels: Reel[];
    private currentReel: number;
    private sprite: PIXI.Sprite;

    constructor(width: number, height: number, numberOfReels: number = 5) {
        super();

        this.drawBorder();

        // add reels
        this.reels = [];
        const slicedWidth: number = width / numberOfReels;

        for (let i: number = 0; i < numberOfReels; i++) {
            const reel: Reel = new Reel(slicedWidth, height, i);

            reel.position.set(slicedWidth * i, 0);
            this.addChild(reel);
            this.reels.push(reel);
            reel.on("spincomplete", this.onReelSpinComplete.bind(this));
        }
    }

    public spinReels(): void {
        const timeout: number = 0;

        this.currentReel = 0;

        for (const reel of this.reels) {
            setTimeout(reel.spin.bind(reel), timeout);
        }

        setTimeout(this.stopReels.bind(this), 1500);
    }

    public stopReels(): void {
        this.reels[0].stop();
    }

    public update(delta: number): void {

        for (const reel of this.reels) {
            reel.update(delta);
        }
    }

    private onReelSpinComplete(event: Event): void {
        this.currentReel++;

        if (this.currentReel < this.reels.length) {

            // stop the next
            this.reels[this.currentReel].stop();
        }
    }

    private drawBorder() {
        // verify if already have texture
        if (data.border.texture === null) {
            data.border.texture = PIXI.Texture.fromImage(data.border.filename);
        }

        // set the data
        this.sprite = new PIXI.Sprite();
        this.sprite.scale.set(1.3, 1.6);
        this.sprite.y = -70;
        this.sprite.x = -55;
        this.sprite.texture = data.border.texture;
        this.addChild(this.sprite);
    }
}
