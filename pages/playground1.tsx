// playground1 - Simple characterxyz's character setup

import { Canvas } from "@react-three/fiber";

import { Character } from "@characterxyz/three-character";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const GROUND_LAYER = 0; // Preferred to keep it as a seperate layer from the default layer. Eg: 1

const SceneContent: React.FC = () => {
  const { scene } = useThree();
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />

      {/* Base plane */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        layers={GROUND_LAYER}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Player character */}
      <Character
        config={{
          scene: scene as any,
          slug: "",
          groundLayer: GROUND_LAYER,
        }}
      />

      <OrbitControls />
    </>
  );
};

export default function Playground1() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <Canvas style={{ display: "block" }}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
