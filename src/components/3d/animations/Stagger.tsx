import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const Stagger: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3B82F6" />
    </mesh>
  );
};