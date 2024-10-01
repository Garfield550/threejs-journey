import { Box, Plane, Sphere, Torus } from "@react-three/drei";
import { Fragment, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function Objects() {
  const sphere = useRef<Mesh>(null)
  const cube = useRef<Mesh>(null)
  const torus = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (sphere.current) {
      sphere.current.rotation.x += 0.15 * delta
      sphere.current.rotation.y -= 0.1 * delta
    }

    if (cube.current) {
      cube.current.rotation.x += 0.15 * delta
      cube.current.rotation.y -= 0.1 * delta
    }

    if (torus.current) {
      torus.current.rotation.x += 0.15 * delta
      torus.current.rotation.y -= 0.1 * delta
    }
  })

  return (
    <Fragment>
      <Sphere ref={sphere} args={[0.5, 32, 32]} position={[-1.5, 0, 0]}>
        <meshStandardMaterial roughness={0.4} />
      </Sphere>
      <Box ref={cube} args={[0.75, 0.75, 0.75]} position={[0, 0, 0]}>
        <meshStandardMaterial roughness={0.4} />
      </Box>
      <Torus ref={torus} args={[0.3, 0.2, 32, 64]} position={[1.5, 0, 0]}>
        <meshStandardMaterial roughness={0.4} />
      </Torus>
      <Plane args={[5, 5]} position={[0, 0, -0.65]}>
        <meshStandardMaterial roughness={0.4} />
      </Plane>
    </Fragment>
  )
}
