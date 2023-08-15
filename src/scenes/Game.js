export class GameScene extends Phaser.Scene {
  assets = []
  group

  constructor() {
    super("game")
    this.assets = [
      "hamster-1",
      "hamster-2",
      "hamster-3",
      "hamster-4",
      "hamster-5",
      "hamster-6",
      "hamster-7",
      "hamster-8",
    ]
  }

  // Función para precargar assets
  preload() {
    this.assets.forEach(asset =>
      this.load.image(asset, `assets/${asset}.png`)
    )
  }

  // https://labs.phaser.io/edit.html?src=src/physics/arcade/custom%20separate.js&v=3.60.0
  separate(sprite1, sprite2) {
    const b1 = sprite1.body;
    const b2 = sprite2.body;

    if (b1.y > b2.y) {
      b2.y += b1.top - b2.bottom;
      b2.stop()
    } else {
      b1.y += b2.top - b1.bottom;
      b1.stop()
    }
  }

  spawnHamster() {
    const random = this.assets[Math.floor(Math.random() * this.assets.length)]

    const hamster = this.group.create(300, 100, random);
    hamster.setScale(.1)
    hamster.setCollideWorldBounds(true);
    hamster.body.customSeparateY = true;

    this.physics.add.collider(hamster, this.group, this.separate);
  }

  // Función para crear la escena
  create() {
    this.physics.world.checkCollision.up = false;
    this.group = this.physics.add.group();
  }

  // Función que actualiza de acuerdo a los frames
  update() { }
}