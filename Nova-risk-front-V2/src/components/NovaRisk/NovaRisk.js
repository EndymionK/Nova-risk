import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { loadClosestSupernovae } from '../../Services/Services';
import { Color, Vector3 } from 'three';

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
  const { ci } = props;

  const materialColor = getColorFromCI(ci);

  // Ajusta las propiedades del material para hacer que las estrellas sean más brillantes
  const materialProps = {
    color: materialColor,
    emissive: new Color(1, 1, 1), // Color de emisión blanco
    emissiveIntensity: 0.1, // Intensidad de emisión
  };

  // Ajusta el tamaño de las estrellas
  const scale = Math.random() * 0.5 + 0.5; // Escala aleatoria
  const initialPosition = new Vector3(
    props.position[0] + (Math.random() - 0.5) * 20, // Desplazamiento aleatorio
    props.position[1] + (Math.random() - 0.5) * 20,
    props.position[2] + (Math.random() - 0.5) * 20
  );

  return (
    <mesh
      {...props}
      ref={ref}
      scale={[scale, scale, scale]}
      position={initialPosition}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereGeometry />
      <meshStandardMaterial {...materialProps} sizeAttenuation={false} receiveShadow castShadow />
    </mesh>
  );
}

export default function App() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Cargar las estrellas cuando se monta el componente
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
      <Canvas camera={{ position: [0, 0, 30], far: 10000 }} gl={{ clearColor: 'black' }}>
        <ambientLight intensity={2} />
        <pointLight intensity={1} position={[0, 0, 0]} castShadow />
        {stars.map((star, index) => (
          <Star key={index} position={[star.x, star.y, star.z]} ci={star.ci} />
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
