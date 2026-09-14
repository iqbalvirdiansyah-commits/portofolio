import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FalconModel() {
  const { scene } = useGLTF('/falcon.glb');
  const group = useRef<THREE.Group>(null);

  // Traverse the scene and adjust materials if necessary
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        // Tweak material if too dark or needs env map
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.envMapIntensity = 2.0;
        }
      }
    });
  }, [scene]);

  useFrame(() => {
    // intro scroll range = window.innerHeight * 2
    const threshold = window.innerHeight * 2;
    const scroll = window.scrollY;
    // Map scroll 0 -> threshold to progress 0 -> 1
    const progress = Math.min(Math.max(scroll / threshold, 0), 1);

    if (group.current) {
      // 1. Position: From below camera up to center, then zoom past camera
      if (progress < 0.5) {
        // Phase 1: Enter from below
        const p = progress / 0.5; // 0 to 1
        group.current.position.y = THREE.MathUtils.lerp(-10, 0, p);
        group.current.position.z = THREE.MathUtils.lerp(-20, 0, p);
        // Tilt up to look like it's flying upwards
        group.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 4, 0, p);
      } else {
        // Phase 2: Enter hyperspace (zoom past camera)
        const p = (progress - 0.5) / 0.5; // 0 to 1
        // Ease in expo for sudden burst of speed
        const ease = p === 0 ? 0 : Math.pow(2, 10 * p - 10);
        group.current.position.y = 0;
        // Z moves towards the camera (camera is at z=5)
        group.current.position.z = THREE.MathUtils.lerp(0, 50, ease);
        group.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 12, p);
      }
    }
  });

  return (
    <group ref={group}>
      {/* 
        The model might need scaling/rotation adjustments depending on how it was exported.
        We'll start with scale 0.01 and adjust if it's too big/small.
      */}
      <primitive object={scene} scale={0.01} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

// Hyperspace Stars Effect
function HyperspaceStars() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random stars
  const { positions, colors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // Distribute stars in a tube
      const r = 5 + Math.random() * 100;
      const theta = Math.random() * 2 * Math.PI;
      const z = (Math.random() - 0.5) * 200;
      
      positions[i * 3] = r * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(theta);
      positions[i * 3 + 2] = z;

      // Color: white to blue-ish
      color.setHSL(0.6 + Math.random() * 0.1, 0.8, Math.random());
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  useFrame(() => {
    const threshold = window.innerHeight * 2;
    const scroll = window.scrollY;
    const progress = Math.min(Math.max(scroll / threshold, 0), 1);
    
    if (pointsRef.current) {
      // Move stars towards camera continuously
      const speed = 0.5 + progress * 8; // Speed increases as scroll progresses
      pointsRef.current.position.z += speed;
      // Loop stars back
      if (pointsRef.current.position.z > 100) {
        pointsRef.current.position.z -= 100;
      }
      
      // As progress > 0.5, stretch the stars into lines (using scale Z)
      if (progress > 0.5) {
         const p = (progress - 0.5) / 0.5;
         const stretch = 1 + p * 30; // Stretch Z up to 30x
         pointsRef.current.scale.z = stretch;
      } else {
         pointsRef.current.scale.z = 1;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      {/* Additive blending makes stars glow when overlapping */}
      <pointsMaterial size={0.3} vertexColors transparent blending={THREE.AdditiveBlending} />
    </points>
  );
}

export function FalconIntro() {
  const [opacity, setOpacity] = useState(1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const threshold = window.innerHeight * 2;
      // Start fading out the 3D canvas at 90% of threshold, fully hidden by threshold
      const fadeStart = threshold * 0.9;
      if (scroll > fadeStart) {
        const p = (scroll - fadeStart) / (threshold * 0.1);
        setOpacity(Math.max(1 - p, 0));
        if (p >= 1) setVisible(false);
        else setVisible(true);
      } else {
        setOpacity(1);
        setVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none bg-black transition-opacity duration-100"
      style={{ opacity }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true }}>
        <React.Suspense fallback={null}>
          {/* Basic lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#4488ff" />
          
          {/* Environment map for reflections on the metal ship */}
          <Environment preset="night" />

          {/* 3D Elements */}
          <HyperspaceStars />
          <FalconModel />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/falcon.glb');
