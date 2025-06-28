import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { ReactNode } from "react";

interface Scene3DProps {
  children: ReactNode;
  className?: string;
}

export const Scene3D: React.FC<Scene3DProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <View className="w-full h-full">
        {children}
      </View>
    </div>
  );
};

export const Scene3DCanvas: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
      <Canvas
        camera={{
          zoom: 0.8,
        }}
        className="fixed"
        eventSource={document.getElementById("root")!}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <View.Port />
      </Canvas>
    </div>
  );
};