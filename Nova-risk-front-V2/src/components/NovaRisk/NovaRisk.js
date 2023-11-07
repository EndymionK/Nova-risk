import React, { useRef, useState, useEffect } from 'react';
import { Canvas} from '@react-three/fiber';
import { Color} from 'three';
import { Text, Billboard } from '@react-three/drei';
import { loadClosestSupernovae } from '../../Services/Services';
import LoadingPopup from '../LoadingPopup';
import StarIdentifier from './StarIdentifier';
import MovementScene from './MovementScene';
import { Controls } from './Controls';
import { Modal, Button } from 'react-bootstrap';

function getColorFromCI(ci) {
  const minCI = -0.5;
  const maxCI = 2.0;
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

  return (
    <mesh
      {...props}
      ref={ref}
      scale={[1, 1, 1]}
      onClick={(event) => {
        click(!clicked);
        window.location.href = `/star/${star._id}`;
      }}
      onPointerOver={(event) => {
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
            {StarIdentifier({ star: props.star })}
          </Text>
        </Billboard>
      )}
    </mesh>
  );
}

export default function App() {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);


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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-popup">
          <Modal.Title>Nova Risk</Modal.Title>
          <span className="wave" role="img" aria-labelledby="wave">
            🌟
          </span>
        </Modal.Header>
        <Modal.Body>
          <p>This 3D scene represents the 1000 stars closest to Earth with a high probability of becoming supernovas. You can use the W A S D keys to move freely within the scene and use the cursor to click on a star to get more detailed information.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" centered onClick={() => setShowModal(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Canvas camera={{ position: [700, 0, 0], far: 2000 }}>
        <ambientLight intensity={4} />
        <pointLight intensity={4} position={[0, 0, 0]} />
        {stars.map((star, index) => (
          <Star key={index} position={[star.x, star.y, star.z]} ci={star.ci} star={star} />
        ))}
        <MovementScene />
        <Controls />
      </Canvas>
    </div>
  );
}

