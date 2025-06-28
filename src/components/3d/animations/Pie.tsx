import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Pie = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  // Create a pie/wedge shape
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.arc(0, 0, 1, 0, Math.PI / 2, false);
  shape.lineTo(0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: 0.2,
    bevelEnabled: false
  };

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color="#FFD700" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color="#FF9800" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color="#4CAF50" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI * 1.5]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color="#2196F3" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
};