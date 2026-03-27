import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const Monitor = ({ onStart }) => {
  const meshRef = useRef()
  const framesRef = useRef([])
  const glitchRef = useRef(0)
  const textMaterialRef = useRef()
  const { mouse } = useThree()

  // Pre-generate shared assets
  const { gridGeo, textCanvas, wallGeo, backGeo } = useMemo(() => {
    return {
      gridGeo: new THREE.PlaneGeometry(3.6, 2.6),
      wallGeo: new THREE.BoxGeometry(0.1, 3.2, 2),    // side
      backGeo: new THREE.BoxGeometry(4.2, 3.2, 0.1),   // back
      textCanvas: (() => {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 128
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, 512, 128)
        ctx.font = 'bold 58px monospace'
        ctx.fillStyle = '#06b6d4'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('TAP TO START', 256, 64)
        return new THREE.CanvasTexture(canvas)
      })()
    }
  }, [])

  const layers = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      scale: Math.pow(0.72, i),
      z: 0.9 - i * 0.35
    }))
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime

    // Smooth movement
    const targetX = -mouse.y * 0.15
    const targetY = mouse.x * 0.2
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.1)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.1)
    
    // Efficient Glitch Update
    if (Math.random() > 0.98) glitchRef.current = Math.random()
    else glitchRef.current = THREE.MathUtils.lerp(glitchRef.current, 0, 0.1)

    // Update inner frames
    framesRef.current.forEach((frame, i) => {
      if (!frame) return
      const flicker = 0.85 + Math.sin(time * 10 + i) * 0.15 * (1 - glitchRef.current)
      frame.children.forEach(child => {
        if (child.material) {
          child.material.opacity = (i === 0 ? 0.9 : 0.6) * flicker * (1 - (i/8))
        }
      })
    })

    if (textMaterialRef.current) {
        textMaterialRef.current.opacity = (0.7 + Math.sin(time * 4) * 0.3) * (1 - glitchRef.current * 0.4)
    }
  })

  return (
    <group ref={meshRef} onClick={onStart}>
      {/* MONITOR CASE - Brightened to #2a2a2a for visibility */}
      <mesh position={[0, 0, 1]} geometry={backGeo}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      <group>
        <mesh position={[-2.1, 0, 0]} geometry={wallGeo}>
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
        </mesh>
        <mesh position={[2.1, 0, 0]} geometry={wallGeo}>
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI/2]} geometry={wallGeo}>
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
        </mesh>
        <mesh position={[0, -1.6, 0]} rotation={[0, 0, Math.PI/2]} geometry={wallGeo}>
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
        </mesh>
      </group>
      
      {/* Back Plate */}
      <mesh position={[0, 0, -1]} geometry={backGeo}>
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* HOLLOW BEZEL RIM */}
      <group position={[0, 0, 1.01]}>
          <mesh position={[0, 1.4, 0]}>
              <boxGeometry args={[4, 0.2, 0.1]} />
              <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0, -1.4, 0]}>
              <boxGeometry args={[4, 0.2, 0.1]} />
              <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[-1.9, 0, 0]}>
              <boxGeometry args={[0.2, 3, 0.1]} />
              <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[1.9, 0, 0]}>
              <boxGeometry args={[0.2, 3, 0.1]} />
              <meshStandardMaterial color="#1a1a1a" />
          </mesh>
      </group>

      {/* POWER LED (Quality Detail) */}
      <mesh position={[1.7, -1.4, 1.06]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={5} />
      </mesh>
      <pointLight position={[1.7, -1.4, 1.1]} intensity={0.5} distance={1} color="#ff0000" />

      {/* RECURSIVE LAYERS */}
      <group>
        {layers.map((layer, index) => (
          <group 
            key={layer.id} 
            position={[0, 0, layer.z]} 
            scale={[layer.scale, layer.scale, 1]}
            ref={el => framesRef.current[index] = el}
          >
            <mesh>
              <boxGeometry args={[3.85, 2.85, 0.05]} />
              <meshBasicMaterial 
                color="#06b6d4" 
                transparent 
                opacity={0.8}
                wireframe={index > 0} 
              />
            </mesh>
            <mesh position={[0, 0, 0.03]} geometry={gridGeo}>
              <meshBasicMaterial 
                color="#022126" 
                transparent
                opacity={0.4}
                wireframe
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Stand */}
      <mesh position={[0, -1.8, 0.2]} castShadow>
        <cylinderGeometry args={[0.3, 0.5, 0.4, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* TAP TO START Overlay */}
      <mesh position={[0, 0, 1.05]} geometry={gridGeo} scale={[0.8, 0.3, 1]}>
        <meshBasicMaterial 
          ref={textMaterialRef}
          map={textCanvas} 
          transparent 
          opacity={0.9} 
          color="#fff" 
        />
      </mesh>

      {/* Atmospheric Interior Light */}
      <pointLight position={[0, 0, 0.5]} intensity={12} distance={8} color="#06b6d4" />
      <pointLight position={[0, -1.6, 0.5]} intensity={3} distance={3} color="#06b6d4" />
    </group>
  )
}

export default Monitor
