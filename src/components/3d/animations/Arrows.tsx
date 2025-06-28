import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Arrows = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  // Create an arrow shape
  const createArrow = (position: [number, number, number], rotation: [number, number, number]) => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.5, 0);
    shape.lineTo(0.5, -0.3);
    shape.lineTo(1, 0.2);
    shape.lineTo(0.5, 0.7);
    shape.lineTo(0.5, 0.4);
    shape.lineTo(0, 0.4);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      steps: 1,
      depth: 0.1,
      bevelEnabled: false
    };

    return (
      <mesh position={position} rotation={new THREE.Euler(...rotation)}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color="#FF9800" />
      </mesh>
    );
  };

  return (
    <group ref={groupRef}>
      {createArrow([0, 0, 0], [0, 0, 0])}
      {createArrow([0, 0, 0], [0, 0, Math.PI / 2])}
      {createArrow([0, 0, 0], [0, 0, Math.PI])}
      {createArrow([0, 0, 0], [0, 0, Math.PI * 1.5])}
    </group>
  );
};