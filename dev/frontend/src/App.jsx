import { useGameStore } from './store/useGameStore'
import Landing3D from './components/overlays/Landing3D'
import MainMenu from './components/overlays/MainMenu'

function App() {
  const gameState = useGameStore((state) => state.gameState)

  return (
    <div className="w-full h-full bg-black text-nexus-accent overflow-hidden selection:bg-nexus-accent selection:text-black font-mono">
      {['START', 'MAIN_MENU'].includes(gameState) && <Landing3D />}
      
      {/* Placeholder for 3D/2D game phases */}
      {gameState.startsWith('3D_') && (
        <div className="w-full h-full flex items-center justify-center p-24">
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4">TRANSITIONING TO PHYSICAL REALITY...</h2>
            <p className="opacity-50">Physical Scene: {gameState}</p>
            <button 
               onClick={() => useGameStore.getState().setGameState('START')}
               className="mt-8 text-xs underline opacity-40 hover:opacity-100"
            >
              // Abort Simulation
            </button>
          </div>
        </div>
      )}

      {gameState === '2D_WORK' && (
        <div className="w-full h-full flex items-center justify-center p-24">
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4">BOOTING WORKSTATION...</h2>
            <p className="opacity-50">Digital Scene: NexusCorp OS</p>
            <button 
               onClick={() => useGameStore.getState().setGameState('START')}
               className="mt-8 text-xs underline opacity-40 hover:opacity-100"
            >
              // Log Off
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
