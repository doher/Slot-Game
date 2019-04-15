import * as PIXI from "pixi.js";
import { Scene } from "./scene";
import { Machine } from "./machine";
import { Button } from "./button";
import { default as data } from "./data";

export class GameScene extends Scene {

    private readonly TEXT_STYLE: PIXI.TextStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 72,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', 'rgb(226, 197, 67)'],
        stroke: '#4a1850',
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });

    private machine: Machine;
    private headerText: PIXI.Text;
    private button: Button;

    constructor(renderer: PIXI.SystemRenderer) {
        super(renderer);

        // adds machine
        this.machine = new Machine(1340, 880, 5);
        this.machine.position.set(350, 420);
        this.addChild(this.machine);

        // add button
        this.button = new Button();

        this.button
            .on("pointerdown", this.spin.bind(this))
            .on('pointerdown', this.onButtonDown)
            .on('pointerup', this.onButtonUp)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);

        this.addChild(this.button);
        this.addText();
    }

    public update(delta: number): void {

        if (this.machine) {
            this.machine.update(delta);
        }
    }

    protected preload(): void {
        PIXI.loader
            .add([
                "./assets/img/symbols/01.png",
                "./assets/img/symbols/02.png",
                "./assets/img/symbols/03.png",
                "./assets/img/symbols/04.png",
                "./assets/img/symbols/05.png",
                "./assets/img/symbols/06.png",
                "./assets/img/symbols/07.png",
                "./assets/img/symbols/08.png",
                "./assets/img/symbols/09.png",
                "./assets/img/symbols/10.png",
                "./assets/img/symbols/11.png",
                "./assets/img/symbols/12.png",
                "./assets/img/symbols/13.png",
                "./assets/img/btn_spin_normal.png",
                "./assets/img/btn_spin_disable.png",
                "./assets/img/btn_spin_hover.png",
                "./assets/img/btn_spin_pressed.png",
                "./assets/img/slotOverlay.png",
                "./assets/img/winningFrameBackground.jpg",
            ]);
    }

    protected create(): void {
    }

    private spin(): void {
        this.machine.spinReels();
    }

    private addText() {
        // adds header text
        this.headerText = new PIXI.Text("Mr. Monkey", this.TEXT_STYLE);
        this.headerText.anchor.set(0.5, 0.5);
        this.headerText.position.set(1030, 400);
        this.addChild(this.headerText);
    }

    private onButtonDown(): void {
        this.button.setStateButton(3);
    }

    private onButtonUp(): void {
        this.button.setStateButton(0);
    }

    private onButtonOver(): void {
        console.log("over");
        this.button.setStateButton(1);
    }

    private onButtonOut(): void {
        this.button.setStateButton(2);
    }
}