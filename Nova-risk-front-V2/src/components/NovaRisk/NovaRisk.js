import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { loadClosestSupernovae } from "../../Services/Services";

function getColorForCI(ci) {
  // Define un mapeo de colores basado en los valores de CI
  // Puedes personalizar estos colores según tus preferencias
  const colorMap = {
    // Define un color para un rango de CI específico
    // Por ejemplo, rojo para CI bajo y azul para CI alto
    // Puedes ajustar estos valores según tus necesidades
    lowCI: 0xff0000, // Rojo
    mediumCI: 0xffff00, // Amarillo
    highCI: 0x0000ff, // Azul
  };

  // Determina el rango de CI basado en tus datos
  if (ci < 1.0) {
    return colorMap.lowCI;
  } else if (ci < 2.0) {
    return colorMap.mediumCI;
  } else {
    return colorMap.highCI;
  }
}

function Star(props) {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.x += delta))

  // Obtén el color basado en el CI
  const color = getColorForCI(props.ci);

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => {}}
      onPointerOver={(event) => event.stopPropagation()}
      onPointerOut={() => {}}
    >
      <sphereGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function App() {
  const [closestStars, setClosestStars] = useState([]);

  useEffect(() => {
    loadClosestSupernovae().then((response) => {
      setClosestStars(response.data);
    });
  }, []);

  return (
    <Canvas>
      <ambientLight intensity={2} />
      {closestStars.map((star, index) => (
        <Star
          key={index}
          position={[star.x, star.y, star.z]}
          ci={star.ci} // Pasa el valor de CI como prop
        />
      ))}
      <OrbitControls />
    </Canvas>
  )
}
