'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Text } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { motion, AnimatePresence } from 'framer-motion'
import { Vector3 } from 'three'
import dynamic from 'next/dynamic'
import { memo } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Card, Button } from '@/components/ui/card'

interface Skill {
  name: string
  level: number
  color: string
}

interface StarsProps {
  count: number
  mouse: React.MutableRefObject<[number, number]>
  hoveredSkill: Skill | null
}

interface SkillTextProps {
  skill: Skill
  position: [number, number, number]
  setHoveredSkill: (skill: Skill | null) => void
}

const skills = [
  { name: 'Python', level: 0.9, color: '#3498db' },
  { name: 'React', level: 0.85, color: '#61dafb' },
  { name: 'Node.js', level: 0.8, color: '#68a063' },
  { name: 'TypeScript', level: 0.85, color: '#007acc' },
  { name: 'Machine Learning', level: 0.75, color: '#ff6b6b' },
  { name: 'Data Science', level: 0.8, color: '#8e44ad' },
  { name: 'Cloud Computing', level: 0.7, color: '#2ecc71' },
  { name: 'DevOps', level: 0.65, color: '#e74c3c' },
]

const Stars = memo(function Stars({ count = 5000, mouse, hoveredSkill }: StarsProps) {
  const ref = useRef<THREE.Points>(null)
  const [sphere] = useState(() => random.inSphere(new Float32Array(count * 3), { radius: 1.5 }))
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()

  useFrame((state, delta) => {
    if (!ref.current) return

    // Optimized rotation calculations
    const rotationSpeed = hovered ? 20 : 10
    ref.current.rotation.x -= delta / rotationSpeed
    ref.current.rotation.y -= delta / 15

    // Smooth mouse-based movement
    const [x, y] = mouse.current
    const mouseInfluence = 0.1
    ref.current.rotation.x += (y * delta) * mouseInfluence
    ref.current.rotation.y += (x * delta) * mouseInfluence

    // Enhanced camera movement with easing
    if (hoveredSkill) {
      const targetZ = hoveredSkill ? 1.5 : 1
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)
    }
  })

  const handlePointerOver = useCallback(() => setHovered(true), [])
  const handlePointerOut = useCallback(() => setHovered(false), [])

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <PointMaterial
          transparent
          color={hoveredSkill ? hoveredSkill.color : '#ffffff'}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={hoveredSkill ? 0.8 : 0.6}
          vertexColors
        />
      </Points>
    </group>
  )
})

const SkillText = memo(function SkillText({ skill, position, setHoveredSkill }: SkillTextProps) {
  const [hovered, setHovered] = useState(false)
  const { size } = useThree()
  const scale = size.width < 768 ? 0.05 : 0.08

  return (
    <Text
      position={position}
      fontSize={scale}
      color={skill.color}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => {
        setHovered(true)
        setHoveredSkill(skill)
      }}
      onPointerOut={() => {
        setHovered(false)
        setHoveredSkill(null)
      }}
      scale={hovered ? 1.2 : 1}
    >
      {skill.name}
    </Text>
  )
})

// Export with dynamic import and no SSR for better performance
export default function SkillConstellation() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const mouse = useRef<[number, number]>([0, 0])
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      requestAnimationFrame(() => {
        if ('touches' in event) {
          const touch = event.touches[0]
          mouse.current = [
            (touch.clientX / window.innerWidth) * 2 - 1,
            -(touch.clientY / window.innerHeight) * 2 + 1,
          ]
        } else {
          mouse.current = [
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
          ]
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleMouseMove)
    setIsLoaded(true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleMouseMove)
    }
  }, [])

  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <Card variant="outline" className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Failed to load Skills Visualization</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              There was an error loading the skills visualization. Please try refreshing the page.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </Card>
        </div>
      }
    >
      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, isMobile ? 1.5 : 2]} // Optimize DPR for mobile
          performance={{ min: 0.5 }}
        >
          <Stars
            mouse={mouse}
            hoveredSkill={hoveredSkill}
            count={isMobile ? 3000 : 5000} // Reduce particles on mobile
          />
          <ambientLight intensity={0.5} />
          <fog attach="fog" args={['#000', 1.5, 5.5]} />

          {skills.map((skill, i) => {
            const angle = (i / skills.length) * Math.PI * 2
            const radius = isMobile ? 0.8 : 1 // Smaller radius on mobile
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            return (
              <SkillText
                key={skill.name}
                skill={skill}
                position={[x, y, 0]}
                setHoveredSkill={setHoveredSkill}
              />
            )
          })}
        </Canvas>

        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-lg shadow-xl"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold" style={{ color: hoveredSkill.color }}>
                  {hoveredSkill.name}
                </h3>
                <div className="mt-2 w-40 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${hoveredSkill.level * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: hoveredSkill.color }}
                  />
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  {Math.round(hoveredSkill.level * 100)}% Proficiency
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 2 }}
        />
      </motion.div>
    </ErrorBoundary>
  )
}
