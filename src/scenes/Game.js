export class GameScene extends Phaser.Scene {
  assets = []
  group

  stackMove = 0 // medida que se deberá mover cada vez que se añade un hamster (la medida es el alto de la imagen)
  stackDimensions = { width: 0, height: 0 } // el ancho y alto de la pila de imagenes

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

  destroyHamster() {
    this.stackMove = 0
    this.stackDimensions = { width: 0, height: 0 }
    this.cameras.main.scrollY = 0 // se reinicia la camara en posición inicial 0
    this.group.clear(true, true)
  }

  spawnHamster() {
    const { width, height } = this.sys.game.config

    const random = this.assets[Math.floor(Math.random() * this.assets.length)]

    const hamster = this.group.create(300, 100 + this.cameras.main.scrollY, random);
    hamster.setScale(.1)
    hamster.setCollideWorldBounds(true);
    hamster.body.customSeparateY = true;

    this.physics.add.collider(hamster, this.group, this.separate);

    // Si la mitad del height de la pantalla ya superó el alto de la pila
    // se empezará a guardar la medida que la camara tiene que moverse (cuando se tiene que mover?, la medida de los hamsters añadidos)
    // si aún no supera la mitad, la distancia que se tiene que mover es 0 (o sea, la camara sin movimiento)
    this.stackMove = this.stackDimensions.height >= height / 2 ? hamster.height * hamster.scale : 0

    // Calcula el height y width de la pila de hamster
    this.stackDimensions = this.group.getChildren().reduce((acc, child) => {
      acc.width = Math.max(acc.width, child.width * child.scale)
      acc.height += child.height * child.scale
      return acc
    }, { width: 0, height: 0 });
  }

  // Función para crear la escena
  create() {
    this.physics.world.checkCollision.up = false;
    this.group = this.physics.add.group();
  }

  // Función que actualiza de acuerdo a los frames
  update() {
    // Si hay un valor que mover en la camara (debe ser superior a 0)
    // se le restará al scroll en Y de la camara principal
    // posterior, se setea a 0 el movimiento que tiene que aplicar la camara, esto debido a que ya se aplico el movimiento
    if (this.stackMove > 0) {
      this.cameras.main.scrollY -= this.stackMove;
      this.stackMove = 0
    }
  }
}