import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cloud } from '@react-three/drei';
import { loadClosestSupernovae } from '../../Services/Services';
import { Color, Vector3 } from 'three';
import { Text, Billboard } from '@react-three/drei';
import LoadingPopup from '../LoadingPopup';
import StarIdentifier from './StarIdentifier';

function getColorFromCI(ci) {
  
  const minCI = -0.5; // Valor mínimo de CI
  const maxCI = 2.0; // Valor máximo de CI
  const color = new Color(); 
  color.setRGB(
    (ci - minCI) / (maxCI - minCI), 
    0, 
    1 - (ci - minCI) / (maxCI - minCI) 
  );

  return color;
}

function Star(props) {
  const ref = useRef();
  const [hover, setHover] = useState(false);
  const [clicked, click] = useState(false);
  const { ci, star } = props;

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
            position={[0, 3, 0]}
            anchorX="center"
            anchorY="middle"
            fontSize={15}
            color="white"
            outlineWidth={0.02}
            outlineColor="black"
          >
            {StarIdentifier({star:props.star})}
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
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar las estrellas:', error);
        setLoading(false);
      });
  }, []);
  
  

  return (
    <div className="canvas-container">
      <LoadingPopup message="Loading stars..." loading={loading} />
      <Canvas camera={{ position: [700, 0, 0], far: 7000}} >  
      
        <ambientLight intensity={2} />
        <pointLight intensity={1} position={[0, 0, 0]} castShadow />

        {stars.map((star, index) => (
          <Star key={index} position={[star.x, star.y, star.z]} ci={star.ci} star={star} />
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