"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Planet() {
  const planetRef = useRef();

  const texture = useLoader(THREE.TextureLoader, "/textures/moon.jpg");

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function RotatingPlanet() {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Planet />
        <OrbitControls enableZoom={false} rotateSpeed={0.3} /> {}
      </Canvas>
    </div>
  );
}
