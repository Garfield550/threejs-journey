import { Plane, Sphere, useTexture } from "@react-three/drei";
import { Fragment, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

import bakedShadow from '../textures/shadows/bakedShadow.jpg'
import simpleShadow from '../textures/shadows/simpleShadow.jpg'

export default function Objects() {
  const sphere = useRef<Mesh>(null)
  const shadow = useRef<Mesh>(null)

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime()

    if (sphere.current) {
      sphere.current.rotation.x += 0.15 * delta
      sphere.current.rotation.y -= 0.1 * delta

      sphere.current.position.x = Math.cos(elapsedTime) * 1.5
      sphere.current.position.y = Math.sin(elapsedTime) * 1.5
      sphere.current.position.z = Math.abs(Math.sin(elapsedTime * 3))
    }

    if (shadow.current && sphere.current) {
      shadow.current.position.x = sphere.current.position.x
      shadow.current.position.y = sphere.current.position.y
      // @ts-expect-error Property 'opacity' does not exist on type 'Material | Material[]'
      shadow.current.material.opacity = (1 - sphere.current.position.y) * 0.3
    }
  })

  const [baked, simple] = useTexture([bakedShadow.src, simpleShadow.src])

  return (
    <Fragment>
      <Sphere ref={sphere} args={[0.5, 32, 32]} castShadow>
        <meshStandardMaterial roughness={0.7} />
      </Sphere>
      <Plane ref={shadow} args={[1.5, 1.5]} position={[-0.3, 0, -0.49]}>
        {/* <meshBasicMaterial map={baked} /> */}
        <meshBasicMaterial color={0x000000} transparent alphaMap={simple} />
      </Plane>
      <Plane args={[5, 5]} position={[0, 0, -0.5]} receiveShadow>
        <meshStandardMaterial roughness={0.7} />
      </Plane>
    </Fragment>
  )
}
