import { Canvas } from "@react-three/fiber";

import {
  Character,
  NPCController,
  PlayerController,
  LocomotionBehaviorModule,
  NPCPatrolBehaviorModule,
  ThirdPersonCamera,
  PatrolPoint,
  VisualStyle,
} from "@characterxyz/three-character";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";

const GROUND_LAYER = 1;

const SceneContent: React.FC = () => {
  const { scene, set } = useThree();
  const characterRef = useRef<Character | null>(null);

  const playerController = new PlayerController();
  playerController.registerModule(new LocomotionBehaviorModule());

  const patrolPoints: PatrolPoint[] = [
    {
      position: new THREE.Vector3(5, 0, 5),
      minWaitTime: 2,
      maxWaitTime: 5,
      canRandomlySkip: false,
    },
    {
      position: new THREE.Vector3(-5, 0, 5),
      minWaitTime: 3,
      maxWaitTime: 6,
      canRandomlySkip: true,
    },
  ];
  const patrolBehavior = new NPCPatrolBehaviorModule(patrolPoints);
  const dcNPCController = new NPCController();
  dcNPCController.registerModule(patrolBehavior);

  const mcPatrolPoints: PatrolPoint[] = [
    {
      position: new THREE.Vector3(-5, 0, -5),
      minWaitTime: 1,
      maxWaitTime: 4,
      canRandomlySkip: false,
    },
    {
      position: new THREE.Vector3(5, 0, -5),
      minWaitTime: 2.5,
      maxWaitTime: 5.5,
      canRandomlySkip: true,
    },
  ];

  const mcPatrolBehavior = new NPCPatrolBehaviorModule(mcPatrolPoints);
  const mcNPCController = new NPCController();
  mcNPCController.registerModule(mcPatrolBehavior);

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
          visualStyle: VisualStyle.VOXELIZED,
          position: new THREE.Vector3(),
          controller: playerController,
          groundLayer: GROUND_LAYER,
        }}
      />

      {/* A.I. character */}
      <Character
        config={{
          scene: scene as any,
          slug: "",
          visualStyle: VisualStyle.MINIFIED,
          position: new THREE.Vector3(),
          controller: mcNPCController,
          groundLayer: GROUND_LAYER,
        }}
      />

      {/* A.I. character */}
      {/* <Character
        config={{
          scene: scene as any,
          renderer: renderer,
          slug: "",
          visualStyle: VisualStyle.DETAILED,
          position: [5, 0, 3],
          controller: dcNPCController,
          groundLayer: GROUND_LAYER,
        }}
      /> */}

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

export default function Playground4() {
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
