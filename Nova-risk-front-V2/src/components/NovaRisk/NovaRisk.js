import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cloud } from '@react-three/drei';
import { loadClosestSupernovae } from '../../Services/Services';
import { Color, Vector3 } from 'three';
import { Text, Billboard } from '@react-three/drei';
import LoadingPopup from '../LoadingPopup';

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
    emissiveIntensity: 0.2,
  };

  const scale = Math.random() * 0.8 + 0.8;

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClosestSupernovae()
      .then((response) => {
        setStars(response.data);
        setLoading(false); // Indicar que la carga ha finalizado
      })
      .catch((error) => {
        console.error('Error al cargar las estrellas:', error);
        setLoading(false); // También en caso de error
      });
  }, []);
  
  

  return (
    <div className="canvas-container">
      <LoadingPopup message="Loading stars..." loading={loading} />
      <Canvas camera={{ position: [600, 0, 0]}} >  
      
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
          maxDistance={1000}
        />
        <Cloud 
          concentrate= {true} 
          color="#00FFFF" 
          seed={2} 
          position={[0, 0, 0]} 
          volume={6000} 
          opacity={0.02}
          segments={5}
          castShadow 
          >
            <meshStandardMaterial
            color="#00FFFF"
            roughness={0.2} 
            metalness={0.8} 
            />   
        </Cloud>
      </Canvas>
    </div>
  );
}