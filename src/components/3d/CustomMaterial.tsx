import { MeshMatcapMaterialProps } from "@react-three/fiber";
import { forwardRef } from "react";
import { MeshMatcapMaterial } from "three";

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