import * as PIXI from "pixi.js";
import { Scene } from "./scene";
import { GameScene } from "./game";
import { default as data } from "./data";

export class Main extends PIXI.Application {

    public view: HTMLCanvasElement;
    public stage: PIXI.Container;

    private scenes: Scene[];
    private tilingSprite: PIXI.extras.TilingSprite;

    constructor() {
        super(GameScene.width, GameScene.height, { backgroundColor: 0x3aaaa3, legacy: true });

        document.body.appendChild(this.view);

        // set frame background
        // verify if already have texture
        if (data.frameBackground.texture === null) {
            data.frameBackground.texture = PIXI.Texture.fromImage(data.frameBackground.filename);
        }

        // set the data
        this.tilingSprite = new PIXI.extras.TilingSprite(data.frameBackground.texture, GameScene.width, GameScene.height);
        this.stage.addChild(this.tilingSprite);

        this.scenes = [];

        const game: GameScene = new GameScene(this.renderer);
        this.ticker.add(game.update.bind(game));
        this.addScene(game);

        PIXI.loader.load();
    }

    public addScene(scene: Scene): void {
        this.scenes.push(scene);
        this.stage.addChild(scene);
    }
}

window.onload = () => {
    const main: Main = new Main();
};