'use client'

import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { Canvas } from "@react-three/fiber";
import Axes from "./helpers/axes";
import DirectionalLightHelper from "./helpers/directional-light";
import HemisphereLightHelper from "./helpers/hemisphere-light";
import PointLightHelper from "./helpers/point-light";
import SpotLightHelper from "./helpers/spot-light";
import RectAreaLightHelper from "./helpers/rect-area-light";
import Objects from './objects';
import { DirectionalLight, HemisphereLight, PointLight, RectAreaLight, SpotLight, Vector3 } from 'three';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

const v3 = new Vector3()

export default function Scene() {
  const directionalLightRef = useRef<DirectionalLight>(null)
  const hemisphereLightRef = useRef<HemisphereLight>(null)
  const pointLightRef = useRef<PointLight>(null)
  const rectAreaLightRef = useRef<RectAreaLight>(null)

  const [spotLightRef, setSpotLightRef] = useState<SpotLight>()

  useLayoutEffect(() => {
    if (rectAreaLightRef.current) {
      rectAreaLightRef.current.lookAt(v3)
    }

    if (spotLightRef) {
      spotLightRef.target.position.x = -0.75
    }
  }, [spotLightRef])

  return (
    <Canvas>
      <PerspectiveCamera makeDefault fov={75} near={0.1} far={100} position={[1, 1, 2]} />
      <Stats />
      <Axes />
      <OrbitControls enableDamping />
      <ambientLight color={0xffffff} intensity={0.5} />
      <directionalLight color={0x00fffc} intensity={0.3} position={[1, 0.25, 0]} ref={directionalLightRef} />
      <hemisphereLight color={0xff0000} groundColor={0x0000ff} intensity={0.3} ref={hemisphereLightRef} />
      <pointLight color={0xff9000} intensity={0.5} position={[1, -0.5, 1]} distance={10} decay={2} ref={pointLightRef} />
      <rectAreaLight color={0x4e00ff} intensity={2} width={1} height={1} position={[-1.5, 0, 1.5]} ref={rectAreaLightRef} />
      <spotLight color={0x78ff00} intensity={0.5} distance={10} angle={Math.PI * 0.1} penumbra={0.25} decay={1} position={[0, 2, 3]} ref={useCallback((ref: SpotLight) => setSpotLightRef(ref), [])} />
      {/**
       * R3F has lack of documentation for SpotLight.target
       * https://github.com/pmndrs/react-three-fiber/discussions/1512
       */}
      {spotLightRef && <primitive object={spotLightRef?.target} />}
      <DirectionalLightHelper light={directionalLightRef.current} />
      <HemisphereLightHelper light={hemisphereLightRef.current} />
      <PointLightHelper light={pointLightRef.current} />
      <SpotLightHelper light={spotLightRef} />
      <RectAreaLightHelper light={rectAreaLightRef.current} />
      <Objects />
    </Canvas>
  )
}
