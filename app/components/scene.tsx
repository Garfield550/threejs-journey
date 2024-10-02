'use client'

import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { Canvas } from "@react-three/fiber";
import Axes from "./helpers/axes";
import Objects from './objects';
import Lights from './lights';

export default function Scene() {
  return (
    <Canvas shadows={false}>
      <PerspectiveCamera makeDefault fov={75} position={[1, 1, 2]} />
      <Stats />
      <Axes />
      <OrbitControls enableDamping />
      <Lights />
      <Objects />
    </Canvas>
  )
}
