import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Star(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hover, setHover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), setHover(true))}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry />
      <meshStandardMaterial color={'white'} />
    </mesh>
  )
}

function Earth(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hover, setHover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => (event.stopPropagation(), setHover(true))}
        onPointerOut={(event) => setHover(false)}>
        <sphereGeometry />
        <meshStandardMaterial color={'blue'} />
      </mesh>
    )
  }

export default function App() {
    useEffect(() => {
        const resizeCanvas = () => {
          const canvas = document.querySelector('canvas')
          canvas.style.width = '100%'
          canvas.style.height = '100%'
        }    
        window.addEventListener('resize', resizeCanvas)
        return () => {
          window.removeEventListener('resize', resizeCanvas)
        }
      }, [])



  return (
    <Canvas>
      <ambientLight intensity={2} />
      <Star position={[-4, 0, 0]} />
      <Star position={[4, 0, 0]} />
      <Earth position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )
}