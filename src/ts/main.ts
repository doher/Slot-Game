import * as PIXI from "pixi.js";
import { Scene } from "./scene";
import { GameScene } from "./game";
import { default as data } from "./data";

class Main extends PIXI.Application {

    public view: HTMLCanvasElement;
    public stage: PIXI.Container;

    private scenes: Scene[];
    private tilingSprite: PIXI.extras.TilingSprite;

    constructor() {
        super(GameScene.width, GameScene.height, { backgroundColor: 0x3aaaa3, legacy: true });

        document.body.appendChild(this.view);
        this.setBackground();
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

    private setBackground(): void {
        // verify if already have texture
        if (data.frameBackground.texture === null) {
            data.frameBackground.texture = PIXI.Texture.fromImage(data.frameBackground.filename);
        }

        // set the data
        this.tilingSprite = new PIXI.extras.TilingSprite(data.frameBackground.texture, GameScene.width, GameScene.height);
        this.stage.addChild(this.tilingSprite);
    }
}

window.onload = () => {
    const main: Main = new Main();

    // let sound = new Howl({
    //     src: ['./assets/sounds/Reel_Spin.mp3'],
    //     autoplay: true,
    //     loop: true,
    //     volume: 0.5,
    //     onend: function () {
    //         console.log('Finished!');
    //     }
    // });
};