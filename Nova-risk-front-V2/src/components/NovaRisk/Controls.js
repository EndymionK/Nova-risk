import { useKeyboardInput } from './customHooks';
import { useVariable } from './useVariable';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

export const Controls = () => {
  const { camera } = useThree();

  const pressed = useKeyboardInput(["w", "a", "s", "d", " ", "c"]);
  const input = useVariable(pressed);
  const speed = 300;

  useFrame((_, delta) => {
    const { w, s, a, d, c, " ": space } = input.current;

    let velocity = new Vector3(0, 0, 0);
    let cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    let forward = new Vector3();
    forward.setFromMatrixColumn(camera.matrix, 0);
    forward.crossVectors(camera.up, forward);

    let right = new Vector3();
    right.setFromMatrixColumn(camera.matrix, 0);

    let up = new Vector3();
    up.setFromMatrixColumn(camera.matrix, 0);
    up.crossVectors(forward, right);


    let [horizontal, vertical, z] = [0, 0, 0];

    if (w) {
      vertical += 1;
    }
    if (s) {
      vertical -= 1;
    }
    if (d) {
      horizontal += 1;
    }
    if (a) {
      horizontal -= 1;
    }
    if (space) {
      z -= 1; // Espacio para mover hacia arriba
    }
    if (c) {
      z += 1;
    }

    if (horizontal !== 0 && vertical !== 0 && z !== 0) {
      velocity
        .add(forward.clone().multiplyScalar(speed * vertical))
        .add(right.clone().multiplyScalar(speed * horizontal))
        .add(up.clone().multiplyScalar(speed * z))
      velocity.clampLength(-speed, speed);
    } else if (horizontal !== 0) {
      velocity.add(right.clone().multiplyScalar(speed * horizontal));
    } else if (vertical !== 0) {
      velocity.add(forward.clone().multiplyScalar(speed * vertical));
    } else if (z !== 0) {
      velocity.add(up.clone().multiplyScalar(speed * z));
    }

    camera.position.add(velocity.clone().multiplyScalar(delta));
  });

  return null;
}
