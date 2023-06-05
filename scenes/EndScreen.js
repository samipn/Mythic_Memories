class EndScreen extends Phaser.Scene {
	constructor()
	{
		super('endscreen')
	}

	create()
	{
    this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
    this.cameras.main.setBackgroundColor('#FFFFFF');
		const width = this.scale.width
		const height = this.scale.height
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.add.text(screenCenterX, screenCenterY, 'Thank you for playing!', {
			font: 'Comic Sans',
      fill: '#000000'
		})
		.setOrigin(0.5)
		.setFontSize(50)
    this.add.text(screenCenterX, screenCenterY + 50, "Click anywhere to restart", {
      fill: '#000000'
    }).setFontSize(20).setOrigin(0.5);
    this.input.on('pointerdown', () => {
        this.cameras.main.fade(1000, 0,0,0);
        inventory = [];
        pedestalArtifacts = [false, false, false, false];
        tutorialDone = false;
        gameDone = false;
        level1Complete = false;
        level2Complete = false;
        level3Complete = false;
        level4Complete = false;
        this.time.delayedCall(1000, () => this.scene.start('centralhub'));
    });
	}
}