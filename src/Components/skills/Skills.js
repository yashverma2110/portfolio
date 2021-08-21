import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./skills.css";

// images
import { skills } from "../../data";

export const Skills = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    setLogos(skills.map((skill) => skill.logo));
  }, []);

  const textures = useLoader(THREE.TextureLoader, logos);

  const SpinningBox = ({ texture, rotation }) => {
    const mesh = useRef(null);

    useFrame(
      () => (mesh.current.rotation.x = mesh.current.rotation.y += rotation)
    );

    return (
      <mesh ref={mesh}>
        <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
        <meshBasicMaterial attach="material" map={texture} />
        <ambientLight intensity={0.5} position={[0, 0, -1]} />
        <OrbitControls />
      </mesh>
    );
  };

  return (
    <div className="card">
      <span className="card-title">Technology Stack</span>
      <div className="shadow card-body skills-list">
        {skills.map((skill, index) => (
          <Canvas key={skill.name}>
            <SpinningBox texture={textures[index]} rotation={skill.rotation} />
          </Canvas>
        ))}
      </div>
    </div>
  );
};
