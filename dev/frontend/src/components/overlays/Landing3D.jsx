import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import Monitor from './Monitor'
import { useGameStore } from '../../store/useGameStore'

const Landing3D = () => {
  const setGameState = useGameStore((state) => state.setGameState)

  return (
    <div className="w-full h-full bg-black relative">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 35 }}>
        <color attach="background" args={['#030303']} />
        
        {/* GLOBAL AMBIENCE */}
        <ambientLight intensity={0.2} />
        
        {/* MAIN KEY LIGHT (Top Right) */}
        <spotLight 
          position={[5, 8, 5]} 
          angle={0.25} 
          penumbra={1} 
          intensity={50} 
          castShadow 
          color="#ffffff"
        />

        {/* CYAN RIM LIGHTS (To define edges) */}
        <pointLight position={[3, 0, 2]} intensity={15} color="#06b6d4" distance={10} />
        <pointLight position={[-3, 0, 2]} intensity={15} color="#06b6d4" distance={10} />
        <pointLight position={[0, 4, 1]} intensity={10} color="#ffffff" distance={8} />

        {/* BACKLIGHT (To separate monitor from background) */}
        <pointLight position={[0, 0, -3]} intensity={5} color="#06b6d4" distance={10} />

        {/* GROUNDED FLOOR (Catching light for depth) */}
        <group position={[0, -2, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#050505" roughness={0.8} metalness={0.2} />
          </mesh>
          <gridHelper args={[20, 20, '#06b6d4', '#011115']} position={[0, 0.01, 0]} transparent opacity={0.2} />
        </group>

        {/* THE 3D MONITOR */}
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <Monitor onStart={() => setGameState('MAIN_MENU')} />
        </Float>
      </Canvas>
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none z-50 shadow-[inset_0_0_200px_rgba(0,0,0,1)]" />
    </div>
  )
}

export default Landing3D
