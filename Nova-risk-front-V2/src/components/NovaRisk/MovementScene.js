import React, { useEffect, useRef } from "react";
import { extend, useThree } from "react-three-fiber";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

extend({ PointerLockControls });

const MovementScene = () => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  useEffect(() => {
    const handleFocus = () => {
      controls.current.lock();
    };
    gl.domElement.addEventListener("pointerdown", handleFocus);

    return () => {
      gl.domElement.removeEventListener("pointerdown", handleFocus);
    };
  }, [gl]);

  return (
    <>
      <pointerLockControls ref={controls} args={[camera, gl.domElement]} />
    </>
  );
};

export default MovementScene;
