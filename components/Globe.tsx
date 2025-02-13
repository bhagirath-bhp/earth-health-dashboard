"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"

const GlobeParticles = ({ onSelectPoint, config }) => {
  const pointsRef = useRef()

  const { positions, colors } = useMemo(() => {
    const positions = []
    const colors = []
    const radius = 2

    for (let i = 0; i < 10000; i++) {
      const lat = Math.random() * Math.PI - Math.PI / 2
      const lon = Math.random() * Math.PI * 2
      const x = radius * Math.cos(lat) * Math.cos(lon)
      const y = radius * Math.sin(lat)
      const z = radius * Math.cos(lat) * Math.sin(lon)

      positions.push(x, y, z)

      // Generate color based on config.parameter (placeholder)
      const color = new THREE.Color()
      color.setHSL(Math.random(), 0.7, 0.5)
      colors.push(color.r, color.g, color.b)
    }

    return { positions, colors }
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={pointsRef} onClick={(e) => onSelectPoint(e.point)}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={new Float32Array(positions)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={new Float32Array(colors)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.01} vertexColors />
    </points>
  )
}

const Globe = ({ onSelectPoint, config }) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <GlobeParticles onSelectPoint={onSelectPoint} config={config} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

export default Globe

