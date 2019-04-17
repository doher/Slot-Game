import { Howl, Howler } from 'howler';

export class Sound {

    private reelSpinSound: Howl;
    private landingSound: Howl;

    constructor() {
        // Setup the new Howl.
        this.reelSpinSound = new Howl({
            src: ['assets/sounds/Reel_Spin.mp3']
        });

        this.landingSound = new Howl({
            src: ['assets/sounds/Landing_1.mp3']
        });
    }

    public playReelSpinSound(): void {
        this.reelSpinSound.play();
    }

    public stopReelSpinSound(): void {
        this.reelSpinSound.stop();
    }

    public playLandingSound(): void {
        this.landingSound.play();
    }
}