export class GameScene extends Phaser.Scene {
  constructor() {
    super("game")
  }

  // Función para precargar assets
  preload() {

  }

  // Función para crear la escena
  create() {
    this.add.text(10, 10, 'Hello, Phaser!')
  }

  // Función que actualiza de acuerdo a los frames
  update() {

  }
}