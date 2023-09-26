import { useRef, useEffect } from "react";
import React from "react";
import * as THREE from "three";
import Stats from "stats.js";
import {
  Character,
  Characters,
  NPCController,
  PlayerController,
  LocomotionBehaviorModule,
  NPCPatrolBehaviorModule,
  ThirdPersonCamera,
  VisualStyle,
} from "@characterxyz/three-character";
import { Canvas, useThree } from "react-three-fiber";

const GROUND_LAYER = 1;
const NO_OF_NPC_CHARACTERS = 500;
const NO_OF_CIRCLES = 10;
const SPACE_BETWEEN_CIRCLES = 5;
const SEGMENTS = 64;

const generateSinglePatrolPoint = (basePosition: THREE.Vector3) => [
  {
    position: basePosition,
    minWaitTime: 1,
    maxWaitTime: 1,
    canRandomlySkip: false,
  },
];

const SceneContent: React.FC = () => {
  const { scene, set } = useThree();
  const characterRef = useRef<Character | null>(null);
  const playerController = new PlayerController();
  playerController.registerModule(new LocomotionBehaviorModule());

  let remainingCharacters = NO_OF_NPC_CHARACTERS;
  const characterConfigs = [];

  for (let i = 0; i < NO_OF_CIRCLES; i++) {
    const radius = (i + 1) * SPACE_BETWEEN_CIRCLES;
    const circumference = 2 * Math.PI * radius;
    const charactersInThisCircle = Math.min(
      Math.max(1, Math.round(circumference / 10)),
      remainingCharacters
    );
    remainingCharacters -= charactersInThisCircle;

    const angleStep = (2 * Math.PI) / charactersInThisCircle;
    for (let j = 0; j < charactersInThisCircle; j++) {
      const angle = j * angleStep;
      const startPosition = new THREE.Vector3(
        radius * Math.cos(angle),
        0,
        radius * Math.sin(angle)
      );

      const controller = new NPCController();
      controller.registerModule(
        new NPCPatrolBehaviorModule(generateSinglePatrolPoint(startPosition))
      );

      characterConfigs.push({
        scene: scene,
        slug: `Tamashi-TiAJWr3sWxh79UKd1UDU`,
        visualStyle: VisualStyle.VOXELIZED,
        position: startPosition,
        controller: controller,
        groundLayer: GROUND_LAYER,
        debugDraw: true,
      });
    }

    const circlePoints = [];
    for (let k = 0; k <= SEGMENTS; k++) {
      const segmentAngle = (k / SEGMENTS) * Math.PI * 2;
      circlePoints.push(
        new THREE.Vector3(
          radius * Math.cos(segmentAngle),
          0,
          radius * Math.sin(segmentAngle)
        )
      );
    }
    const circleGeometry = new THREE.BufferGeometry().setFromPoints(
      circlePoints
    );
    const circleLine = new THREE.Line(
      circleGeometry,
      new THREE.LineBasicMaterial({ color: 0x0000ff })
    );
    scene.add(circleLine);
  }

  characterConfigs.forEach((config) => {
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.copy(config.position);
    scene.add(sphereMesh);
  });

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
      <Character
        ref={characterRef}
        config={{
          scene: scene as any,
          slug: "",
          visualStyle: VisualStyle.VOXELIZED,
          position: new THREE.Vector3(),
          controller: playerController,
          groundLayer: GROUND_LAYER,
          debugDraw: true,
        }}
      />
      <Characters characterConfigs={characterConfigs} />
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

export default function Playground7() {
  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    const animate = () => {
      stats.begin();
      stats.end();
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

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
