class TitleScreen extends Phaser.Scene {
    constructor()
    {
        super('titlescreen');
    }
    preload()
    {
        this.load.path = "./assets/";
        this.load.image('Beta Apollo' , 'BetaApollo.png');
        this.load.image('Lyre', 'Lyre.png');
        this.load.image('Bow', 'Bow.png');
        this.load.image('Scroll', 'Scroll.png');
        this.load.image('Crow', 'Crow.png');
    }

    create()
    {
        this.cameras.main.setBackgroundColor(0x87CEEB);

        // Create the text
        // Level Complete!
        let title = this.add.text(game.config.width/2, -500, 'Mythic Memories', {font: `bold 100px Futura`, color: '#FFFFFF', stroke: '#000000', strokeThickness: 7})
            .setOrigin(0.5);
        // PLAY (RECC FOR FIRST TIME PLAYERS)
        let play = this.add.text(game.config.width/2, 1100, 'PLAY', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        play.setInteractive()
            .on('pointerover', () => {
                play.setColor('#006400');
                this.tweens.add({
                    targets: play,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                play.setColor('#000000');
                this.tweens.add({
                    targets: play,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(750, 135, 206, 235);
                this.time.delayedCall(740, () => this.scene.start('centralhub'));
            });

        // Create the sprites
        let BetaApollo = this.add.sprite(-700, 540, 'Beta Apollo')
            .setOrigin(0, 0.5).setScale(4);
        let lyre = this.add.sprite(2520, 500 + 100, 'Lyre')
            .setOrigin(1, 0.5).setScale(2);;
        let bow = this.add.sprite(2620, 600 + 100, 'Bow')
            .setOrigin(1, 0.5).setScale(2);
        let scroll = this.add.sprite(2520, 720 + 100, 'Scroll')
            .setOrigin(1, 0.5).setScale(1.4);
        let crow = this.add.sprite(2900, 470 + 100, 'Crow')
            .setOrigin(1, 0.5).setScale(2);
        
        // Animation for title
        this.tweens.add({
            targets: title,
            y: { from: -500, to: 150 },
            ease: 'Linear',
            duration: 2000,

            onComplete: () => {
                // Animations for BetaApollo
                this.tweens.add({
                    targets: BetaApollo,
                    x: { from: -700, to: 200 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500,
                });

                // Animation for artifacts
                this.tweens.add({
                    targets: [lyre, bow, scroll, crow],
                    x: '-= 1020',
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });


                // Animations for Text
                this.tweens.add({
                    targets: play,
                    y: { from: 1100, to: 540 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });
            }
        });
    }
}