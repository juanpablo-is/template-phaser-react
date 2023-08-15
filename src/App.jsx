import { useMemo } from 'react'
import Phaser from 'phaser'
import { GameScene } from './scenes/Game'

function App () {
  const game = useMemo(() => {
    return new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'root',
      backgroundColor: '#282c34',
      scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { y: 200 }
        }
      },
      scene: [GameScene]
    })
  }, [])

  return (
    <div>
      <button
        onClick={() => {
          game.scene.keys.game.spawnHamster()
        }}
      >
        click me
      </button>
      <div id='game' />
    </div>
  )
}

export default App
