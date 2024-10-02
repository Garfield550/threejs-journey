import { Fragment, useCallback, useLayoutEffect, useState } from "react";
import CameraHelper from "./helpers/camera";
import DirectionalLightHelper from "./helpers/directional-light";
import SpotLightHelper from "./helpers/spot-light";
import { DirectionalLight, SpotLight } from "three";
import { useThree } from "@react-three/fiber";

export default function Lights() {
  const scene = useThree((state) => state.scene)

  const [directionalLightRef, setDirectionalLightRef] = useState<DirectionalLight>()
  const handleDirectionalLightRef = useCallback((directionalLight: DirectionalLight) => setDirectionalLightRef(directionalLight), [])

  const [spotLightRef, setSpotLightRef] = useState<SpotLight>()
  const handleSpotLightRef = useCallback((spotLight: SpotLight) => setSpotLightRef(spotLight), [])

  useLayoutEffect(() => {
    if (spotLightRef) {
      // It's don't work, I don't know why
      scene.add(spotLightRef.target)
    }
  }, [scene, spotLightRef])

  return (
    <Fragment>
      <ambientLight color={0xffffff} intensity={1} />
      <directionalLight
        color={0xffffff}
        intensity={1.5}
        position={[2, 2, Math.PI]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        // shadow-radius={10}
        ref={handleDirectionalLightRef}
      >
        <orthographicCamera attach="shadow-camera" left={-2} right={2} top={2} bottom={-2} near={1} far={6} />
      </directionalLight>
      <spotLight
        color={0xffffff}
        intensity={1.5}
        distance={1}
        angle={Math.PI * 0.3}
        position={[0, 2, 2]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        ref={handleSpotLightRef}
      >
        <orthographicCamera attach="shadow-camera" left={-2} right={2} top={2} bottom={-2} near={1} far={6} />
      </spotLight>
      <pointLight color={0xffffff} intensity={0.5} position={[-1, 1, 0]} castShadow />
      <DirectionalLightHelper light={directionalLightRef} />
      <SpotLightHelper light={spotLightRef} />
      <CameraHelper camera={directionalLightRef?.shadow.camera} />
    </Fragment>
  )
}
