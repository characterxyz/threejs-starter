import { Canvas } from "@react-three/fiber";

import {
  Character,
  PlayerController,
  LocomotionBehaviorModule,
  ThirdPersonCamera,
  LocomotionBehaviorKeyMapping,
  InputCodes,
} from "@characterxyz/three-character";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";

const GROUND_LAYER = 1;

const SceneContent: React.FC = () => {
  const { scene, set } = useThree();

  const customMappings: LocomotionBehaviorKeyMapping = {
    moveForward: InputCodes.KEYBOARD_UP_ARROW,
    leftTurn: InputCodes.KEYBOARD_LEFT_ARROW,
    rightTurn: InputCodes.KEYBOARD_RIGHT_ARROW,
    Jump: InputCodes.KEYBOARD_ENTER,
    toggleRun: InputCodes.KEYBOARD_F,
  };

  const locomotionBehavior = new LocomotionBehaviorModule(customMappings);
  const playerController = new PlayerController();
  playerController.registerModule(locomotionBehavior);

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
          position: [0, 0, 0],
          controller: playerController,
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

export default function Playground5() {
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
