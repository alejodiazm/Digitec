import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
// Actually, maath is often not installed by default with R3F templates, check package.json.
// package.json has three, @react-three/fiber, @react-three/drei. It does NOT have maath.
// I will implement a simple random generator or install maath.
// Creating a simple random generator to avoid extra deps if possible, or just use Math.random
// But for 3D points I need a buffer.

// Let's implement a simple random sphere generator
function generateSpherePoints(count: number, radius: number) {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = Math.cbrt(Math.random()) * radius; // Uniform distribution within sphere

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
}

const ParticleField = (props: Partial<THREE.Points>) => {
    const ref = useRef<THREE.Points>(null);
    // Generate 2000 points inside a sphere of radius 1.5
    const sphere = useMemo(() => generateSpherePoints(3000, 1.8), []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#3A8DFF"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
};

export const ParticleNetwork3D = () => {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleField />
            </Canvas>
        </div>
    );
};
