import { Points } from "@react-three/drei";
import { useRef } from "react";
import { Color, Points as ThreePoints } from "three";

import { AdditiveBlending } from "three";

const galaxy = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: 0xff6030,
  outsideColor: 0x1b3984,
}

const insideColor = new Color(galaxy.insideColor)
const outsideColor = new Color(galaxy.outsideColor)

const vectors = new Array(galaxy.count).fill(undefined).map((_, i) => {
  const radius = Math.random() * galaxy.radius
  const bAngle = (i % galaxy.branches) / galaxy.branches * Math.PI * 2
  const sAngle = radius * galaxy.spin

  const randomX = Math.pow(Math.random(), galaxy.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * galaxy.randomness * radius
  const randomY = Math.pow(Math.random(), galaxy.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * galaxy.randomness * radius
  const randomZ = Math.pow(Math.random(), galaxy.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * galaxy.randomness * radius

  const x = Math.cos(bAngle + sAngle) * radius + randomX
  const y = randomY
  const z = Math.sin(bAngle + sAngle) * radius + randomZ

  const mixedColor = insideColor.clone()
  mixedColor.lerp(outsideColor, radius / galaxy.radius)

  return [x, y, z, mixedColor.r, mixedColor.g, mixedColor.b]
})

const positions = Float32Array.from(vectors.flatMap(v => v.slice(0, 3)))

const colors = Float32Array.from(vectors.flatMap(v => v.slice(3)))

export default function Galaxies() {
  const points = useRef<ThreePoints>(null)

  return (
    <group>
      <Points positions={positions} colors={colors} ref={points}>
        <pointsMaterial attach='material' size={galaxy.size} sizeAttenuation depthWrite={false} blending={AdditiveBlending} vertexColors />
      </Points>
    </group>
  )
}
