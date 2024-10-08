import { Points, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { Points as ThreePoints } from "three";

import particlesTexture from '../textures/particles/2.png'
import { AdditiveBlending } from "three";
import { useFrame } from "@react-three/fiber";

const positions = new Float32Array(20000 * 3).map(() => (Math.random() - 0.5) * 10)
const colors = new Float32Array(20000 * 3).map(() => Math.random())

export default function Objects() {
  const points = useRef<ThreePoints>(null)
  const texture = useTexture(particlesTexture.src)

  useFrame(({ clock }) => {
    const et = clock.getElapsedTime()

    if (points.current) {
      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3
        // const x = positions[i3]
        const x = points.current.geometry.attributes.position.array[i3]
        points.current.geometry.attributes.position.array[i3 + 1] = Math.sin(et + x)
      }

      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <Points positions={positions} colors={colors} ref={points}>
        <pointsMaterial attach='material' size={0.1} sizeAttenuation transparent alphaMap={texture} depthWrite={false} blending={AdditiveBlending} vertexColors />
      </Points>
    </group>
  )
}
