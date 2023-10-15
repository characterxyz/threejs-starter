import { useRef } from "react";
import React from "react";
import {
  LocomotionBehaviorModule,
  PlayerController,
  VisualStyle,
  ThirdPersonCamera,
  Characters,
  Character,
  CharacterConfig,
  NPCPatrolBehaviorModule,
  NPCController,
  PatrolPoint,
} from "@characterxyz/three-character";
import { Canvas, useThree } from "@react-three/fiber";
import { OverheadNameTextComponent } from "./components/overhead-name-text-component";
import { Vector3 } from "three";
import * as THREE from "three";

const GROUND_LAYER = 1;

const SceneContent: React.FC = () => {
  const { scene, set } = useThree();
  const characterRef = useRef<Character | null>(null);

  // PLAYER CONTROLLER
  const playerController = new PlayerController();
  playerController.registerModule(new LocomotionBehaviorModule());
  const playerNameTextComponent = new OverheadNameTextComponent(
    "Player One",
    new Vector3(0, 2.3, 0)
  );

  // NPC CONTROLLER 1
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
  const npcController = new NPCController();
  npcController.registerModule(patrolBehavior);
  const npcNameTextComponent = new OverheadNameTextComponent(
    "NPC One",
    new Vector3(0, 1.8, 0)
  );

  // NPC CONTROLLER 2
  const patrolPoints2: PatrolPoint[] = [
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
  const patrolBehavior2 = new NPCPatrolBehaviorModule(patrolPoints2);
  const npcController2 = new NPCController();
  npcController2.registerModule(patrolBehavior2);
  const npcNameTextComponent2 = new OverheadNameTextComponent(
    "NPC Two",
    new Vector3(0, 1.8, 0)
  );

  const characterConfigs: CharacterConfig[] = [
    {
      scene: scene as any,
      slug: "",
      visualStyle: VisualStyle.MINIFIED,
      position: new Vector3(0, 0, 0) as any,
      controller: playerController,
      components: [playerNameTextComponent],
      groundLayer: GROUND_LAYER,
      debugDraw: true,
    },
    {
      scene: scene as any,
      slug: "",
      visualStyle: VisualStyle.VOXELIZED,
      position: new Vector3(0, 0, 0) as any,
      controller: npcController,
      components: [npcNameTextComponent],
      groundLayer: GROUND_LAYER,
      debugDraw: true,
    },
    {
      scene: scene as any,
      slug: "",
      visualStyle: VisualStyle.VOXELIZED,
      position: new Vector3(0, 0, 0) as any,
      controller: npcController2,
      components: [npcNameTextComponent2],
      groundLayer: GROUND_LAYER,
      debugDraw: true,
    },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        layers={GROUND_LAYER}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <Characters configs={characterConfigs} />
      <ThirdPersonCamera
        target={characterRef?.current?.getTransform()}
        groundLayer={GROUND_LAYER}
        onCameraCreated={(camera) => {
          set({ camera: camera as any });
        }}
      />
    </>
  );
};

export default function Playground8() {
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
