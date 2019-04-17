import * as PIXI from "pixi.js";
import { Reel } from "./reel";
import { Button } from "./button";
import { Sound } from "./sound";
import { default as data } from "./data";

export class Machine extends PIXI.Container {

    private reels: Reel[];
    private currentReel: number;
    private sprite: PIXI.Sprite;
    private button: Button;
    private numberOfReels: number;
    private sound: Sound;

    constructor(width: number, height: number, numberOfReels: number = 5) {
        super();

        this.numberOfReels = numberOfReels;
        this.drawBorder();

        // add reels
        this.reels = [];
        const slicedWidth: number = width / this.numberOfReels;

        for (let i: number = 0; i < this.numberOfReels; i++) {
            const reel: Reel = new Reel(slicedWidth, height, i);

            reel.position.set(slicedWidth * i, 0);
            this.addChild(reel);
            this.reels.push(reel);
            reel.on("spincomplete", this.onReelSpinComplete.bind(this));
        }

        // add sound
        this.sound = new Sound();
    }

    public spinReels(): void {
        const timeout: number = 0;

        this.currentReel = 0;

        for (const reel of this.reels) {
            setTimeout(reel.spin.bind(reel), timeout);
        }

        setTimeout(this.stopReels.bind(this), 2500);

        this.sound.playReelSpinSound();
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

        this.sound.playLandingSound();

        if (this.currentReel === this.numberOfReels) {
            this.changeStatusButton();
            this.sound.stopReelSpinSound();
        }
    }

    private drawBorder(): void {
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

    public getButton(button: Button): void {
        this.button = button;
    }

    public changeStatusButton(): void {
        this.button.isEnabled = !this.button.isEnabled;
        this.button.setButtonState(2);
    }
}
