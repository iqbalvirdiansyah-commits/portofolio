import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useSpring, MotionValue } from 'framer-motion';

function FalconModel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const { scene } = useGLTF('/falcon.glb');
  const group = useRef<THREE.Group>(null);

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.envMapIntensity = 2.0;
        }
      }
    });
  }, [scene]);

  useFrame(() => {
    // Read smoothed scroll progress
    const scroll = scrollProgress.get();
    const threshold = window.innerHeight * 2;
    const progress = Math.min(Math.max(scroll / threshold, 0), 1);

    if (group.current) {
      if (progress < 0.5) {
        // Phase 1: Enter from below smoothly
        const p = progress / 0.5; // 0 to 1
        group.current.position.y = THREE.MathUtils.lerp(-15, 0, p);
        group.current.position.z = THREE.MathUtils.lerp(-20, 0, p);
        group.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 4, 0, p);
      } else {
        // Phase 2: Enter hyperspace
        const p = (progress - 0.5) / 0.5; // 0 to 1
        const ease = p === 0 ? 0 : Math.pow(2, 10 * p - 10);
        group.current.position.y = 0;
        group.current.position.z = THREE.MathUtils.lerp(0, 100, ease); // Zoom past camera far
        group.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 16, p);
      }
    }
  });

  return (
    <group ref={group}>
      {/* Increased scale from 0.01 to 0.04 for a much more epic presence */}
      <primitive object={scene} scale={0.04} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

// Hyperspace Stars Effect with InstancedMesh (Stretching Light Streaks)
function HyperspaceStars({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 1500;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const starsData = useMemo(() => {
    return Array.from({ length: count }, () => {
      const r = 4 + Math.random() * 120; // avoid center
      const theta = Math.random() * 2 * Math.PI;
      return {
        x: r * Math.cos(theta),
        y: r * Math.sin(theta),
        z: (Math.random() - 0.5) * 400, // random Z from -200 to 200
        speed: 1 + Math.random() * 1.5,
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.9, 0.7 + Math.random() * 0.3)
      };
    });
  }, []);

  const colorArray = useMemo(() => {
    const array = new Float32Array(count * 3);
    starsData.forEach((star, i) => {
      star.color.toArray(array, i * 3);
    });
    return array;
  }, [starsData]);

  useFrame(() => {
    const scroll = scrollProgress.get();
    const threshold = window.innerHeight * 2;
    const progress = Math.min(Math.max(scroll / threshold, 0), 1);
    
    if (meshRef.current) {
      // Base speed when idle, huge speed when jumping to lightspeed
      let speedMulti = 0.5;
      let stretchZ = 1;

      if (progress > 0.5) {
         const p = (progress - 0.5) / 0.5;
         const ease = p * p;
         speedMulti = 0.5 + ease * 30; // Very fast
         stretchZ = 1 + ease * 150; // Extremely long streaks
      }

      starsData.forEach((star, i) => {
        star.z += speedMulti * star.speed;
        // Loop stars back when they pass the camera
        if (star.z > 200) {
           star.z -= 400;
        }
        
        dummy.position.set(star.x, star.y, star.z);
        // Stretch along Z axis
        dummy.scale.set(1, 1, stretchZ);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Thin cylinder makes a perfect light ray */}
      <cylinderGeometry args={[0.02, 0.02, 1, 4]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </cylinderGeometry>
      <meshBasicMaterial vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}

export function FalconIntro() {
  const [opacity, setOpacity] = useState(1);
  const [visible, setVisible] = useState(true);

  // Framer Motion smooth scroll
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    return smoothScroll.on("change", (latest) => {
      const threshold = window.innerHeight * 2;
      const fadeStart = threshold * 0.9;
      
      if (latest > fadeStart) {
        const p = (latest - fadeStart) / (threshold * 0.1);
        setOpacity(Math.max(1 - p, 0));
        if (p >= 1.2) setVisible(false);
        else setVisible(true);
      } else {
        setOpacity(1);
        setVisible(true);
      }
    });
  }, [smoothScroll]);

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none bg-black"
      style={{ opacity }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true }}>
        <React.Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#4488ff" />
          
          <Environment preset="night" />

          <HyperspaceStars scrollProgress={smoothScroll} />
          <FalconModel scrollProgress={smoothScroll} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/falcon.glb');
