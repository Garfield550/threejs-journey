'use client'

import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { Canvas } from "@react-three/fiber";
import Axes from "./helpers/axes";
import Objects from './objects';

export default function Scene() {
  return (
    <Canvas shadows>
      <Stats />
      <Axes />
      <OrbitControls enableDamping />
      <PerspectiveCamera makeDefault fov={75} position={[0, 0, 3]} near={0.1} far={100} />
      <Objects />
    </Canvas>
  )
}
