// playground2 - Third person character movement with camera setup

import { Canvas } from "@react-three/fiber";

import {
  Character,
  PlayerController,
  LocomotionBehaviorModule,
  ThirdPersonCamera,
} from "@characterxyz/three-character";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";

const GROUND_LAYER = 1;

interface PlayerCharacterProps {
  controller: PlayerController;
}

const SceneContent: React.FC = () => {
  const { scene, set } = useThree();
  const controller = new PlayerController();
  controller.registerModule(new LocomotionBehaviorModule());
  const characterRef = useRef<Character | null>(null);

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
        ref={characterRef}
        config={{
          scene: scene as any,
          slug: "",
          controller,
          groundLayer: GROUND_LAYER,
          debugDraw: true,
        }}
      />

      <ThirdPersonCamera
        target={characterRef.current?.getTransform()}
        groundLayer={GROUND_LAYER}
        onCameraCreated={(camera) => {
          set({ camera: camera });
        }}
      />
    </>
  );
};

export default function Playground3() {
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
