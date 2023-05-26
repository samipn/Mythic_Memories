class CharacterMovement extends Phaser.Scene {
    constructor() {
        super('charactermovement');
    }
    preload() {
      this.load.path = "./assets/";		
      this.load.image('Beta Apollo', 'BetaApollo.png')
      this.load.image('Dirt', 'Dirt.png')
    }
    create() {
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(70,20);
        this.player.body.setOffset(0, 100);
        this.player.setDepth(playerDepth);

        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(0, (tileSize*SCALE), tileSize * 20, tileSize, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(0, 1000 - (tileSize*SCALE), tileSize * 20, tileSize, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.botWall);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(envDepth);
        this.walls.add(this.botWall);

        this.leftWall = this.add.tileSprite(100, (tileSize*SCALE), tileSize, tileSize * 20, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.tileSprite(1800 - (tileSize*SCALE), (tileSize*SCALE), tileSize, tileSize * 20, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        this.object = this.add.sprite(1000,700,'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.object);
        this.object.body.immovable = true;
        this.object.setDepth(envDepth);

        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.object);

    }
    update() {
        // Y Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            // W key is currently being pressed
            this.player.setVelocityY(-MAX_VELOCITY);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            // S key is currently being pressed
            this.player.setVelocityY(MAX_VELOCITY);
        }
        else {
            this.player.setVelocityY(0);
        }
        
        // X Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // A key is currently being pressed
            this.player.setVelocityX(-MAX_VELOCITY);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // D key is currently being pressed
            this.player.setVelocityX(MAX_VELOCITY);
        }
        else {
            this.player.setVelocityX(0);
        }
    }
}