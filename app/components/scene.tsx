'use client'

import { OrbitControls, PerspectiveCamera, Sky, Stats } from '@react-three/drei';
import { Canvas } from "@react-three/fiber";
import Axes from "./helpers/axes";
import Objects from './objects';
import Lights from './lights';

export default function Scene() {
  return (
    <Canvas shadows>
      <Stats />
      <Axes />
      <OrbitControls enableDamping />
      <PerspectiveCamera makeDefault fov={75} position={[4, 2, 5]} near={0.1} far={100} />
      <Sky
        turbidity={10}
        rayleigh={3}
        mieCoefficient={0.1}
        mieDirectionalG={0.95}
        sunPosition={[0.3, -0.038, -0.95]}
      />
      {/* <fog attach="fog" color={'#ff0000'} near={10} far={13} /> */}
      <fogExp2 attach="fog" color={'#04343f'} density={0.1} />
      <Lights />
      <Objects />
    </Canvas>
  )
}
