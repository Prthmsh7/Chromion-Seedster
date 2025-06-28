import { useTexture } from "@react-three/drei";
import { MeshMatcapMaterialProps } from "@react-three/fiber";
import { forwardRef } from "react";
import { MeshMatcapMaterial } from "three";

// Using a default matcap texture for our 3D objects
const defaultMatcap = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

export const CustomMaterial = forwardRef<
  MeshMatcapMaterial,
  MeshMatcapMaterialProps
>((props, ref) => {
  return (
    <meshStandardMaterial
      {...props}
      ref={ref}
      color="#141414"
      metalness={0.1}
      roughness={0.2}
    />
  );
});