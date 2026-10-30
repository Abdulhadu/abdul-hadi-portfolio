"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, Section } from "@/lib/scroll-context";
import * as THREE from "three";

// ── COLORS ──────────────────────────────────────────────────────────────────
const C = {
  blue: new THREE.Color(0x60a5fa),
  violet: new THREE.Color(0x8b5cf6),
  cyan: new THREE.Color(0x22d3ee),
  navy: new THREE.Color(0x0d1220),
  white: new THREE.Color(0xf1f5f9),
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }


// ── SECTION CAMERA TARGETS ───────────────────────────────────────────────────
const CAM: Record<Section, { pos: [number,number,number]; fov: number }> = {
  hero:       { pos: [0,   0,   8],   fov: 60 },
  about:      { pos: [3,   1,   9],   fov: 65 },
  skills:     { pos: [-2,  -1,  7],   fov: 58 },
  experience: { pos: [2,   2,   10],  fov: 62 },
  projects:   { pos: [-3,  -2,  8],   fov: 60 },
  contact:    { pos: [0,   -1,  9],   fov: 64 },
};

// ── WIREFRAME SPHERE ─────────────────────────────────────────────────────────
function WireframeSphere({ scroll }: { scroll: ReturnType<typeof useScroll> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.08;
    meshRef.current.rotation.x = t * 0.04;

    // Scale + opacity based on section
    const targetScale = scroll.activeSection === "hero" ? 1
      : scroll.activeSection === "about" ? 0.7
      : scroll.activeSection === "skills" ? 0.5
      : 0.4;
    meshRef.current.scale.setScalar(lerp(meshRef.current.scale.x, targetScale, 0.03));

    // Colour shift
    const targetColor = scroll.activeSection === "skills" ? C.violet
      : scroll.activeSection === "projects" ? C.cyan
      : C.blue;
    matRef.current.color.lerp(targetColor, 0.02);
    matRef.current.opacity = lerp(matRef.current.opacity,
      scroll.activeSection === "contact" ? 0.08 : 0.22, 0.03);
  });

  return (
    <mesh ref={meshRef} position={[0.5, 0, 0]}>
      <sphereGeometry args={[2.2, 28, 28]} />
      <meshBasicMaterial ref={matRef} color={C.blue} wireframe transparent opacity={0.22} />
    </mesh>
  );
}

// ── ORBITAL RINGS ─────────────────────────────────────────────────────────────
function OrbitalRing({ radius, tiltX, tiltZ, speed, color, section, scroll }:
  { radius: number; tiltX: number; tiltZ: number; speed: number; color: THREE.Color;
    section: Section; scroll: ReturnType<typeof useScroll> }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !matRef.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * speed;
    const active = scroll.activeSection === section || scroll.activeSection === "hero";
    matRef.current.opacity = lerp(matRef.current.opacity, active ? 0.5 : 0.1, 0.03);
  });

  const geo = useMemo(() => {
    const g = new THREE.TorusGeometry(radius, 0.008, 4, 96);
    return g;
  }, [radius]);

  return (
    <mesh ref={ref} geometry={geo} rotation={[tiltX, 0, tiltZ]}>
      <meshBasicMaterial ref={matRef} color={color} transparent opacity={0.5} />
    </mesh>
  );
}

