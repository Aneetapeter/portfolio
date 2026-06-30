import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function CrystalField() {
  const group = useRef(null);
  const points = useRef(null);
  const particles = useMemo(() => {
    const positions = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.08;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.08;
    }
    if (points.current) points.current.rotation.y = -t * 0.025;
  });

  return (
    <group ref={group}>
      <Points ref={points} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#7dd3fc" size={0.018} sizeAttenuation depthWrite={false} opacity={0.55} />
      </Points>

      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh position={[-2.9, 0.2, -1.3]} rotation={[0.6, 0.1, 0.7]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <MeshDistortMaterial color="#0ea5e9" roughness={0.12} metalness={0.72} transparent opacity={0.32} distort={0.28} speed={1.4} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.5}>
        <mesh position={[2.75, -0.15, -1.05]} rotation={[0.5, 0.9, 0.2]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.03} metalness={0.1} transmission={0.55} thickness={0.6} transparent opacity={0.22} />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.6} floatIntensity={0.45}>
        <mesh position={[0.05, 1.15, -2.2]}>
          <sphereGeometry args={[0.85, 48, 48]} />
          <MeshDistortMaterial color="#7f1d1d" roughness={0.18} metalness={0.5} transparent opacity={0.22} distort={0.18} speed={1.2} />
        </mesh>
      </Float>

      <NeuralLines />
    </group>
  );
}

function NeuralLines() {
  const lines = useMemo(() => {
    const items = [];
    for (let i = 0; i < 18; i += 1) {
      const a = new THREE.Vector3((Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4, -2 - Math.random() * 1.5);
      const b = new THREE.Vector3((Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4, -2 - Math.random() * 1.5);
      items.push([a, b]);
    }
    return items;
  }, []);

  return (
    <group>
      {lines.map(([a, b], index) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial color={index % 4 === 0 ? '#7f1d1d' : '#7dd3fc'} transparent opacity={0.24} />
          </line>
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 4, 5]} intensity={1.7} color="#7dd3fc" />
      <directionalLight position={[-4, -1, 3]} intensity={0.65} color="#7f1d1d" />
      <Stars radius={8} depth={4} count={700} factor={2.4} fade speed={0.4} />
      <CrystalField />
    </Canvas>
  );
}

export default Scene;
