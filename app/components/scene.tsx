'use client'

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from "@react-three/fiber";
import Axes from "./axes";
import Box from './box';

export default function Scene() {
    return (
        <Canvas>
            <Stats />
            <Axes />
            <OrbitControls enableDamping />
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Box position={[0, 0, 0]} />
        </Canvas>
    )
}
