import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Rubik = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.01;
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Create a 3x3 grid of cubes */}
      {[-1, 0, 1].map((x) =>
        [-1, 0, 1].map((y) =>
          [-1, 0, 1].map((z) => (
            <mesh key={`${x}-${y}-${z}`} position={[x * 0.55, y * 0.55, z * 0.55]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial 
                color={
                  x === -1 ? "#FF9800" : 
                  x === 1 ? "#F44336" : 
                  y === -1 ? "#4CAF50" : 
                  y === 1 ? "#2196F3" : 
                  z === -1 ? "#FFEB3B" : 
                  "#9C27B0"
                } 
              />
            </mesh>
          ))
        )
      )}
    </group>
  );
};