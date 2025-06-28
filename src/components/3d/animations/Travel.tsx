import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const Travel: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime) * 0.5;
      meshRef.current.position.z = Math.cos(state.clock.elapsedTime) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#10B981" />
    </mesh>
  );
};