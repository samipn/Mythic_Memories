class MazePuzzle extends Phaser.Scene {
    constructor() {
        super('mazepuzzle');
    }

    preload() {
        this.load.path = "./assets/";		
        this.load.image('Fire', 'Fire.png');
        this.load.image('Milf', 'Milf.png');
    }
    
    create() {
        // Created Player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(57,20);
        this.player.body.setOffset(7, 135);
        this.player.setDepth(playerDepth);

        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(57,20);
        this.playerInteractBox.body.setOffset(7, 135);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(220, 50, wallSize * 8 * 12, wallSize * 12, 'Top Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(220, 819, wallSize * 94, wallSize * 12 + 9, 'Bottom Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.botWall);
        this.botWall.body.setSize(wallSize * 94, 100);
        this.botWall.body.setOffset(0, 100);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(3);
        this.walls.add(this.botWall);

        this.leftWall = this.add.sprite(100, 50, 'Left Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.sprite(1820 - (wallSize*SCALE), 50, 'Right Wall').setScale(1).setOrigin(1,0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(envDepth);

        // Created Floor
        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(envDepth);

        // Create NPC
        this.Npc = this.physics.add.sprite(600, 500, 'Milf').setOrigin(0.5).setScale(0.45);
        this.Npc.setDepth(envDepth);
        this.Npc.body.immovable = true;

        // Created Fire
        // 120 wide 180 tall
        this.fires = this.add.group();
        this.fire1 = this.add.tileSprite(300, 470, 120, 905, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire1);
        this.fire1.body.immovable = true;
        this.fires.add(this.fire1);

        this.fire2 = this.add.tileSprite(440, 490, 120, 805, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire2);
        this.fire2.body.immovable = true;
        this.fires.add(this.fire2);

        this.fire3 = this.add.tileSprite(650, 334, 725, 180, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire3);
        this.fire3.body.immovable = true;
        this.fires.add(this.fire3);

        this.fire4 = this.add.tileSprite(800, 550, 120, 875, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire4);
        this.fire4.body.immovable = true;
        this.fires.add(this.fire4);

        this.fire5 = this.add.tileSprite(1265, 725, 1750, 180, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire5);
        this.fire5.body.immovable = true;
        this.fires.add(this.fire5);

        this.fire6 = this.add.tileSprite(940, 445, 120, 785, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire6);
        this.fire6.body.immovable = true;
        this.fires.add(this.fire6);

        this.fire7 = this.add.tileSprite(1550, 465, 120, 700, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire7);
        this.fire7.body.immovable = true;
        this.fires.add(this.fire7);

        this.fire8 = this.add.tileSprite(1245, 596, 1100, 180, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire8);
        this.fire8.body.immovable = true;
        this.fires.add(this.fire8);

        //Player physics
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.fires, this.resetPlayer, null, this);
        this.physics.add.collider(this.player, this.Npc);
    }

    update() {
        // Have interact hitbox follow player
        this.playerInteractBox.x = this.player.x;
        this.playerInteractBox.y = this.player.y;

        // Y Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            // W key is currently being pressed
            this.player.setVelocityY(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,50);
            this.playerInteractBox.body.setOffset(0,50);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            // S key is currently being pressed
            this.player.setVelocityY(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,50);
            this.playerInteractBox.body.setOffset(0,120);
        }
        else {
            this.player.setVelocityY(0);
        }
        
        // X Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // A key is currently being pressed
            this.player.setVelocityX(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,120);
            this.playerInteractBox.body.setOffset(-70,0);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // D key is currently being pressed
            this.player.setVelocityX(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,120);
            this.playerInteractBox.body.setOffset(70,0);
        }
        else {
            this.player.setVelocityX(0);
        }    
    }

    // Reset player when they touch the fire
    resetPlayer() {
        this.player.x = 400;
        this.player.y = 800;
    }
}