class Movement extends Phaser.Scene {
	constructor() {
		super("movementScene");
	}

	init() {
		this.PLAYER_VELOCITY = 350;
	}

	preload() {
		this.load.spritesheet(
			"character",
			"./assets/spritesheets/Character_002.png",
			{
				frameWidth: 48,
			},
		);
	}

	create() {
		this.cameras.main.setBackgroundColor(0xdddddd);

		this.player = this.physics.add
			.sprite(width / 2, height / 2, "character", 1)
			.setScale(2);

		this.player.body.setCollideWorldBounds(true);
		this.player.body.setSize(32, 32).setOffset(8, 16);

		// down = 0, up = 1, left = 2, right = 3
		this.playerDir = 0;

		this.anims.create({
			key: "idle-down",
			frameRate: 0,
			repeat: -1,
			frames: this.anims.generateFrameNumbers("character", {
				start: 1,
				end: 1,
			}),
		});

		this.anims.create({
			key: "idle-up",
			frameRate: 0,
			repeat: -1,
			frames: this.anims.generateFrameNumbers("character", {
				start: 10,
				end: 10,
			}),
		});

		this.anims.create({
			key: "idle-left",
			frameRate: 0,
			repeat: -1,
			frames: this.anims.generateFrameNumbers("character", {
				start: 4,
				end: 4,
			}),
		});

		this.anims.create({
			key: "idle-right",
			frameRate: 0,
			repeat: -1,
			frames: this.anims.generateFrameNumbers("character", {
				start: 7,
				end: 7,
			}),
		});

		this.anims.create({
			key: "walk-down",
			frameRate: 5,
			repeat: -1,
			frames: this.anims.generateFrameNumbers("character", {
				start: 0,
				end: 2,
			}),
		});

		this.anims.create({
			key: "walk-up",
			frameRate: 5,
			repeat: -1,
			frames: this.anims.generateFrameNumbers("character", {
				start: 9,
				end: 11,
			}),
		});

		this.anims.create({
			key: "walk-left",
			frameRate: 5,
			repeat: -1,
			frames: this.anims.generateFrameNumbers("character", {
				start: 3,
				end: 5,
			}),
		});

		this.anims.create({
			key: "walk-right",
			frameRate: 5,
			repeat: -1,
			frames: this.anims.generateFrameNumbers("character", {
				start: 6,
				end: 8,
			}),
		});

		cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		let playerVector = new Phaser.Math.Vector2(0, 0);

		if (cursors.left.isDown) {
			playerVector.x -= 1;
		}
		if (cursors.right.isDown) {
			playerVector.x += 1;
		}
		if (cursors.up.isDown) {
			playerVector.y -= 1;
		}
		if (cursors.down.isDown) {
			playerVector.y += 1;
		}

		if (playerVector.x < 0) {
			this.player.play("walk-left", true);
		} else if (playerVector.x > 0) {
			this.player.play("walk-right", true);
		} else {
			if (playerVector.y < 0) {
				this.player.play("walk-up", true);
			} else if (playerVector.y > 0) {
				this.player.play("walk-down", true);
			} else {
				this.player.play("idle-down", true);
			}
		}

		playerVector.normalize();

		this.player.setVelocity(
			playerVector.x * this.PLAYER_VELOCITY,
			playerVector.y * this.PLAYER_VELOCITY,
		);
	}
}
