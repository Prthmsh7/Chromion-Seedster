import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Coin = () => {
  const coinRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coinRef.current) {
      // Rotate the coin
      coinRef.current.rotation.y += 0.03;
      
      // Add a subtle wobble effect
      coinRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      
      // Make the coin "float" up and down slightly
      coinRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      {/* Main coin body */}
      <mesh ref={coinRef} scale={[1.5, 1.5, 1.5]}>
        <cylinderGeometry args={[1, 1, 0.1, 64]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Coin edge detail */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.5, 1.5, 1.5]}>
        <torusGeometry args={[1, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color="#FFC107" 
          metalness={0.9} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Coin face details - simplified $ symbol */}
      <group position={[0, 0.06, 0]} scale={[1.5, 1.5, 1.5]}>
        <mesh position={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.01, 32]} />
          <meshStandardMaterial 
            color="#FFC107" 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.01, 32]} />
          <meshStandardMaterial 
            color="#FFC107" 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  );
};