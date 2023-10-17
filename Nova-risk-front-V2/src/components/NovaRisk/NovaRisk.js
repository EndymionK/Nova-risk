import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { loadClosestSupernovae } from '../../Services/Services';
import { Color, Vector3 } from 'three';

// Importa el componente Text de @react-three/drei
import { Text, Billboard } from '@react-three/drei';

function getColorFromCI(ci) {
  // Mapea el valor de CI a un color en un gradiente de rojo a azul
  const minCI = -0.5; // Valor mínimo de CI
  const maxCI = 2.0; // Valor máximo de CI
  const color = new Color();

  // Interpolación lineal para mapear el valor de CI al rango de color
  color.setRGB(
    (ci - minCI) / (maxCI - minCI), // Componente rojo
    0, // Componente verde (en este ejemplo, 0)
    1 - (ci - minCI) / (maxCI - minCI) // Componente azul
  );

  return color;
  
}

function Star(props) {
  const ref = useRef();
  const [hover, setHover] = useState(false);
  const [clicked, click] = useState(false);
  const { ci, proper } = props;

  const materialColor = getColorFromCI(ci);

  const materialProps = {
    color: materialColor,
    emissive: new Color(1, 1, 1),
    emissiveIntensity: 0.1,
  };

  const scale = Math.random() * 0.5 + 0.5;

  return (
    <mesh
      {...props}
      ref={ref}
      scale={[scale, scale, scale]}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereGeometry />
      <meshStandardMaterial {...materialProps} sizeAttenuation={false} receiveShadow castShadow />
      {hover && (
        <Billboard>
          <Text
            position={[0, 2, 0]}
            anchorX="center"
            anchorY="middle"
            fontSize={15}
            color="white"
            outlineWidth={0.02}
            outlineColor="black"
          >
            {proper}
          </Text>
        </Billboard>
      )}
    </mesh>
  );
}

export default function App() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    loadClosestSupernovae()
      .then((response) => {
        setStars(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las estrellas:', error);
      });
  }, []);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = document.querySelector('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 30], far: 10000 }}>
        <ambientLight intensity={2} />
        <pointLight intensity={1} position={[0, 0, 0]} castShadow />

        {stars.map((star, index) => (
          <Star key={index} position={[star.x, star.y, star.z]} ci={star.ci} proper={star.proper} />
        ))}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={4}
          maxDistance={1200}
        />
      </Canvas>
    </div>
  );
}