// ── NETWORK NODES + CONNECTIONS ───────────────────────────────────────────────
function NetworkGraph({ scroll }: { scroll: ReturnType<typeof useScroll> }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    pos: new THREE.Vector3(
      (Math.random() - 0.5) * 9,
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 4,
    ),
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.4,
  })), []);

  const { linePositions } = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].pos.distanceTo(nodes[j].pos) < 3.5) {
          arr.push(...nodes[i].pos.toArray(), ...nodes[j].pos.toArray());
        }
      }
    }
    return { linePositions: new Float32Array(arr) };
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.04;
    const s = scroll.activeSection;
    const targetOpacity = s === "hero" || s === "about" ? 0.65 : s === "contact" ? 0.2 : 0.35;
    groupRef.current.children.forEach((c) => {
      if ((c as THREE.Mesh).material) {
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial | THREE.LineBasicMaterial;
        mat.opacity = lerp(mat.opacity, targetOpacity, 0.02);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial color={i % 3 === 0 ? C.cyan : i % 3 === 1 ? C.blue : C.violet} transparent opacity={0.65} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={C.blue} transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

// ── FLOATING PARTICLES ────────────────────────────────────────────────────────
function Particles({ scroll }: { scroll: ReturnType<typeof useScroll> }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 280;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      const c = i % 3 === 0 ? C.blue : i % 3 === 1 ? C.violet : C.cyan;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.012;
    ref.current.rotation.x = clock.getElapsedTime() * 0.006;
    const mat = ref.current.material as THREE.PointsMaterial;
    const target = scroll.activeSection === "hero" ? 0.55
      : scroll.activeSection === "projects" ? 0.4
      : scroll.activeSection === "contact" ? 0.15 : 0.3;
    mat.opacity = lerp(mat.opacity, target, 0.025);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// ── SERVER CYLINDERS ──────────────────────────────────────────────────────────
function ServerStack({ scroll }: { scroll: ReturnType<typeof useScroll> }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.06;
    const s = scroll.activeSection;
    const visible = s === "experience" || s === "skills" || s === "about";
    const target = visible ? 0.7 : 0.1;
    ref.current.children.forEach((c) => {
      if ((c as THREE.Mesh).material) {
        ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
          lerp(((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity, target, 0.025);
      }
    });
  });

  const cylinders = [
    { y: 0,    r: 0.3, h: 0.12, color: C.blue },
    { y: 0.16, r: 0.28, h: 0.12, color: C.violet },
    { y: 0.32, r: 0.26, h: 0.12, color: C.cyan },
    { y: 0.48, r: 0.24, h: 0.12, color: C.blue },
  ];

  return (
    <group ref={ref} position={[-4, -1.5, -1]}>
      {cylinders.map((c, i) => (
        <mesh key={i} position={[0, c.y, 0]}>
          <cylinderGeometry args={[c.r, c.r, c.h, 24]} />
          <meshBasicMaterial color={c.color} wireframe transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ── GLASS ICOSAHEDRONS ────────────────────────────────────────────────────────
function FloatingGems({ scroll }: { scroll: ReturnType<typeof useScroll> }) {
  const gems = useMemo(() => [
    { pos: [-5, 2, -2] as [number,number,number], scale: 0.35, speed: 0.3, color: C.violet },
    { pos: [5, -2, -3] as [number,number,number], scale: 0.25, speed: -0.2, color: C.cyan },
    { pos: [3, 3, -1] as [number,number,number], scale: 0.2, speed: 0.4, color: C.blue },
    { pos: [-4, -3, -2] as [number,number,number], scale: 0.3, speed: -0.35, color: C.violet },
  ], []);

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.x = t * gems[i].speed;
      m.rotation.y = t * gems[i].speed * 0.7;
      m.position.y = gems[i].pos[1] + Math.sin(t * 0.5 + i) * 0.3;
      const mat = m.material as THREE.MeshBasicMaterial;
      const visible = scroll.activeSection !== "contact";
      mat.opacity = lerp(mat.opacity, visible ? 0.18 : 0.04, 0.02);
    });
  });

  return (
    <>
      {gems.map((g, i) => (
        <mesh key={i} position={g.pos} scale={g.scale} ref={(el) => { refs.current[i] = el; }}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={g.color} wireframe transparent opacity={0.18} />
        </mesh>
      ))}
    </>
  );
}

// ── CIRCUIT LINES ─────────────────────────────────────────────────────────────
function CircuitBoard({ scroll }: { scroll: ReturnType<typeof useScroll> }) {
  const ref = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const segs: number[] = [];
    for (let i = 0; i < 24; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = -4 + Math.random() * -2;
      const len = 0.3 + Math.random() * 1.2;
      const horiz = Math.random() > 0.5;
      segs.push(x, y, z, horiz ? x + len : x, horiz ? y : y + len, z);
    }
    return new Float32Array(segs);
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const mat = (ref.current.children[0] as THREE.LineSegments).material as THREE.LineBasicMaterial;
    const s = scroll.activeSection;
    const target = s === "skills" ? 0.25 : s === "about" ? 0.18 : 0.08;
    mat.opacity = lerp(mat.opacity, target, 0.025);
  });

  return (
    <group ref={ref}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={C.cyan} transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}

// ── CAMERA CONTROLLER ─────────────────────────────────────────────────────────
function CameraController({ scroll }: { scroll: ReturnType<typeof useScroll> }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetFov = useRef(60);

  useFrame(() => {
    const cam = CAM[scroll.activeSection];
    targetPos.current.set(...cam.pos);
    targetFov.current = cam.fov;

    camera.position.lerp(targetPos.current, 0.025);
    (camera as THREE.PerspectiveCamera).fov = lerp(
      (camera as THREE.PerspectiveCamera).fov, targetFov.current, 0.025
    );
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── AMBIENT LIGHT SYSTEM ──────────────────────────────────────────────────────
function DynamicLighting({ scroll }: { scroll: ReturnType<typeof useScroll> }) {
  const blueRef = useRef<THREE.PointLight>(null);
  const violetRef = useRef<THREE.PointLight>(null);
  const cyanRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (blueRef.current) {
      blueRef.current.intensity = lerp(blueRef.current.intensity,
        scroll.activeSection === "hero" ? 2.5 : 1.2, 0.03);
      blueRef.current.position.x = Math.sin(t * 0.3) * 5;
    }
    if (violetRef.current) {
      violetRef.current.intensity = lerp(violetRef.current.intensity,
        scroll.activeSection === "skills" ? 2.0 : 0.8, 0.03);
      violetRef.current.position.y = Math.cos(t * 0.25) * 4;
    }
    if (cyanRef.current) {
      cyanRef.current.intensity = lerp(cyanRef.current.intensity,
        scroll.activeSection === "projects" ? 1.8 : 0.5, 0.03);
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color={0x0d1220} />
      <pointLight ref={blueRef} position={[4, 3, 4]} intensity={2.5} color={0x60a5fa} distance={20} />
      <pointLight ref={violetRef} position={[-4, -2, 3]} intensity={0.8} color={0x8b5cf6} distance={18} />
      <pointLight ref={cyanRef} position={[0, 4, 5]} intensity={0.5} color={0x22d3ee} distance={16} />
    </>
  );
}

// ── INNER SCENE (uses hooks) ──────────────────────────────────────────────────
function Scene({ scroll }: { scroll: ReturnType<typeof useScroll> }) {
  return (
    <>
      <CameraController scroll={scroll} />
      <DynamicLighting scroll={scroll} />
      <WireframeSphere scroll={scroll} />
      <OrbitalRing radius={3.0} tiltX={Math.PI/3}  tiltZ={0.2} speed={0.15} color={C.blue}   section="hero"       scroll={scroll} />
      <OrbitalRing radius={3.6} tiltX={Math.PI/2}  tiltZ={0.5} speed={-0.1} color={C.violet} section="about"      scroll={scroll} />
      <OrbitalRing radius={2.6} tiltX={Math.PI/4}  tiltZ={0.8} speed={0.2}  color={C.cyan}   section="skills"     scroll={scroll} />
      <OrbitalRing radius={4.0} tiltX={Math.PI/6}  tiltZ={-0.3}speed={-0.08}color={C.blue}   section="experience" scroll={scroll} />
      <NetworkGraph scroll={scroll} />
      <Particles scroll={scroll} />
      <ServerStack scroll={scroll} />
      <FloatingGems scroll={scroll} />
      <CircuitBoard scroll={scroll} />
    </>
  );
}

// ── EXPORTED CANVAS ───────────────────────────────────────────────────────────
export default function SceneBackground() {
  const scroll = useScroll();
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Scene scroll={scroll} />
      </Canvas>
    </div>
  );
}
