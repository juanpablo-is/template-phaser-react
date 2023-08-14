import Phaser from 'phaser'
import { GameScene } from './scenes/Game'
import { useMemo } from 'react'

function App () {
  const scene = useMemo(() => {
    return new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'game',
      backgroundColor: '#282c34',
      scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight
      },
      scene: [GameScene]
    })
  }, [])

  console.log(scene)

  return <div id='game' />
}

export default App
