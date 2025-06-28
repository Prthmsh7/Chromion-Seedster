import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Balance = () => {
  const barRef = useRef<THREE.Mesh>(null);
  const leftWeightRef = useRef<THREE.Mesh>(null);
  const rightWeightRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (barRef.current && leftWeightRef.current && rightWeightRef.current) {
      const time = state.clock.elapsedTime;
      
      // Make the bar tilt back and forth
      barRef.current.rotation.z = Math.sin(time) * 0.2;
      
      // Move the weights up and down based on the bar's tilt
      leftWeightRef.current.position.y = Math.sin(time) * 0.5 + 0.5;
      rightWeightRef.current.position.y = -Math.sin(time) * 0.5 + 0.5;
    }
  });

  return (
    <group>
      {/* Balance bar */}
      <mesh ref={barRef}>
        <boxGeometry args={[3, 0.2, 0.2]} />
        <meshStandardMaterial color="#9E9E9E" />
      </mesh>
      
      {/* Left weight */}
      <mesh ref={leftWeightRef} position={[-1, 0.5, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#2196F3" />
      </mesh>
      
      {/* Right weight */}
      <mesh ref={rightWeightRef} position={[1, 0.5, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#F44336" />
      </mesh>
      
      {/* Stand */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.3, 1, 16]} />
        <meshStandardMaterial color="#9E9E9E" />
      </mesh>
    </group>
  );
};