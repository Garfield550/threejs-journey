'use client'

import { Stats } from '@react-three/drei';
import { Canvas } from "@react-three/fiber";
import Axes from "./axes";
import CubeGroup from "./cube-group";

export default function Scene() {
    return (
        <Canvas>
            <Axes />
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <CubeGroup />
            <Stats />
        </Canvas>
    )
}
